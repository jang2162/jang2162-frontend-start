import {useApollo} from '@/apollo';
import GlobalStyle from '@/common/GlobalStyle/GlobalStyle';
import Layout from '@/Layout';
import {store} from '@/store';
import {ApolloProvider} from '@apollo/react-common';
import Head from 'next/head';
import React from 'react'
import {Provider} from 'react-redux';
import Error from './_error';

export default function App({ Component, pageProps, router }: any) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    return (
        <>
            <Head>
                <title>React Start</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            </Head>
            <GlobalStyle/>
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <Layout pageProps={pageProps} routePath={router.asPath} errorPage={Error}>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ApolloProvider>
        </>
    )
}