import React from 'react'

import {GetServerSideProps} from 'next';

import Link from 'next/link';

import {useSpring, animated} from 'react-spring'

import {useServiceData, useServiceQuery} from '@/lib/Service';
import {SAMPLE_USER_BY_ID, SAMPLE_POST_BY_ID, testService} from '@/services/testService';
import Test from '@/templates/sample/Test';



const Test2Foo = function(props: {hello: string}) {
    const serviceData = useServiceData(testService);
    const btnSpring = useSpring({opacity: 1, from: {opacity: 0}, delay: 500, config: {duration: 1500}})
    return (
        <>
            <animated.div style={btnSpring}>
                asasd
            </animated.div>

            <div style={{padding: 50}}>
                <Test test={props.hello}/>
            </div>
            <Link href="/">
                <a>Goto Index</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/test2/1">
                <a>1111111111</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/test2/2">
                <a>22222222</a>
            </Link>
            <br/>
            <br/>
            <Link href="/test/test2/3">
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
