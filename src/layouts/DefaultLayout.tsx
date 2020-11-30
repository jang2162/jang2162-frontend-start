import {LayoutComponentProps} from '@/lib/LayoutWrapper';
import React from 'react';

export const DefaultLayout = (props: LayoutComponentProps) =>{
    return (<>
        <header>
            DEFAULT
        </header>
        {props.children}
    </>)
}
