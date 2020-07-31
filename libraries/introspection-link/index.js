"use strict";
exports.__esModule = true;
exports.introspectionLink = void 0;
var client_1 = require("@apollo/client");
function IntrospectionLink(introspection) {
    return new client_1.ApolloLink(function (operation, forward) {

        return forward(operation);
    });
}
exports.IntrospectionLink = IntrospectionLink;
