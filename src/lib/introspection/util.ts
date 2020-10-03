import fs from 'fs';
import {IntrospectionUtil} from 'introspection-util';
import {parseDateValue} from './scalar/DateScalar';

const introspection = fs.readFileSync('./introspection.json', 'utf-8').toString();
export const introspectionUtil = new IntrospectionUtil(JSON.parse(introspection))

introspectionUtil.addScalar<Date>('Date', value => parseDateValue(value).set(({h:0, m:0, s:0, ms:0})).toDate(), value => parseDateValue(value).format('YYYY-MM-DD'));


