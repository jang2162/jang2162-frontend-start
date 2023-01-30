/*
* A      OBJECT
* A!     NON_NULL_OBJECT
* [A]    LIST_OBJECT
* [A]!   NON_NULL_LIST_OBJECT
* [A!]   LIST_NON_NULL_OBJECT
* [A!]!  NON_NULL_LIST_NON_NULL_OBJECT
*
* */


import {gql} from '@apollo/client';

import {Query, Mutation, Scalars, Maybe} from '@/generated-models';
import {makeGqlService} from '@/lib/Service';

export const selectNowDates = makeGqlService<{
    nowDate: Query['nowDate']
    nowDatetime: Query['nowDatetime']
    nowDate2: Query['nowDate']
    nowDatetime2: Query['nowDatetime']
}>(gql`
    query {
        nowDate
        nowDatetime
        nowDate2: nowDate
        nowDatetime2: nowDatetime
    }
`)


export const insertUser = makeGqlService<{
    aa: Mutation['insertTempUser']
}, {birth: Scalars['Date'], name: Maybe<Scalars['String']>}>(gql`
    mutation a($birth: Date!, $name: String = "이름없음"){
        aa: insertTempUser(birth: $birth, name: $name)
    }
`)

export const selectUser = makeGqlService<{
    aad: Query['selectUserById']
}, {id: Scalars['Int']}>(gql`
    query ($id: Int!){
        aad: selectUserById(id: $id) {
            name
            birth
            userId
        }
    }
`)
