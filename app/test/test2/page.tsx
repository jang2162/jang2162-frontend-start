import React from 'react'

import {selectNowDates} from '@/services/testService';
async function getData() {
    return selectNowDates.query();
}

export default async function Page() {
    await getData()

    return (
        <>

            <div> <span>테스트테스트테스트테스트테스트테스트</span></div>

            <button>12</button>
        </>
    );
}
