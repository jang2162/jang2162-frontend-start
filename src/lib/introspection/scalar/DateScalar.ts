import {GraphQLError} from 'graphql';
import moment from 'moment';

export function parseDateValue(value: number | string | moment.Moment | Date) {
    if (value instanceof Date || typeof value === 'number') {
        value = moment(value);
    } else if (typeof value === 'string') {
        value = moment(value, [
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

