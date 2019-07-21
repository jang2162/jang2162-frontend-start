import {Link} from '@/routes';
import Head from 'next/head';
import * as React from 'react';

export default () => {

    return (
        <div>
            <Head>
                <title>INDEX</title>
            </Head>
            <div>Index Page</div>

            <Link route={'/test'}>
                <a>Goto Test</a>
            </Link> <br/><br/>

            <Link route={'/test/444'}>
                <a>Goto Test 2</a>
            </Link> <br/><br/>

        </div>
    )
}