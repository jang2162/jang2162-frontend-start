import React from 'react';

import Head from 'next/head';

import StyledTest from '@/templates/sample/StyledTest';


const IndexPage = (props: any) => {
    return (
        <div>
            <Head>
                <title>INDEX2</title>
            </Head>
            <div>Index Page</div>
            <StyledTest/>

        </div>
    )
}

export default IndexPage;
