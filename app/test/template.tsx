import Link from 'next/link';
import { headers } from 'next/headers';
export default function Template({ children }: {
    children: React.ReactNode
}) {
    return <div>
        <Link href="/">Home</Link>
        <Link href="/test/test2">test2</Link>

        <br/>

        이건 테스트 템플릿
        {children}
    </div>;
}
