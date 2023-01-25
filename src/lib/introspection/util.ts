import {GraphQLError} from 'graphql';
import {DocumentNode, TypeNode} from 'graphql/language/ast';

import {parseDateValue} from './scalar/DateScalar';

interface IntersectionType {
    kind: string
    name: string
    ofType?: IntersectionType
}

class IntrospectionUtil {
    private items: Array<{name: string, parse: (value: string) => any, serialize: (value: any) => string}> = [];
    constructor(private introspectionData: any) {}

    serialize(variables: Record<string, any>, query: DocumentNode) {
        const newVariables: Record<string, any> = {};
        for (const definition of query.definitions) {
            if (definition.kind === 'OperationDefinition' && definition?.variableDefinitions) {
                for (const variableDefinition of definition?.variableDefinitions || []) {
                    const valueKey = variableDefinition.variable.name.value;
                    newVariables[valueKey] = this.serializeFromAST(variables[valueKey], variableDefinition.type, false, !!variableDefinition.defaultValue);
                }
            }
        }
        return newVariables;
    }

    parseData(data?: any) {
        if (!data) {
            return data;
        }
        const returnData: any = {};
        for (const i in data) {
            if (Array.isArray(data[i])) {
                returnData[i] = new Array(data[i] as any).map((item: any) => this.parseObject(item))
            } else {
                returnData[i] = this.parseObject(data[i])
            }
        }
        return returnData;
    }

    addScalar<T=any>(name: string, parse: (value: string) => T, serialize: (value: T) => string) {
        this.items.push({name, parse, serialize});
    }

    private parseObject(data: Record<string, any>) {
        const type = this.introspectionData.__schema.types.find((item: any) => item.name === data.__typename && item.kind === 'OBJECT');
        const returnData: any = {};
        for (const field of type.fields) {
            if (field.name in data) {
                returnData[field.name] = this.parseObjectField(data[field.name], field.type, false);
            }
        }
        return returnData;
    }

    private parseObjectField(value: any, type: IntersectionType, isNonNull: boolean): any  {
        if (type.kind === 'SCALAR') {
            if (value || isNonNull) {
                return this.parseScalar(value, type.name);
            }
        } else if (type.kind === 'OBJECT') {
            if (value || isNonNull) {
                return this.parseObject(value);
            }
        } else if (type.ofType) {
            const ofType = type.ofType;
            if (type.kind === 'NON_NULL') {
                return this.parseObjectField(value, ofType, true);
            } else if (type.kind === 'LIST') {
                if (Array.isArray(value)) {
                    return value.map(item => this.parseObjectField(item, ofType, false))
                }
            }
        }
        return value;
    }

    private parseScalar(value: any, name: string) {
        const scalarItem = this.items.find((item: any) => item.name === name);
        if (scalarItem) {
            return scalarItem.parse(value);
        }
        return value;
    }

    private serializeFromIntrospection(value: any, name: string) {
        const type = this.introspectionData.__schema.types.find((item: any) => item.name === name);
        if (type.kind === 'SCALAR') {
            return this.serializeScalar(value, name);
        } else if (type.kind === 'INPUT_OBJECT') {
            return this.serializeInputObject(value, type);
        }
        return value;
    }

    private serializeInputObject(value: any, type: any): any {
        for (const field of type.inputFields) {
            if (field.name in value || !type.defaultValue ) {
                value[field.name] = this.serializeInputObjectField(value[field.name], field.type, false);
            }
        }
        return value;
    }

    private serializeInputObjectField(value: any, type: IntersectionType, isNonNull: boolean): any {
        if (type.kind === 'SCALAR') {
            if (value || isNonNull) {
                return this.serializeScalar(value, type.name);
            }
        } else if (type.kind === 'INPUT_OBJECT') {
            if (value || isNonNull) {
                const inputObjectType = this.introspectionData.__schema.types.find((item: any) => item.name === name);
                return this.serializeInputObject(value, inputObjectType.name);
            }
        } else if (type.ofType) {
            const ofType = type.ofType;
            if (type.kind === 'NON_NULL') {
                return this.serializeInputObjectField(value, ofType, true);
            } else if (type.kind === 'LIST') {
                if (Array.isArray(value)) {
                    return value.map(item => this.serializeInputObjectField(item, ofType, false))
                }
            }
        }
        return value;
    }

    private serializeScalar(value: any, name: string) {
        const scalarItem = this.items.find((item: any) => item.name === name);
        if (scalarItem) {
            return scalarItem.serialize(value);
        }
        return value;
    }

    private serializeFromAST(value: any, type: TypeNode, isNonNull: boolean, hasDefault = false): any {
        if (type.kind === 'NamedType') {
            if (value || isNonNull) {
                return this.serializeFromIntrospection(value, type.name.value);
            }
        } else if (type.kind === 'ListType') {
            if (Array.isArray(value)) {
                return value.map(item => this.serializeFromAST(item, type.type, false))
            } else if (isNonNull){
                throw new GraphQLError('Variable not provide', type);
            }
        } else if (type.kind === 'NonNullType') {
            return this.serializeFromAST(value, type.type, !hasDefault);
        }
        return value;
    }
}
declare const INTROSPECTION_DATA: any;
export const introspectionUtil = new IntrospectionUtil(INTROSPECTION_DATA)

introspectionUtil.addScalar<Date>('Date', value => parseDateValue(value).startOf('date').toDate(), value => parseDateValue(value).format('YYYY-MM-DD'));


