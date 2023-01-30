import {envUtil} from '@/lib/envUtil';

export class Env {
    static readonly NODE_ENV = envUtil.string(process.env.NODE_ENV, 'development')
    static readonly GRAPHQL_URL = envUtil.stringErr(process.env.NEXT_PUBLIC_GRAPHQL_URL)
    static readonly NEXT_PUBLIC_INTROSPECTION_DATA = envUtil.stringErr(process.env.NEXT_PUBLIC_INTROSPECTION)
}
