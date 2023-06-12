import {envUtil} from '@/lib/envUtil';

export class Env {
    static readonly NODE_ENV = envUtil.string(process.env.NODE_ENV, 'development')
    static readonly URL = envUtil.stringErr(process.env.NEXT_PUBLIC_URL)
    static readonly GRAPHQL_URL = envUtil.stringErr(process.env.NEXT_PUBLIC_GRAPHQL_URL)
    static readonly GRAPHQL_INNER_URL = envUtil.string(process.env.GRAPHQL_INNER_URL, Env.GRAPHQL_URL)
    static readonly INTROSPECTION_DATA = envUtil.stringErr(process.env.NEXT_PUBLIC_INTROSPECTION)
}
