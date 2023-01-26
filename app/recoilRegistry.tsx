'use client';

import React, { useState } from 'react';
import {RecoilRoot} from 'recoil';

export default function RecoilRegistry({children}: {
    children: React.ReactNode;
}) {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
}
