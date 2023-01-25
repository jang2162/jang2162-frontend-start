import React from 'react';

import {LayoutComponentProps} from '@/lib/LayoutWrapper';

export const DefaultLayout = (props: LayoutComponentProps) =>{
    return (<>
        <header>
            DEFAULT
        </header>
        {props.children}
    </>)
}
