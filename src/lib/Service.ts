import {initializeApollo} from '@/apollo';
import {ServiceNotFoundError} from '@/error/ServiceNotFoundError';
import {useQuery} from '@apollo/react-hooks';
import {QueryHookOptions} from '@apollo/react-hooks/lib/types';
import {DocumentNode} from 'graphql';
import {useRouter} from 'next/router';
import {useMemo} from 'react';

interface ServiceContext<T = any> {
    params: T;
    getData<U=any>(name: string | symbol | DocumentNode): U;
}

type ServiceData = Array<{
    name: string | symbol | DocumentNode,
    query: DocumentNode,
    variables?: object | ((ctx: ServiceContext) => null | object),
    data?: any,
    keep: Array<string | symbol | DocumentNode>,
    isEnd: boolean,
}>;

export class Service {
    private queries: Array<{ name: string | symbol | DocumentNode, query: DocumentNode, variables?: object | ((ctx: ServiceContext) => null | object) }> = [];

    getServiceData(): ServiceData {
        return this.queries.map(item => ({
            ...item,
            keep: [],
            data: undefined,
            isEnd: false
        }));
    }

    async loadData<V>(params: V) {
        const items = this.getServiceData();

        const ctx: ServiceContext = {
            params,
            getData: (name: string | symbol | DocumentNode) => {
                const targetItem = items.find(_item => _item.name === name);
                if (targetItem?.isEnd) {
                    return targetItem.data;
                } else {
                    throw new ServiceNotFoundError(name);
                }
            }
        }

        const apolloClient = initializeApollo();
        for (const item of items) {
            if (typeof item.variables === 'function') {
                try {
                    const variables = item.variables(ctx);
                    if (variables !== null) {
                        item.data = (await apolloClient.query({
                            query: item.query,
                            variables
                        })).data;
                    }
                    item.isEnd = true;
                } catch (e) {
                    if (e.name === 'ServiceNotFoundError') {
                        const err: ServiceNotFoundError = e;
                        const targetItem = items.find(_item => _item.name === err.target);
                        if (targetItem && !targetItem.isEnd) {
                            targetItem.keep.push(item.name);
                        } else {
                            throw e;
                        }
                    } else {
                        throw e;
                    }
                }
            } else {
                item.data = await apolloClient.query({
                    query: item.query,
                    variables: item.variables
                });
                item.isEnd = true;
            }

            for (const keepName of item.keep) {
                const curItem = items.find(_item => _item.name === keepName);
                if (!curItem || typeof curItem.variables !== 'function') {
                    continue;
                }
                try {
                    const variables = curItem.variables(ctx);
                    if (variables !== null) {
                        curItem.data = (await apolloClient.query({
                            query: curItem.query,
                            variables
                        })).data;
                        curItem.isEnd = true;
                    }
                } catch (e) {
                    if (e.name === 'ServiceNotFoundError') {
                        const err: ServiceNotFoundError = e;
                        const targetItem = items.find(_item => _item.name === err.target);
                        if (targetItem && !targetItem.isEnd) {
                            targetItem.keep.push(keepName);
                        } else {
                            throw e;
                        }
                    } else {
                        throw e;
                    }
                }
            }
        }
        return apolloClient.cache.extract();
    }

    addQuery<T=any>(name: string | symbol | DocumentNode, query?: DocumentNode, variables?: (ctx: ServiceContext) => T) {
        if (typeof name !== 'string' && typeof name !== 'symbol') {
            this.queries.push({ name, query: name, variables});
        } else if (query){
            this.queries.push({ name, query, variables});
        }
    }
}

export const useServiceData = (service: Service) => {
    const serviceData = useMemo(() => service.getServiceData(), [service]);
    return serviceData;
}

export const useServiceQuery = <T = any>(serviceData: ServiceData, name: string | symbol | DocumentNode) => {
    const router = useRouter();
    const params = router.query;
    const curItem = serviceData.find(_item => _item.name === name);
    const queryOptions: QueryHookOptions = {};

    if (!curItem) {
        throw new Error(`useServiceData: ${name.toString()} is not found`)
    }

    if (typeof curItem.variables === 'function') {
        const ctx: ServiceContext = {
            params,
            getData: (_name: string | symbol | DocumentNode) => {
                const targetItem = serviceData.find(_item => _item.name === _name);
                if (targetItem && targetItem.isEnd) {
                    return targetItem.data;
                } else {
                    throw new ServiceNotFoundError(_name);
                }
            }
        }
        try {
            const variables = curItem.variables(ctx);
            if (variables === null) {
                curItem.isEnd = true;
                queryOptions.skip = true;
            } else {
                queryOptions.variables = variables
            }
        } catch (e) {
            if (e.name === 'ServiceNotFoundError') {
                const err: ServiceNotFoundError = e;
                const targetItem = serviceData.find(_item => _item.name === err.target);
                if (targetItem && !targetItem.isEnd) {
                    queryOptions.skip = true;
                } else {
                    throw e;
                }
            } else {
                throw e;
            }
        }
    } else {
        queryOptions.variables = curItem.variables;
    }
    const query = useQuery<T>(curItem.query, queryOptions);

    useMemo(() => {
        if (!query.loading) {
            curItem.isEnd = true;
        }

        if (!query.error) {
            curItem.data = query.data;
        }

    }, [query.loading])

    return query;
}