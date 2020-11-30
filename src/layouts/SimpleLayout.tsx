import {LayoutComponentProps} from '@/lib/LayoutWrapper';
import React from 'react';

export const SimpleLayout = (props: LayoutComponentProps) =>
    (<>
        <header>
            SIMPLE
        </header>
        {props.children}
    </>)
