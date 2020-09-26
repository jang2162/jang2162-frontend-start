import { DocumentNode } from 'graphql/language/ast';
export declare class IntrospectionUtil {
    private introspectionData;
    private items;
    private parseObject;
    private parseObjectField;
    private parseScalar;
    private serializeFromIntrospection;
    private serializeInputObject;
    private serializeInputObjectField;
    private serializeScalar;
    private serializeFromAST;
    constructor(introspectionData: any);
    serialize(variables: Record<string, any>, query: DocumentNode): Record<string, any>;
    parseData(data?: Record<string, any>): any;
    addScalar<T = any>(name: string, parse: (value: string) => T, serialize: (value: T) => string): void;
}