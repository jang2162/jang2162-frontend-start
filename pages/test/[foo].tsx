import {initializeApollo} from '@/apollo';
import Test from '@/components/Test/Test';
import {useServiceData, useServiceQuery} from '@/lib/Service';
import {TEST, TEST2, testService} from '@/services/testService';
import {GetStaticProps} from 'next';
import Link from 'next/link';
import * as React from 'react'

export default function(props: {hello: string}) {
    const serviceData = useServiceData(testService);

    const { loading: loading0, error: error0, data: data0 }  = useServiceQuery(serviceData,TEST);
    const { loading: loading1, error: error1, data: data1 } = useServiceQuery(serviceData,TEST2);
    if (loading0 || loading1) { return <p>Loading...</p>; }
    if (error0 || error1) { return <p>Error :(</p>; }
    console.log(data0);
    console.log(data1);
    return (
        <>
            <div style={{padding: 50}}>
                <Test test={props.hello}/>
            </div>
            <Link href="/">
                <a>Goto Index</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/[foo]" as={`/test/${1}`} shallow={true}>
                <a>1111111111</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/[foo]" as={`/test/${2}`} shallow={true}>
                <a>22222222</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/[foo]" as={`/test/${3}`} shallow={true}>
                <a>33333333333333333</a>
            </Link>
        </>
    )
};

export async function getStaticPaths() {
    return {
        paths: [
            { params: { foo: '1' } },
            { params: { foo: '2' } },
            { params: { foo: '3' } },
        ],
        fallback: true
    };
}


export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            initialApolloState: await testService.loadData(context.params),
            hello: '안녕',
            layout: 'DEFAULT'
        }
    }
}