import {gql} from '@apollo/client';

import {Query, Mutation, Scalars, Maybe} from '@/generated-models';
import {GqlWrapper} from '@/lib/apollo/GqlWrapper';

export const selectNowDates = new GqlWrapper<{
    nowDate: Query['nowDate']
    nowDateNN: Query['nowDateNN']
    nowDateArr: Query['nowDateArr']
    nowDateArrNN: Query['nowDateArrNN']
    nowDateNNArrNN: Query['nowDateNNArrNN']
    nowDateNNArr: Query['nowDateNNArr']
    nowDatetime: Query['nowDatetime']
    nowDate2: Query['nowDate']
    nowDatetime2: Query['nowDatetime']
}>(gql`
    query {
        nowDate
        nowDateNN
        nowDateArr
        nowDateArrNN
        nowDateNNArrNN
        nowDateNNArr
        nowDatetime
        nowDate2: nowDate
        nowDatetime2: nowDatetime
    }
`)

export const insertUser = new GqlWrapper<{
    aa: Mutation['insertTempUser']
}, {birth: Scalars['Date'], name: Maybe<Scalars['String']>}>(gql`
    mutation a($birth: Date!, $name: String = "이름없음"){
        aa: insertTempUser(birth: $birth, name: $name)
    }
`)

export const selectUser = new GqlWrapper<{
    aad: Query['selectUserById']
}, {id: Scalars['Int']}>(gql`
    fragment tempUserFields on TempUser {
        userId
        birth
        name
    }
    query ($id: Int!){
        aad: selectUserById(id: $id) {
            ...tempUserFields
        }
    }
`)
