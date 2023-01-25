import dayjs from 'dayjs';
import {GraphQLError} from 'graphql';

export function parseDateValue(value: number | string | dayjs.Dayjs | Date) {
    if (value instanceof Date || typeof value === 'number') {
        value = dayjs(value);
    } else if (typeof value === 'string') {
        value = dayjs(value, [
            'YYYY-MM-DD',
            'YYYYMMDD',
            'YYYY-MM-DDTHH:mm:ss.SSS',
            'YYYY-MM-DDTHH:mm:ss',
            'YYYY-MM-DD HH:mm:ss',
            'YYYYMMDDHHmmss',
        ], true);
    }

    if (!value.isValid()) {
        throw new GraphQLError(
            `Value is not a valid Date: ${value}`,
        );
    }
    return value
}

