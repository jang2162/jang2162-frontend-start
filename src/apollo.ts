import env from 'json-env';

import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {useMemo} from 'react'
import {isBrowser} from 'utils';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) =>
            console.error(
                `[GraphQL error]: Message: ${extensions?.code ?? ''} ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
            )
        );
    }
    if (networkError) { console.error(`[Network error]: ${networkError}`); }
});

const authLink = setContext((operation, prevContext) => {
    return {headers: {cookie: `token=${prevContext.token}`}}
})

let apolloClient: ApolloClient<any>;
function createApolloClient() {
    return new ApolloClient({
        ssrMode: !isBrowser,
        link: ApolloLink.from([
            authLink,
            errorLink,
            new HttpLink({
                uri: env.getString('graphql'),
                credentials: 'include', // Additional fetch() options like `credentials` or `headers`
            })

        ]),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState = null) {
    const curApolloClient = apolloClient || createApolloClient()

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        curApolloClient.cache.restore(initialState)
    }
    // For SSG and SSR always create a new Apollo Client
    if (!isBrowser) { return curApolloClient }
    // Create the Apollo Client once in the client
    if (!apolloClient) { apolloClient = curApolloClient }

    return curApolloClient
}

export function useApollo(initialState: any) {
    return useMemo(() => initializeApollo(initialState), [initialState])
}