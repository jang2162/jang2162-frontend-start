import Routes from 'next-routes';

const routes =  new Routes();

export const Link = routes.Link;
export const Router = routes.Router;
export const prefetchRoute = Router.prefetchRoute;
export const pushRoute = Router.pushRoute;
export const replaceRoute = Router.replaceRoute;

export default routes;

