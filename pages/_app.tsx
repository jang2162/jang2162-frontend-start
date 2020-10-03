import {useApollo} from '@/apollo';
import GlobalStyle from '@/common/styled/GlobalStyleComponent';
import LayoutWrapper from '@/common/LayoutWrapper';
import {store} from '@/store';
import {ApolloProvider} from '@apollo/client';
import Head from 'next/head';
import React from 'react'
import {Provider} from 'react-redux';
import Error from './_error';

export default function App({ Component, pageProps, router }: any) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    return (
        <>
            <Head>
                <title>Frontend Start</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            </Head>
            <GlobalStyle/>
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <LayoutWrapper pageProps={pageProps} routePath={router.asPath} errorPage={Error}>
                        <Component {...pageProps} />
                    </LayoutWrapper>
                </Provider>
            </ApolloProvider>
        </>
    )
}