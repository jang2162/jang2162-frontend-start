import dotenv from 'dotenv';

dotenv.config();

export class Env {
    static readonly NODE_ENV = envString(process.env.NODE_ENV, 'development')
    static readonly SERVER_HOST = envString(process.env.SERVER_HOST, 'localhost')
    static readonly SERVER_PORT = envInt(process.env.SERVER_PORT, 8000)
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
function envIntOptional(value: string | undefined): number | undefined {
    return value === undefined ? value : parseInt(value, 10);
}

function envFloat(value: string | undefined, defaultValue: number): number {
    return value === undefined ? defaultValue : parseFloat(value);
}
function envFloatErr(value: string | undefined): number {
    if (value === undefined) {
        throw new Error('Empty environment given.');
    }
    return parseFloat(value);
}
function envFloatOptional(value: string | undefined): number | undefined {
    return value === undefined ? value : parseFloat(value);
}


