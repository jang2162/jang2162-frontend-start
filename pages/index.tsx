import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';

const indexPage = (props: any) => {
    return (
        <div>
            <Head>
                <title>INDEX2</title>
            </Head>
            <div>Index Page</div>

            <Link href="/test2/2">
                <a>Goto Test</a>
            </Link> <br/><br/>

        </div>
    )
}

export default indexPage;