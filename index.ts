import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';
import env from './libraries/json-env';
import conf from './next.config.js';

const dev = !env.getBool('production', false);
const app = next({conf, dev});
const handle: any = app.getRequestHandler();

const server = express()
    .use(cookieParser())
    .get('*.*', express.static('public'))
    .get('*', handle);

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



