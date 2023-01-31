'use client'

import React, {useState} from 'react';

import Link from 'next/link';

import {useGqlServiceLazyQuery, useGqlServiceMutation, useGqlServiceQuery} from '@/lib/gqlService';
import {insertUser, selectNowDates, selectUser} from '@/services/testService';
export default function Template({ children }: {
    children: React.ReactNode
}) {
    const nowDates = useGqlServiceQuery(selectNowDates)
    const [userId, setUserId] = useState<string>('0')
    const [loadUser, userResult] = useGqlServiceLazyQuery(selectUser)
    const [mutate, mutateResult] = useGqlServiceMutation(insertUser)
    console.log(userResult);

    return <div>
        <Link href="/">Home</Link>
        <Link href="/test">test</Link>
        <button onClick={e => {
            mutate({variables: {birth: new Date(), name: '6546'}})
        }}>ADD USER</button>
        <button onClick={e => {
            loadUser({variables: {id: parseInt(userId)}})
        }}>VIEW USER</button>

        <input type="number" onChange={e => setUserId(e.target.value)}/>

        <br/>

        이건 테스트2 템플릿

        {children}
    </div>;
}
