import React from 'react'

import Link from 'next/link';

import {StyledTest} from '@/templates/sample/StyledTest';

export default function Page() {
    return (
        <>
            <h1 className="text-4xl font-thin underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-4xl font-extralight underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-4xl font-light underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-4xl underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-4xl font-bold underline">
                Hello, Next.js!
            </h1>
            <h1 className="text-4xl font-extrabold underline">
                Hello, Next.js!
            </h1>

            <h1 className="text-4xl font-black underline ">
                Hello, Next.js!
            </h1>
            <StyledTest >
                asdasdasd
            </StyledTest>
            <Link href="/test">Test</Link>

        </>
    );
}
