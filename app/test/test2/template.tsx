import React from 'react';

import Link from 'next/link';
export default function Template({ children }: {
    children: React.ReactNode
}) {
    return <div>

        <Link href="/">Home</Link>
        <Link href="/test">test</Link>

        <br/>

        이건 테스트2 템플릿
        {children}
    </div>;
}
