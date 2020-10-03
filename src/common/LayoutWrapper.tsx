import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
    routePath: string;
    errorPage: any;
}

const LayoutWrapper = (props: PropsWithChildren<LayoutProps>) => {
    return (
        <>
            {props.children}
        </>
    )
}


export default LayoutWrapper;