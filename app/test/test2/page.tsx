import React from 'react'
import Aaa from 'app/test/test2/aaa';
import {getApolloClient} from '@/apollo';
async function getData() {
    const apollo = getApolloClient()
    return [1,2,3];
}

export default async function Page() {
    const data = await getData()
    return (
        <>
            {data.map(item => (<div key={item}>{item}</div>))}
            <Aaa/>
            테스트2페이지
        </>
    );
}
