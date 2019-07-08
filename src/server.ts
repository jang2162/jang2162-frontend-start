import express from 'express';
import env from 'json-env';
import next from 'next';
import conf from '../next.config';
import {getRequestHandler} from './lib/Router';


const dev = !env.getBool('production', false);
const app = next({conf, dev});
const handler = getRequestHandler(app);

const server = express()
    .use(handler)
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
        console.log(`listening on https://${host==='0.0.0.0' ? '127.0.0.1' : host}:${port}`);
    });
})();


