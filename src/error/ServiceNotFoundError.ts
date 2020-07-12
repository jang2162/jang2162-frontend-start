import {DocumentNode} from 'graphql';

export class ServiceNotFoundError extends Error {
    constructor(private _target: string | symbol | DocumentNode) {
        super('ServiceNotFoundError');
        this.name = 'ServiceNotFoundError';
    }

    get target(): string | symbol | DocumentNode {
        return this._target;
    }
}