"use strict";
exports.__esModule = true;
exports.IntrospectionUtil = void 0;
var graphql_1 = require("graphql");
var IntrospectionUtil = /** @class */ (function () {
    function IntrospectionUtil(introspectionData) {
        this.introspectionData = introspectionData;
        this.items = [];
    }
    IntrospectionUtil.prototype.serialize = function (variables, query) {
        var newVariables = {};
        for (var _i = 0, _a = query.definitions; _i < _a.length; _i++) {
            var definition = _a[_i];
            if (definition.kind === 'OperationDefinition' && (definition === null || definition === void 0 ? void 0 : definition.variableDefinitions)) {
                for (var _b = 0, _c = definition === null || definition === void 0 ? void 0 : definition.variableDefinitions; _b < _c.length; _b++) {
                    var variableDefinition = _c[_b];
                    var valueKey = variableDefinition.variable.name.value;
                    newVariables[valueKey] = this.serializeFromAST(variables[valueKey], variableDefinition.type, false, !!variableDefinition.defaultValue);
                }
            }
        }
        return newVariables;
    };
    IntrospectionUtil.prototype.addScalar = function (name, parse, serialize) {
        this.items.push({ name: name, parse: parse, serialize: serialize });
    };
    IntrospectionUtil.prototype.serializeFromIntrospection = function (value, name) {
        var type = this.introspectionData.__schema.types.find(function (item) { return item.name === name; });
        if (type.kind === 'SCALAR') {
            return this.serializeScalar(value, name);
        }
        else if (type.kind === 'INPUT_OBJECT') {
            return this.serializeInputObject(value, type);
        }
        return value;
    };
    IntrospectionUtil.prototype.serializeInputObject = function (value, type) {
        for (var _i = 0, _a = type.inputFields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (value.hasOwnProperty(field.name) || !type.defaultValue) {
                value[field.name] = this.serializeInputObjectField(value[field.name], field.type, false);
            }
        }
        return value;
    };
    IntrospectionUtil.prototype.serializeInputObjectField = function (value, type, isNonNull) {
        var _this = this;
        if (type.kind === 'SCALAR') {
            if (value || isNonNull) {
                return this.serializeScalar(value, type.name);
            }
        }
        else if (type.kind === 'INPUT_OBJECT') {
            if (value || isNonNull) {
                var inputObjectType = this.introspectionData.__schema.types.find(function (item) { return item.name === name; });
                return this.serializeInputObject(value, inputObjectType.name);
            }
        }
        else if (type.ofType) {
            var ofType_1 = type.ofType;
            if (type.kind === 'NON_NULL') {
                return this.serializeInputObjectField(value, ofType_1, true);
            }
            else if (type.kind === 'LIST') {
                if (Array.isArray(value)) {
                    return value.map(function (item) { return _this.serializeInputObjectField(item, ofType_1, false); });
                }
            }
        }
        return value;
    };
    IntrospectionUtil.prototype.serializeScalar = function (value, name) {
        var scalarItem = this.items.find(function (item) { return item.name === name; });
        if (scalarItem) {
            return scalarItem.serialize(value);
        }
        return value;
    };
    IntrospectionUtil.prototype.serializeFromAST = function (value, type, isNonNull, hasDefault) {
        var _this = this;
        if (hasDefault === void 0) { hasDefault = false; }
        if (type.kind === 'NamedType') {
            if (value || isNonNull) {
                return this.serializeFromIntrospection(value, type.name.value);
            }
        }
        else if (type.kind === 'ListType') {
            if (Array.isArray(value)) {
                return value.map(function (item) { return _this.serializeFromAST(item, type.type, false); });
            }
            else if (isNonNull) {
                throw new graphql_1.GraphQLError('Variable not provide', type);
            }
        }
        else if (type.kind === 'NonNullType') {
            return this.serializeFromAST(value, type.type, !hasDefault);
        }
        return value;
    };
    return IntrospectionUtil;
}());
exports.IntrospectionUtil = IntrospectionUtil;