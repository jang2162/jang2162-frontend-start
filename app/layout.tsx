import React from 'react'

import '@/styled/global.css'
import {pretendardFont} from '@/styled/fontFaces/pretendardFontFace';
import ApolloRegistry from 'app/apolloRegistry';
import RecoilRegistry from 'app/recoilRegistry';
import StyledJsxRegistry from 'app/styledJsxRegistry';

export default function Layout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className={pretendardFont.variable}>
        <head>
            <title>Frontend Start</title>
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
        </head>
        <body>
            <RecoilRegistry>
                <ApolloRegistry>
                    <StyledJsxRegistry>
                        {children}
                    </StyledJsxRegistry>
                </ApolloRegistry>
            </RecoilRegistry>
        </body>
        </html>
    );
}
