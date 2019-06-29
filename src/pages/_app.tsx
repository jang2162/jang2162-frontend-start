import GlobalStyle from '@/common/GlobalStyle/GlobalStyle';
import {store} from '@/store';
import App, {Container, NextAppContext} from 'next/app'
import Head from 'next/head';
import React from 'react'
import {Provider} from 'react-redux';

export default class extends App {
    static async getInitialProps ({ Component, ctx }: NextAppContext) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Head>
                    <title>React Start</title>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                </Head>
                <GlobalStyle/>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}