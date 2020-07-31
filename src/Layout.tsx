import React, {PropsWithChildren} from 'react';

interface LayoutProps {
    pageProps: any;
    routePath: string;
    errorPage: any;
}

const layout =  (props: PropsWithChildren<LayoutProps>) => {
    return (
        <>
            {props.children}
        </>
    )
}


export default layout;