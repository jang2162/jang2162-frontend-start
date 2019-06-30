import next from 'next';
import Routes from 'next-routes';
import routeInfo from '../routes';

const routeInfoList = [];
const routes =  new Routes();

for(const i in routeInfo) {
    const info = routeInfo[i];

    if (info.pattern && Array.isArray(info.pattern)) {
        let j = 0;
        for (const pattern of info.pattern) {
            routeInfoList.push({
                name: `${i}#${j}`,
                pattern,
                page: info.page || i,
                 priority: info.priority || 1,
            });
            j++;
        }
    } else {
        routeInfoList.push({
            name: i,
            pattern: info.pattern || `/${i}`,
            page: info.page || i,
            priority: info.priority || 1,
        })
    }
}

routeInfoList.sort((a,b) => b.priority - a.priority);
for (const item of routeInfoList) {
    routes.add(item.name, item.pattern, item.page);
}

export const Link = routes.Link;
export const Router = routes.Router;
export const prefetchRoute = Router.prefetchRoute;
export const pushRoute = Router.pushRoute;
export const replaceRoute = Router.replaceRoute;

export function getRequestHandler(app: next.Server) {
    return routes.getRequestHandler(app);
}
