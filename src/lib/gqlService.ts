import {
    LazyQueryResultTuple,
    SubscriptionHookOptions,
    useLazyQuery,
    useMutation,
    useQuery,
    useSubscription
} from '@apollo/client';

import {QueryOptions} from '@apollo/client/core/watchQueryOptions';
import {
    LazyQueryHookOptions,
    MutationHookOptions, MutationTuple,
    QueryHookOptions
} from '@apollo/client/react/types/types';
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
            variables: options?.variables ? introspectionUtil.serialize(options.variables, this.documentNode) : undefined,
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

export function useGqlServiceQuery<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: QueryHookOptions<any, TVariables>) {
    const documentNode = gqlService.getDocumentNode();
    const result = useQuery(documentNode, {
        ...options,
        variables: (options?.variables ? introspectionUtil.serialize(options.variables, documentNode) : undefined) as any
    });

    return {
        ...result
        , data: result.data ? introspectionUtil.parseData(result.data, documentNode) : undefined
    }
}
export function useGqlServiceLazyQuery<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: LazyQueryHookOptions<T, TVariables>): LazyQueryResultTuple<T, TVariables> {
    const documentNode = gqlService.getDocumentNode();
    const [exeFn, result] = useLazyQuery(documentNode, {
        ...options,
        variables: (options?.variables ? introspectionUtil.serialize(options.variables, documentNode) : undefined) as any
    });
    return [
        op => {
            return exeFn({
                ...op,
                variables: (op?.variables ? introspectionUtil.serialize(op.variables, documentNode) : undefined) as any
            })
        },
        {
            ...result
            , data: result.data ? introspectionUtil.parseData(result.data, documentNode) : undefined
        }
    ]
}

export function useGqlServiceMutation<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: MutationHookOptions<T, TVariables>): MutationTuple<T, TVariables> {
    const documentNode = gqlService.getDocumentNode();
    const [exeFn, result] = useMutation(documentNode, {
        ...options,
        variables: (options?.variables ? introspectionUtil.serialize(options.variables, documentNode) : undefined) as any
    });

    return [
        op => {
            return exeFn({
                ...op,
                variables: (op?.variables ? introspectionUtil.serialize(op.variables, documentNode) : undefined) as any
            })
        },
        {
            ...result
            , data: result.data ? introspectionUtil.parseData(result.data, documentNode) : undefined
        }
    ]
}

export function useGqlServiceSubscription<T, TVariables>(gqlService: GqlService<T, TVariables>, options?: SubscriptionHookOptions<T, TVariables>) {
    const documentNode = gqlService.getDocumentNode();
    const result = useSubscription(documentNode, {
        ...options,
        variables: (options?.variables ? introspectionUtil.serialize(options.variables, documentNode) : undefined) as any
    });

    return {
        ...result
        , data: result.data ? introspectionUtil.parseData(result.data, documentNode) : undefined
    }
}

