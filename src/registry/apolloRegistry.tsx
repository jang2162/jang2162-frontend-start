'use client';

import React from 'react';

import {ApolloClient, SuspenseCache} from '@apollo/client';

import {setContext} from '@apollo/client/link/context';

import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr';

import {getLinks} from '@/lib/apollo/getLinks';


const makeClient = (token?: string) => () => new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: getLinks(true,  setContext((operation, prevContext) => ({
        ...prevContext
        , token
    })))

})

const makeSuspenseCache = () => new SuspenseCache();

export default function ApolloRegistry({children, token}: {
    children: React.ReactNode;
    token?: string
}) {
    return (
        <ApolloNextAppProvider
            makeClient={makeClient(token)}
            makeSuspenseCache={makeSuspenseCache}
        >
            {children}
        </ApolloNextAppProvider>
    );
}
