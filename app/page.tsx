import React from 'react'

import Link from 'next/link';

export default function Page() {
    return (
        <>

            <h1 className="text-sm font-thin underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm font-extralight underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm font-light underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm font-bold underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm font-black underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-sm font-extrabold underline">
                Hello, Next.js!
            </h1>
            <Link href="/test">Test</Link>

        </>
    );
}
