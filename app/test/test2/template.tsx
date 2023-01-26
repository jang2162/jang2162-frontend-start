'use client';


import Link from 'next/link';
import {usePathname} from 'next/navigation';
export default function Template({ children }: {
    children: React.ReactNode
}) {
    console.log(2222);
    const pathname = usePathname()

    return <div>

        <Link href="/">Home</Link>
        <Link href="/test">test</Link>

        <br/>

        이건 테스트2 템플릿
        {children}
    </div>;
}
