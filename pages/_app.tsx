import GlobalStyle from '@/common/GlobalStyle/GlobalStyle';
import Layout from '@/Layout';
import routeInfoList from '@/routes';
import {store} from '@/store';
import App, {Container, NextAppContext} from 'next/app'
import Head from 'next/head';
import React from 'react'
import {Provider} from 'react-redux';
import Error from './_error';

export default class extends App {
    static async getInitialProps ({ Component, ctx }: NextAppContext) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        let routeInfo = null;
        for (const info of routeInfoList) {
            if (info.match(ctx.asPath)) {
                routeInfo = info;
                break;
            }
        }

        return {
            pageProps: {
                ...pageProps,
                routeInfo
            },
        }
    }

    render () {
        const { Component, pageProps} = this.props;
        return (
            <Container>
                <Head>
                    <title>React Start</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                </Head>
                <GlobalStyle/>
                <Provider store={store}>
                    <Layout pageProps={pageProps}>
                        {
                            pageProps.routeInfo !== null ?
                            <Component {...pageProps} /> :
                            <Error statusCode={404}/>
                        }
                    </Layout>
                </Provider>
            </Container>
        )
    }
}