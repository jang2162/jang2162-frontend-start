import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
    routePath: string;
    errorPage: any;
}

export const LayoutWrapper = (props: PropsWithChildren<LayoutProps>) => {
    return (
        <>
            {props.children}
        </>
    )
}
