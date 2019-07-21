import Routes from 'next-routes'
import pathToRegexp from 'path-to-regexp';


export interface RouteInfoType {
    [k: string]: {
        pattern?: string | string[];
        page?: string;
        layout?: string;
        priority?: number;
        param?: any;
    };
}

export interface RouteInfoListItem {
    name: string;
    pattern: string;
    page: string;
    priority: number;
    layout: string;
    param: any;
    match: (path: string) => boolean;
}

function getMatchFunc(pattern: string) {
    const regex = pathToRegexp(pattern);
    return (path: string) => !!regex.exec(path);
}

export function nextRouteBuilder(routeInfo: RouteInfoType) {
    const routes =  new (Routes as any)();
    const routeInfoList: RouteInfoListItem[] = [];
    for(const name in routeInfo) {
        const info = routeInfo[name];
        const page = info.page || name;
        const priority = info.priority || 1;
        const layout = info.layout || 'default';
        const param = info.param || {};

        if (info.pattern && Array.isArray(info.pattern)) {
            let j = 0;
            for (const pattern of info.pattern) {
                routeInfoList.push({
                    name: `${name}#${j}`,
                    pattern,
                    page,
                    priority,
                    layout,
                    param,
                    match: getMatchFunc(pattern),
                });
                j++;
            }
        } else {
            const pattern = info.pattern || `/${name}`;
            routeInfoList.push({
                name,
                pattern,
                page,
                priority,
                layout,
                param,
                match: getMatchFunc(pattern),
            })
        }
    }
    routeInfoList.sort((a,b) => b.priority - a.priority);


    for (const item of routeInfoList) {
        routes.add(item.name, item.pattern, item.page);
    }

    const Link = routes.Link;
    const Router = routes.Router;
    const prefetchRoute = Router.prefetchRoute;
    const pushRoute = Router.pushRoute;
    const replaceRoute = Router.replaceRoute;

    return {
        Link, Router, prefetchRoute, pushRoute, replaceRoute, routes, routeInfoList
    }
}

export default nextRouteBuilder;
