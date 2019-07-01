import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
}

export default (props: PropsWithChildren<LayoutProps>) => {
    let layout: string = 'default';
    let param: object = {};

    if (props.pageProps.routeInfo) {
        const info = props.pageProps.routeInfo;
        layout = info.layout || 'default';
        param = info.param || {};
    }

    return (
        <>
            {props.children}
        </>
    )
}