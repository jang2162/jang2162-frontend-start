import cookieParser from 'cookie-parser';
import express from 'express';
import next from 'next';
import conf from './next.config.js';
import {Env} from './src/env';

const dev = Env.NODE_ENV !== 'production';
const app = next({conf: conf as any, dev});
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

    const host = Env.SERVER_HOST ?? '127.0.0.1';
    const port = Env.SERVER_PORT ?? 8000;
    server.listen(port, () => {
        console.log(`listening on http://${host==='0.0.0.0' ? '127.0.0.1' : host}:${port}`);
    });
})();



