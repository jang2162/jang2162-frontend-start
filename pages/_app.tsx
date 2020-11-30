import {useApollo} from '@/apollo';
import {LayoutMapper} from '@/lib/LayoutWrapper';
import {GlobalStyled} from '@/styled/GlobalStyled';
import {store} from '@/store';
import {ApolloProvider} from '@apollo/client';
import Head from 'next/head';
import React from 'react'
import {Provider} from 'react-redux';

export default function App({ Component, pageProps, router }: any) {
    const apolloClient = useApollo(pageProps.initialApolloState);
    const Layout = LayoutMapper?.[pageProps?.layout ?? 'DefaultLayout'] ?? LayoutMapper.DefaultLayout;
    return (
        <>
            <Head>
                <title>Frontend Start</title>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            </Head>
            <GlobalStyled/>
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                    <Layout router={router}>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </ApolloProvider>
        </>
    )
}