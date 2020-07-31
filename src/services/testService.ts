import {SamplePost} from '@/generated-models'
import {Service} from '@/lib/Service';
import {gql} from '@apollo/client';

export const testService = new Service();

export const SAMPLE_POST_BY_ID = gql`
    query($id: ID!) {
        samplePostById(id: $id) {
            content
            subject
            writer_id
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

testService.addQuerySimple(SAMPLE_POST_BY_ID, (ctx) => ({variables: {id: ctx.params.foo}}));

testService.addQuerySimple(SAMPLE_USER_BY_ID, (ctx) => {
    const query = ctx.getData<{samplePostById: SamplePost}>(SAMPLE_POST_BY_ID);
    if (query?.samplePostById?.writer_id) {
        return {variables: {id: query.samplePostById.writer_id}};
    }
    return null;
});