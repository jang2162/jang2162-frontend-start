import {Env} from '@/env';
import {IntrospectionUtil} from '@/lib/introspectionUtil';
import {DateScalar} from '@/scalar/dateScalar';
import {DatetimeScalar} from '@/scalar/datetimeScalar';
import {TimestampScalar} from '@/scalar/timestampScalar';
import {VoidScalar} from '@/scalar/voidScalar';
export const introspectionUtil = new IntrospectionUtil(JSON.parse(Env.NEXT_PUBLIC_INTROSPECTION_DATA))

introspectionUtil.addScalar(VoidScalar);
introspectionUtil.addScalar(DateScalar);
introspectionUtil.addScalar(DatetimeScalar);
introspectionUtil.addScalar(TimestampScalar);

