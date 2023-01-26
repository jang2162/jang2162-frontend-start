import {gql} from '@apollo/client';
import dayjs from 'dayjs';

import {Scalars} from '@/generated-models'
import {Service} from '@/lib/Service';

export const testService = new Service();

/*
* A      OBJECT
* A!     NON_NULL_OBJECT
* [A]    LIST_OBJECT
* [A]!   NON_NULL_LIST_OBJECT
* [A!]   LIST_NON_NULL_OBJECT
* [A!]!  NON_NULL_LIST_NON_NULL_OBJECT
*
* */
export const SAMPLE_POST_BY_ID = gql`
    query($id: String!, $dates: DateTest!, $dates2: [DateTest!]!, $date1: Date!, $date2: [Date!]!) {
        samplePosts(form: {
            date1: $dates
            date2: $dates2
            date3: $date2
            date4: [$date1]
            date6: []
            userId: $id
        }) {
            list {
                subject
                writer_id
                writer {
                    birthday
                }
            }
        }
    }
`;
export const SAMPLE_USER_BY_ID = gql`
    query($id: ID!) {
        sampleUserById(id: $id) {
            name
            birthday
        }
    }
`;


testService.addQuerySimple(SAMPLE_USER_BY_ID, (ctx) => {

    return null;
});

testService.addQuerySimple<{
    date1?: Scalars['Date']
    date2: Array<any | undefined>
}>(SAMPLE_POST_BY_ID, (ctx) => ({
    variables: {
        dates: {
            dt: dayjs('2020-06-01').toDate()
        },
        dates2: [{dt: dayjs('2020-06-28').toDate()}, {dt: dayjs('2020-06-28').toDate()}],
        date2: [dayjs('2020-05-05 09:00:00').toDate(), dayjs('2020-05-02 17:00:00').toDate()],
        date1: dayjs('2020-05-05 09:00:00').toDate(),
        id: ctx.params.foo
    }
}));

