'use client'
import React, {useState} from 'react';

import Link from 'next/link';

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    const [cnt, setCnt] = useState(0)
    return <div>
        <Link href="/">Home</Link>
        <Link href="/test/test2">test2</Link>
            <div>{cnt}</div>
            <button onClick={() => setCnt(cnt + 1)}>aa</button>
        <br/>

        이건 테스트 템플릿
        {children}
    </div>;
}
