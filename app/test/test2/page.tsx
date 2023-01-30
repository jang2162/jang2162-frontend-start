import React from 'react'

import {getApolloClient} from '@/apollo';
import {selectNowDates} from '@/services/testService';
async function getData() {
    return selectNowDates.query();
}

export default async function Page() {
    const data = await getData()
    console.log(data);
    return (
        <>

        </>
    );
}
