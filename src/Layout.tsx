import {routeInfoList} from '@/routes';
import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
    routePath: string;
    errorPage: any;
}

export default (props: PropsWithChildren<LayoutProps>) => {
    // const routeInfoList: any =[];
    let routeInfo = null;
    const ErrorPage = props.errorPage;
    for (const info of routeInfoList) {
        if (info.match(props.routePath)) {
            routeInfo = info;
            break;
        }
    }

    return (
        <>
            {
                routeInfo !== null ?
                props.children :
                <ErrorPage statusCode={404}/>
            }
        </>
    )
}