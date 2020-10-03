import {SamplePost} from '@/generated-models';
import {useServiceData, useServiceQuery} from '@/lib/Service';
import {SAMPLE_USER_BY_ID, SAMPLE_POST_BY_ID, testService} from '@/services/testService';
import Test from '@/templates/sample/Test';
import {GetServerSideProps, GetStaticProps} from 'next';
import Link from 'next/link';
import React from 'react'

const test2Foo = function(props: {hello: string}) {
    const serviceData = useServiceData(testService);

    const aaa  = useServiceQuery<{samplePostById: SamplePost}>(serviceData, SAMPLE_POST_BY_ID);
    // const { loading: loading1, error: error1, data: data1 } = useServiceQuery<{sampleUserById: SamplePost}>(serviceData,SAMPLE_USER_BY_ID);
    if (!aaa.ready) { return <p>Loading...</p>; }
    if (aaa.error) { return <p>Error :(</p>; }
    // if (loading0 || loading1) { return <p>Loading...</p>; }
    // if (error0 || error1) { return <p>Error :(</p>; }
    console.log(aaa.data);
    return (
        <>
            <div style={{padding: 50}}>
                <Test test={props.hello}/>
                {JSON.stringify(aaa.data)}
            </div>
            <Link href="/">
                <a>Goto Index</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/[foo]" as={`/test2/${1}`} shallow={true}>
                <a>1111111111</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/[foo]" as={`/test2/${2}`} shallow={true}>
                <a>22222222</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/[foo]" as={`/test2/${3}`} shallow={true}>
                <a>33333333333333333</a>
            </Link>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            initialApolloState: await testService.loadData(context),
            hello: '안녕',
            layout: 'DEFAULT'
        }
    }
}

export default test2Foo;
