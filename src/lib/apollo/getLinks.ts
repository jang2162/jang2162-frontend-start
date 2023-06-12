import {ApolloLink, gql, HttpLink} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {
    SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import {parseString as parseStringSetCookie} from 'set-cookie-parser';
import {Observable} from 'zen-observable-ts';

import {isBrowser} from '../utils';

import {Env} from '@/env';
import {introspectionUtil} from '@/introspection';


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

const introspectionFormatLink = new ApolloLink((operation, forward) => {
    operation.variables = introspectionUtil.serialize(operation.variables, operation.query);
    return forward(operation).map(response => {
        if (response.data) {
            response.data = introspectionUtil.parseData(response.data, operation.query)
        }
        return response;
    });
})

const SSRTokenCookieLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext();
    const token = context.token;
    if (token) {
        operation.setContext({
            ...context,
            headers: {
                ...context?.headers,
                cookie: `token=${token?.value}`
            }
        })
    }
    return forward(operation).flatMap(result => {
        if (!isBrowser) {
            const setCookies: string[] = operation.getContext()?.response.headers.getAll('set-cookie') ?? [];
            if (setCookies) {
                result.extensions = {
                    ...result?.extensions,
                    tokenSetCookie: setCookies.find(item => parseStringSetCookie(item).name === 'token')
                }
            }
        }
        return Observable.of(result);
    })
})

const authLink = new ApolloLink((operation, forward) => {
    const context = operation.getContext();
    const token = context.token;

    return forward(operation).flatMap(result => {
        if (
            result.errors
            && result.errors
                .find(err => err.extensions?.code === 'ACCESS_TOKEN_EXPIRED') != null
        ){
            return ApolloLink.execute(
                ApolloLink.from([
                    SSRTokenCookieLink,
                    httpLink
                ]), {
                    query: REFRESH_TOKEN,
                    context: token ? {
                        headers: {
                            cookie: `token=${token}`
                        }
                    } : undefined
                }).flatMap(refreshResult => {
                    if (refreshResult?.extensions?.tokenSetCookie) {
                        operation.setContext({
                            ...context,
                            headers: {
                                ...context?.headers,
                                cookie: `token=${token?.value}`
                            }
                        });
                        return forward(operation).flatMap(newResult => {
                            newResult.extensions = {
                                ...newResult?.extensions,
                                tokenSetCookie: refreshResult?.extensions?.tokenSetCookie
                            }
                            return Observable.of(newResult);
                        });
                    } else {
                        return Observable.of(refreshResult);
                        // 추후 ACCESS_TOKEN_NOT_EXPIRED 고려
                    }
                }
            );
        }
        return Observable.of(result)
    })
});

const httpLink = new HttpLink({
    uri: isBrowser ? Env.GRAPHQL_URL : Env.GRAPHQL_INNER_URL,
    credentials: 'include'
});

export function getLinks(isClientSide: boolean, ...links: ApolloLink[]) {
    return ApolloLink.from([
        ...links,
        introspectionFormatLink,
        errorLink,
        SSRTokenCookieLink,
        authLink,
        ...(
            isClientSide && typeof window === 'undefined' ? [
                new SSRMultipartLink({
                    stripDefer: true,
                }),
            ] : []
        )
        , httpLink
    ])
}
