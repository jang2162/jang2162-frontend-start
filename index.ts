import express from 'express';
import {readFileSync} from 'fs';
import next from 'next';
import env from './libraries/json-env';
import nextRouteBuilder from './libraries/next-route-util';
import conf from './next.config.js';

const dev = !env.getBool('production', false);
const app = next({conf, dev});

const {routes} = nextRouteBuilder(JSON.parse(readFileSync('./routes.json', 'utf8')));

const server = express()
    .use(routes.getRequestHandler(app))
    .get('*.*', express.static('public'));

(async () => {
    try {
        await app.prepare();
    } catch (ex) {
        console.error(ex.stack);
        process.exit(1);
    }

    const host = env.getString('host', '127.0.0.1');
    const port= env.getNumber('port', 8000);

    server.listen(port, host, () => {
        console.log(`listening on http://${host==='0.0.0.0' ? '127.0.0.1' : host}:${port}`);
    });
})();



