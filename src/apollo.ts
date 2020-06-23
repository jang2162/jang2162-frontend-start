import env from 'json-env';

import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {useMemo} from 'react'
import {isBrowser} from 'utils';

let apolloClient: ApolloClient<any>;

function createApolloClient() {
    return new ApolloClient({
        ssrMode: !isBrowser,
        link: new HttpLink({
            uri: env.getString('graphql'),
            credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
        }),
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