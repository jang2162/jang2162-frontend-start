import {DateTest, SamplePostConnection, Scalars} from '@/generated-models'
import {Service} from '@/lib/Service';
import {gql} from '@apollo/client';
import moment from 'moment';

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
    const query = ctx.getData<{samplePosts: SamplePostConnection}>(SAMPLE_POST_BY_ID);

    if (query?.samplePosts?.list?.[0]?.writer_id) {
        return {variables: {id: query?.samplePosts?.list?.[0]?.writer_id}};
    }
    return null;
});

testService.addQuerySimple<{
    dates: DateTest,
    dates2: DateTest[],
    date1?: Scalars['Date']
    date2: Array<any | undefined>
}>(SAMPLE_POST_BY_ID, (ctx) => ({
    variables: {
        dates: {
            dt: moment('2020-06-01').toDate()
        },
        dates2: [{dt: moment('2020-06-28').toDate()}, {dt: moment('2020-06-28').toDate()}],
        date2: [moment('2020-05-05 09:00:00').toDate(), moment('2020-05-02 17:00:00').toDate()],
        date1: moment('2020-05-05 09:00:00').toDate(),
        id: ctx.params.foo
    }
}));

