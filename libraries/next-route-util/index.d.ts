import {ComponentType} from '@types/react';
import Routes, {LinkProps, RouteParams, Router} from 'next-routes';

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
export declare function nextRouteBuilder(routeInfo: RouteInfoType): {
    Link: ComponentType<LinkProps>,
    Router: Router,
    prefetchRoute: (
        route: string,
        params?: RouteParams
    ) => Promise<React.ComponentType<any>>,
    pushRoute: (
        route: string,
        params?: RouteParams,
        options?: any
    ) => Promise<boolean>,
    replaceRoute: (
        route: string,
        params?: RouteParams,
        options?: any
    ) => Promise<React.ComponentType<any>>,
    routes: Routes,
    routeInfoList: RouteInfoListItem[],
};
export default nextRouteBuilder;
