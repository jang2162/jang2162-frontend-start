// import {routeInfoList} from '@/routes';
import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
    routePath: string;
    errorPage: any;
}

export default (props: PropsWithChildren<LayoutProps>) => {
    return (
        <>
            {props.children}
        </>
    )
}