import ApolloClient from 'apollo-boost';
import env from 'json-env';

export const client = new ApolloClient({
    uri: env.getString('graphql'),
});

