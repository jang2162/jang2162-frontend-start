"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var next_routes_1 = require("next-routes");
var path_to_regexp_1 = require("path-to-regexp");
function getMatchFunc(pattern) {
    var regex = path_to_regexp_1.default(pattern);
    return function (path) { return !!regex.exec(path); };
}
function nextRouteBuilder(routeInfo) {
    var routes = new next_routes_1.default();
    var routeInfoList = [];
    for (var name_1 in routeInfo) {
        var info = routeInfo[name_1];
        var page = info.page || name_1;
        var priority = info.priority || 1;
        var layout = info.layout || 'default';
        var param = info.param || {};
        if (info.pattern && Array.isArray(info.pattern)) {
            var j = 0;
            for (var _i = 0, _a = info.pattern; _i < _a.length; _i++) {
                var pattern = _a[_i];
                routeInfoList.push({
                    name: name_1 + "#" + j,
                    pattern: pattern,
                    page: page,
                    priority: priority,
                    layout: layout,
                    param: param,
                    match: getMatchFunc(pattern),
                });
                j++;
            }
        }
        else {
            var pattern = info.pattern || "/" + name_1;
            routeInfoList.push({
                name: name_1,
                pattern: pattern,
                page: page,
                priority: priority,
                layout: layout,
                param: param,
                match: getMatchFunc(pattern),
            });
        }
    }
    routeInfoList.sort(function (a, b) { return b.priority - a.priority; });
    for (var _b = 0, routeInfoList_1 = routeInfoList; _b < routeInfoList_1.length; _b++) {
        var item = routeInfoList_1[_b];
        routes.add(item.name, item.pattern, item.page);
    }
    var Link = routes.Link;
    var Router = routes.Router;
    var prefetchRoute = Router.prefetchRoute;
    var pushRoute = Router.pushRoute;
    var replaceRoute = Router.replaceRoute;
    return {
        Link: Link, Router: Router, prefetchRoute: prefetchRoute, pushRoute: pushRoute, replaceRoute: replaceRoute, routes: routes, routeInfoList: routeInfoList
    };
}
exports.nextRouteBuilder = nextRouteBuilder;
exports.default = nextRouteBuilder;
