import {ApolloLink} from '@apollo/client';
export function IntrospectionLink(introspection: any) {
    return new ApolloLink((operation, forward) => {
        console.log(introspection);
        return forward(operation);
    });
}