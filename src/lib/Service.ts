import {initializeApollo} from '@/apollo';
import {introspectionUtil} from '@/lib/introspection/util';
import {useQuery} from '@apollo/client';
import {DocumentNode} from 'graphql';
import {GetServerSidePropsContext, GetStaticPropsContext} from 'next';
import {useRouter} from 'next/router';
import {useMemo, useState} from 'react';

class ServiceNotFoundError extends Error {
    constructor(private _target: string | symbol | DocumentNode) {
        super('ServiceNotFoundError');
        this.name = 'ServiceNotFoundError';
    }

    get target(): string | symbol | DocumentNode {
        return this._target;
    }
}

interface ServiceContext<T = any> {
    params: T;
    getData<U=any>(name: string | symbol | DocumentNode): U;
}

interface Options<T=any> {
    variables?: T,
    context?: any
}

type OptionsOrFn<T=any> = Options<T> | ((ctx: ServiceContext) => null | Options<T>);

type ServiceData = Array<{
    name: string | symbol | DocumentNode,
    query: DocumentNode,
    options?: OptionsOrFn,
    data?: any,
    keep: Array<string | symbol | DocumentNode>,
    isEnd: boolean,
}>;

export class Service {
    private queries: Array<{ name: string | symbol | DocumentNode, query: DocumentNode, options?: OptionsOrFn }> = [];

    getServiceData(): ServiceData {
        return this.queries.map(item => ({
            ...item,
            keep: [],
            data: undefined,
            isEnd: false
        }));
    }

    async loadData(propsContext: GetServerSidePropsContext | (GetStaticPropsContext & {req?: any, res?: any})) {
        const items = this.getServiceData();
        const token = propsContext?.req?.cookies?.token;
        const pageResponse = propsContext?.res;
        const ctx: ServiceContext = {
            params: propsContext.params,
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
            let variables;
            let context;
            let isSkip = false;

            if (typeof item.options === 'function') {
                try {
                    const options = item.options(ctx);
                    if (options !== null) {
                        variables = options.variables
                        context = {
                            ...options.context,
                            token,
                            pageResponse,
                        }
                    } else {
                        isSkip = true;
                    }

                } catch (e) {
                    if (e.name === 'ServiceNotFoundError') {
                        const err: ServiceNotFoundError = e;
                        const targetItem = items.find(_item => _item.name === err.target);
                        if (targetItem && !targetItem.isEnd) {
                            targetItem.keep.push(item.name);
                            continue;
                        } else {
                            throw e;
                        }
                    } else {
                        throw e;
                    }
                }
            } else {
                variables = item?.options?.variables
                context = {
                    ...item?.options?.context,
                    token,
                    pageResponse,
                }
            }

            if (!isSkip) {
                if (variables) {
                    variables = introspectionUtil.serialize(variables, item.query);
                }

                item.data = introspectionUtil.parseData(
                    (await apolloClient.query({
                        variables,
                        context,
                        query: item.query
                    })).data
                );
            }

            item.isEnd = true;
            for (const keepName of item.keep) {
                const curItem = items.find(_item => _item.name === keepName);
                if (!curItem || typeof curItem.options !== 'function') {
                    continue;
                }
                try {
                    const options = curItem.options(ctx);
                    if (options !== null) {
                        curItem.data = introspectionUtil.parseData(
                            (await apolloClient.query({
                                variables: introspectionUtil.serialize(options.variables, curItem.query),
                                context: {
                                    ...options.context,
                                    token,
                                    pageResponse,
                                },
                                query: curItem.query
                            })).data
                        );
                    }
                    curItem.isEnd = true;
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

    addQuery<T=any>(name: string | symbol | DocumentNode, query?: DocumentNode, options?: OptionsOrFn<T>) {
        if (typeof name !== 'string' && typeof name !== 'symbol') {
            query = name;
        }

        if (query) {
            if (typeof options !== 'function' && options?.variables) {
                (options as Options).variables = introspectionUtil.serialize(options.variables, query);
            }
            this.queries.push({ name, query, options});
        }
    }

    addQuerySimple<T=any>(query: DocumentNode, options?: OptionsOrFn<T>) {
        this.addQuery<T>(query, query, options);
    }
}

export const useServiceData = (service: Service) => {
    const router = useRouter();
    const serviceData = useMemo(() => service.getServiceData(), [service, router.query]);
    return serviceData;
}

export const useServiceQuery = <T = any>(serviceData: ServiceData, name: string | symbol | DocumentNode) => {
    const router = useRouter();
    const params = router.query;
    const curItem = serviceData.find(_item => _item.name === name);

    if (!curItem) {
        throw new Error(`useServiceData: ${name.toString()} is not found`)
    }
    let options: Options = {};
    let skip = false;
    if (typeof curItem.options === 'function') {
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
            const _options = curItem.options(ctx);
            if (_options === null) {
                curItem.isEnd = true;
                skip = true;
            } else {
                options = _options;
                if (options.variables) {
                    options.variables = introspectionUtil.serialize(options.variables, curItem.query)
                }
            }
        } catch (e) {
            if (e.name === 'ServiceNotFoundError') {
                const err: ServiceNotFoundError = e;
                const targetItem = serviceData.find(_item => _item.name === err.target);
                if (targetItem && !targetItem.isEnd) {
                    skip = true;
                } else {
                    throw e;
                }
            } else {
                throw e;
            }
        }
    } else if (curItem.options){
        options = curItem.options;
    }
    const query = useQuery<T>(curItem.query, {
        ...options,
        skip
    });
    const [oldQuery, setOldQuery] = useState(query);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    useMemo(() => {
        setLoading(true);
        setOldQuery(query);
        if (!query.loading) {
            curItem.isEnd = true;
        }

        if (!query.error) {
            curItem.data = introspectionUtil.parseData(query.data);
            setLoading(false);
            setData(curItem.data);
        }
    }, [query, query.loading]);

    return {
        ...query,
        ready: !(loading || query.loading || oldQuery !== query),
        data
    };
}