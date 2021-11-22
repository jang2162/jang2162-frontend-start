import {PropsWithChildren} from 'react';

import {Router} from 'next/router'

import {DefaultLayout} from '@/layouts/DefaultLayout';
import {SimpleLayout} from '@/layouts/SimpleLayout';

export type LayoutComponentProps = PropsWithChildren<{ router: Router }>

export const LayoutMapper: {
    [k: string]: (props: LayoutComponentProps) => JSX.Element,
    DefaultLayout: (props: LayoutComponentProps) => JSX.Element,
} = {
    DefaultLayout,
    SimpleLayout,
}
