export class SimpleError extends Error {
    constructor(message: string, readonly data?: any) {
        super(message);
        this.name = 'SimpleError';
    }

}