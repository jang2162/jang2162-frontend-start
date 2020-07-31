import {IntrospectionLink} from 'introspection-link/src/introspection-link';
import env from 'json-env';

import {ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import fs from 'fs';
import {ServerResponse} from 'http';
import {useMemo} from 'react'
import {parse as parseSetCookie} from 'set-cookie-parser';
import {isBrowser} from 'utils';
import Observable from 'zen-observable';

export const REFRESH_TOKEN = gql`
    mutation{
        refreshToken
    }
`;

const introspection = fs.readFileSync('./introspection.json', 'utf-8').toString();
const introspectionLink = IntrospectionLink(JSON.parse(introspection));

const errorLink = onError(({ graphQLErrors, networkError, forward, operation, response }) => {
    for (const error of graphQLErrors ?? []) {
        const { message, locations, path, extensions } = error;
        console.error(
            `[GraphQL error]: Message: ${extensions?.code ?? ''} ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
        )
    }

    if (networkError) { console.error(`[Network error]: ${networkError}`); }
});

const authLink = new ApolloLink((operation, forward) => {
    const prevContext = operation.getContext();
    let pageResponse: ServerResponse;
    if (!isBrowser) {
        pageResponse = prevContext?.pageResponse;
        operation.setContext({
            ...prevContext,
            headers: {
                ...prevContext?.headers,
                cookie: `token=${prevContext.token}`
            }
        });
    }
    const observable = forward(operation);
    return new Observable(observer => {
        observable.subscribe(result => {
            let needRefresh = false;
            if (result.errors) {
                for (const error of result.errors) {
                    const { extensions } = error;
                    if (extensions?.code === 'ACCESS_TOKEN_EXPIRED') {
                        needRefresh = true;
                    }
                }
            }

            if (needRefresh) {
                let newSetCookie: string;
                ApolloLink.execute(ApolloLink.from([
                    new ApolloLink((refreshOperation, refreshForward) => {
                        const refreshObservable = refreshForward(refreshOperation);
                        return new Observable(refreshObserver => {
                            refreshObservable.subscribe(refreshResult => {
                                if (!isBrowser) {
                                    newSetCookie = refreshOperation.getContext()?.response?.headers?.get?.('set-cookie')
                                }
                                refreshObserver.next(refreshResult);
                                refreshObserver.complete();
                            })
                        })
                    }),
                    httpLink
                ]), {
                    query: REFRESH_TOKEN,
                    context: !isBrowser ? {
                        headers: {
                            cookie: `token=${prevContext.token}`
                        }
                    } : undefined
                }).subscribe(refreshResult => {
                    if (refreshResult.errors) {
                        observer.next(refreshResult);
                        observer.complete();
                        // 추후 ACCESS_TOKEN_NOT_EXPIRED 고려
                    } else {
                        if (!isBrowser && newSetCookie) {
                            const token = parseSetCookie(newSetCookie).find(item => item.name === 'token');
                            pageResponse.setHeader('set-cookie', newSetCookie);
                            operation.setContext({
                                ...prevContext,
                                headers: {
                                    ...prevContext?.headers,
                                    cookie: `token=${token?.value}`
                                }
                            });
                        }
                        forward(operation).subscribe(newResult => {
                            observer.next(newResult);
                            observer.complete();
                        })
                    }
                });
            } else {
                observer.next(result);
                observer.complete();
            }
        });
    });
});

const httpLink = new HttpLink({
    uri: env.getString('graphql'),
    credentials: 'include'
});

function getLink() {
    return ApolloLink.from([
        introspectionLink,
        errorLink,
        authLink,
        httpLink
    ])
}

let _apolloClient: ApolloClient<any>;
function createApolloClient() {
    const link = getLink();
    return new ApolloClient({
        ssrMode: !isBrowser,
        link,
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null) {
    const curApolloClient = _apolloClient || createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        curApolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    if (!isBrowser) { return curApolloClient }
    // Create the Apollo Client once in the client
    if (!_apolloClient) { _apolloClient = curApolloClient }

    return curApolloClient
}

export function useApollo(initialState: any) {
    return useMemo(() => initializeApollo(initialState), [initialState])
}