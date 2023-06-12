import {
    MutationOptions, OperationVariables,
    QueryOptions,
    SubscriptionOptions,
} from '@apollo/client';

import {getClient} from '@/lib/apollo/client';
import {GqlWrapper} from '@/lib/apollo/GqlWrapper';


export async function gqlQuery<T = any, TVariables extends OperationVariables = OperationVariables>(gqlWrapper: GqlWrapper<T, TVariables>, options?: {variables: TVariables} & Omit<QueryOptions, 'query'|'variables'|'context'>){
    return getClient().query<T>({
        ...options,
        variables: options?.variables ?? undefined,
        query: gqlWrapper.getDocumentNode()
    });
}
export async function gqlMutate<T = any, TVariables extends OperationVariables = OperationVariables>(gqlWrapper: GqlWrapper<T, TVariables>, options?: {variables: TVariables} & Omit<MutationOptions, 'mutation'|'variables'|'context'>){
    return getClient().mutate<T>({
        ...options,
        variables: options?.variables ?? undefined,
        mutation: gqlWrapper.getDocumentNode()
    });
}
export async function gqlSubscribe<T = any, TVariables extends OperationVariables = OperationVariables>(gqlWrapper: GqlWrapper<T, TVariables>, options?: {variables: TVariables} & Omit<SubscriptionOptions, 'query'|'variables'|'context'>){
    return getClient().subscribe<T>({
        ...options,
        variables: options?.variables ?? undefined,
        query: gqlWrapper.getDocumentNode()
    });
}
