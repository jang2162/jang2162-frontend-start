import {useMemo} from 'react'

import {useRecoilValue} from 'recoil'

import {themeState} from '@/recoil/themeState';
import {defaultTheme} from '@/styled/themes/defaultTheme';

export interface Theme {
    readonly color: string
    readonly backgroundColor: string
}

const themeMapper: Record<string, Theme | null> = {
    'DEFAULT': defaultTheme
}

export function useTheme(themeKey?: string) {
    const themeStateVal = useRecoilValue(themeState);
    const curThemeKey = themeKey ?? themeStateVal;
    return useMemo(() => themeMapper[curThemeKey] ?? defaultTheme, [curThemeKey]);
}
