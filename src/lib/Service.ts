import {gql, SubscriptionHookOptions, useLazyQuery, useMutation, useQuery, useSubscription} from '@apollo/client';

import {QueryOptions} from '@apollo/client/core/watchQueryOptions';
import {LazyQueryHookOptions, MutationHookOptions, QueryHookOptions} from '@apollo/client/react/types/types';
import {DocumentNode} from 'graphql';

import {getApolloClient} from '@/apollo';
import {introspectionUtil} from '@/introspection';


class GqlService<T, TVariables> {
    constructor(private documentNode: DocumentNode) {}

    getDocumentNode(){
        return this.documentNode;
    }

    async query(options?: {variables: TVariables} & Omit<QueryOptions, 'query'|'variables'>){
        const client = getApolloClient()
        const result = await client.query<T>({
            ...options,
            variables: options?.variables ? introspectionUtil.serialize(options as any, this.documentNode) : undefined,
            query: this.documentNode
        });
        if (result.data) {
            return {
                ...result
                , data: introspectionUtil.parseData(result.data, this.documentNode)
            }
        } else {
            return result
        }
    }
}


export const makeGqlService = <T, TVariables = undefined>(documentNode: DocumentNode) => new GqlService<T, TVariables>(documentNode)

export function useGqlServiceQuery<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: QueryHookOptions) {
    const documentNode = gqlService.getDocumentNode();
    const result = useQuery(documentNode, {
        ...options,
        variables: options?.variables ? introspectionUtil.serialize(options as any, documentNode) : undefined
    });
    if (result.data) {
        return {
            ...result
            , data: introspectionUtil.parseData(result.data, documentNode)
        }
    } else {
        return result
    }
}
export function useGqlServiceLazyQuery<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: LazyQueryHookOptions) {
    const documentNode = gqlService.getDocumentNode();
    const result = useLazyQuery(documentNode, {
        ...options,
        variables: options?.variables ? introspectionUtil.serialize(options as any, documentNode) : undefined
    });
    if (result[1].data) {
        return [result[0], {
            ...result[1]
            , data: introspectionUtil.parseData(result[1].data, documentNode)
        }]
    } else {
        return result
    }
}


export function useGqlServiceMutation<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: MutationHookOptions) {
    const documentNode = gqlService.getDocumentNode();
    const result = useMutation(documentNode, {
        ...options,
        variables: options?.variables ? introspectionUtil.serialize(options as any, documentNode) : undefined
    });
    if (result[1].data) {
        return [result[0], {
            ...result[1]
            , data: introspectionUtil.parseData(result[1].data, documentNode)
        }]
    } else {
        return result
    }
}

export function useGqlServiceSubscription<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: SubscriptionHookOptions) {
    const documentNode = gqlService.getDocumentNode();
    const result = useSubscription(documentNode, {
        ...options,
        variables: options?.variables ? introspectionUtil.serialize(options as any, documentNode) : undefined
    });
    if (result.data) {
        return {
            ...result
            , data: introspectionUtil.parseData(result.data, documentNode)
        }
    } else {
        return result
    }
}

