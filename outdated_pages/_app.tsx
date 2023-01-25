import React from 'react'

import {ApolloProvider} from '@apollo/client';
import Head from 'next/head';
import {RecoilRoot} from 'recoil';

import {useApollo} from '@/apollo';
import {LayoutMapper} from '@/lib/LayoutWrapper';
import {GlobalStyled} from '@/styled/GlobalStyled';


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
            <RecoilRoot>
                <ApolloProvider client={apolloClient}>
                    <Layout router={router}>
                        <Component {...pageProps} />
                    </Layout>
                </ApolloProvider>
            </RecoilRoot>
        </>
    )
}
