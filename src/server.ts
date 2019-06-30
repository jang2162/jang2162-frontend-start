import express from 'express';
import {readFileSync} from 'fs';
import next from 'next';
import * as spdy from 'spdy';
import conf from '../next.config';
import {getRequestHandler} from './lib/Router';

const dev = process.env.NODE_ENV !== 'production';
const app = next({conf, dev, dir: './src'});
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

    const keyPath = 'cert/self.key';
    const certPath = 'cert/self.crt';
    const port= 8000;
    const host = '0.0.0.0';

    spdy.createServer({
        key: readFileSync(keyPath),
        cert: readFileSync(certPath)
    }, server).listen(port, host, () => {
        console.log(`listening on https://${host==='0.0.0.0' ? '127.0.0.1' : host}:${port}`);
    });
})();


