'use client';

import React from 'react';

import {ApolloProvider} from '@apollo/client';

import {getApolloClient} from '@/apollo';

export default function ApolloRegistry({children, }: {
    children: React.ReactNode;
}) {
    const apolloClient = getApolloClient()
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    );
}
