import express from 'express';
import {readFileSync} from 'fs';
import next from 'next';
import * as spdy from 'spdy';
import conf from '../next.config';
import env from './lib/Env';
import {getRequestHandler} from './lib/Router';

const dev = !env.getBool('production', false);
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

    const certPath = env.getString('cert.cert', 'cert/self.crt');
    const keyPath = env.getString('cert.key', 'cert/self.key');
    const host = env.getString('host', '127.0.0.1');
    const port= env.getNumber('port', 8000);

    spdy.createServer({
        key: readFileSync(keyPath),
        cert: readFileSync(certPath)
    }, server).listen(port, host, () => {
        console.log(`listening on https://${host==='0.0.0.0' ? '127.0.0.1' : host}:${port}`);
    });
})();


