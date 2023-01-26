import dotenv from 'dotenv';

dotenv.config();

export class Env {
    static readonly NODE_ENV = envString(process.env.NODE_ENV, 'development')
    static readonly SERVER_URL = process.env.SERVER_URL
    static readonly GRAPHQL_URL = process.env.GRAPHQL_URL
}



function envString(value: string | undefined, defaultValue: string): string {
    return value ?? defaultValue;
}

function envStringErr(value: string | undefined): string {
    if (value === undefined) {
        throw new Error('Empty environment given.');
    }
    return value;
}

function envInt(value: string | undefined, defaultValue: number): number {
    return value === undefined ? defaultValue : parseInt(value, 10);
}
function envIntErr(value: string | undefined): number {
    if (value === undefined) {
        throw new Error('Empty environment given.');
    }
    return parseInt(value, 10);
}
function envFloat(value: string | undefined, defaultValue: number): number {
    return value === undefined ? defaultValue : parseFloat(value);
}
function envFloatErr(value: string | undefined): number {
    if (value === undefined) {
        throw new Error('Empty environment given.');
    }
    return parseFloat(value);
}function envBool(value: string | undefined, defaultValue?: boolean): boolean {
    if (value && ['true', 'false'].indexOf(value.toLowerCase()) > 0) {
        return value.toLowerCase() === 'true'
    }
    throw new Error('invalid boolean value environment given.');
}
