import nextRouteBuilder from 'next-route-util';
import routeInfo from '../routes.json'

const {
    Link, prefetchRoute, pushRoute, replaceRoute, Router, routeInfoList
} = nextRouteBuilder(routeInfo);


export {Link, prefetchRoute, pushRoute, replaceRoute, Router, routeInfoList};