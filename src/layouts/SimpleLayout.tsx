import React from 'react';

import {LayoutComponentProps} from '@/lib/LayoutWrapper';

export const SimpleLayout = (props: LayoutComponentProps) =>
    (<>
        <header>
            SIMPLE
        </header>
        {props.children}
    </>)
