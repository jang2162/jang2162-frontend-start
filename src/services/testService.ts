import {Service} from '@/lib/Service';
import {gql} from 'apollo-boost';

export const testService = new Service();

export const TEST = Symbol.for('TEST');
export const TEST2 = Symbol.for('TEST2');

testService.addQuery(TEST, gql`
    query($id: ID!) {
        samplePostById(id: $id) {
            content
            subject
            writer_id
        }
    }
`, (ctx) => ({id: ctx.params.foo}));



testService.addQuery(TEST2, gql`
    query($id: ID!) {
        sampleUserById(id: $id) {
            name
            birthday
        }
    }
`, (ctx) => {
    return {id: ctx.getData(TEST).samplePostById.writer_id};
});