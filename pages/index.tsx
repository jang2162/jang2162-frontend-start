import StyledTest from '@/templates/sample/StyledTest';
import Head from 'next/head';
import React from 'react';

const indexPage = (props: any) => {
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

export default indexPage;