import {ServerResponse} from 'http';

import {ApolloClient, ApolloLink, gql, HttpLink, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {parse as parseSetCookie} from 'set-cookie-parser';
import {Observable} from 'zen-observable-ts';

import {isBrowser} from './lib/utils';

import {Env} from '@/env';

export const REFRESH_TOKEN = gql`
    mutation{
        refreshToken
    }
`;

const errorLink = onError(({ graphQLErrors, networkError}) => {
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
    if (!isBrowser && prevContext.token) {
        pageResponse = prevContext?.pageResponse;
        const newContext = {
            ...prevContext,
            headers: {
                ...prevContext?.headers,
                cookie: `token=${prevContext.token}`
            }
        };
        operation.setContext(newContext);
    }

    return forward(operation).flatMap(result => {
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
            return ApolloLink.execute(ApolloLink.from([
                new ApolloLink((refreshOperation, refreshForward) => {
                    const refreshObservable: Observable<any> = refreshForward(refreshOperation);
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
            }).flatMap(refreshResult => {
                if (refreshResult.errors) {
                    return Observable.of(refreshResult);
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
                    return forward(operation);
                }
            });
        } else {
            return Observable.of(result);
        }
    });
});
const httpLink = new HttpLink({
    uri: Env.GRAPHQL_URL,
    credentials: 'include'
});

function getLink() {
    return ApolloLink.from([
        errorLink,
        authLink,
        httpLink
    ])
}

function createApolloClient() {
    const link = getLink();
    return new ApolloClient({
        ssrMode: !isBrowser,
        link,
        cache: new InMemoryCache(),
    })
}
let _apolloClient: ApolloClient<any>;
export function getApolloClient() {
    const curApolloClient = _apolloClient || createApolloClient()
    if (!_apolloClient) { _apolloClient = curApolloClient }
    return curApolloClient
}
