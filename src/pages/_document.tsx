import Document, {Head, Main, NextDocumentContext, NextScript} from 'next/document';
import * as React from 'react'
import { ServerStyleSheet } from 'styled-components'

export default class extends Document {
    static async getInitialProps(ctx: NextDocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <html>
                <Head/>
                <body>
                    <Main />
                    <NextScript/>
                </body>
            </html>
        )
    }
}