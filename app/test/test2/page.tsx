import React from 'react'

import {selectNowDates} from '@/services/testService';
async function getData() {
    return selectNowDates.query();
}

export default async function Page() {
    await getData()

    return (
        <>
            <button>12</button>
        </>
    );
}
