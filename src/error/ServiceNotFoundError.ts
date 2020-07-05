export class ServiceNotFoundError extends Error {
    constructor(private _target: string | symbol) {
        super('ServiceNotFoundError');
        this.name = 'ServiceNotFoundError';
    }

    get target(): string | symbol {
        return this._target;
    }
}