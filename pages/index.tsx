import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';



export default (props: any) => {
    return (
        <div>
            <Head>
                <title>INDEX2</title>
            </Head>
            <div>Index Page</div>

            <Link href="/test">
                <a>Goto Test</a>
            </Link> <br/><br/>

        </div>
    )
}