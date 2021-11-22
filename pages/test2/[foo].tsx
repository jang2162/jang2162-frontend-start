import React from 'react'

import {GetServerSideProps} from 'next';

import Link from 'next/link';

import {useSpring, animated} from 'react-spring'

import {SamplePost} from '@/generated-models';
import {useServiceData, useServiceQuery} from '@/lib/Service';
import {SAMPLE_USER_BY_ID, SAMPLE_POST_BY_ID, testService} from '@/services/testService';
import Test from '@/templates/sample/Test';



const Test2Foo = function(props: {hello: string}) {
    const serviceData = useServiceData(testService);
    const btnSpring = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: {duration: 1500}})
    const aaa  = useServiceQuery<{samplePostById: SamplePost}>(serviceData, SAMPLE_POST_BY_ID);
    const bbb = useServiceQuery<{sampleUserById: SamplePost}>(serviceData,SAMPLE_USER_BY_ID);
    if (!aaa.ready || !bbb.ready) { return <p>Loading...</p>; }
    if (aaa.error || bbb.error) { return <p>Error :(</p>; }
    console.log(aaa.data);
    console.log(bbb.data);
    return (
        <>
            <animated.div style={btnSpring}>
                asasd
            </animated.div>

            <div style={{padding: 50}}>
                <Test test={props.hello}/>
                {JSON.stringify(aaa.data)}
            </div>
            <Link href="/">
                <a>Goto Index</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/1">
                <a>1111111111</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/2">
                <a>22222222</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test2/3">
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
            layout: 'DefaultLayout'
        }
    }
}

export default Test2Foo;
