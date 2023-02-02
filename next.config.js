const fs = require('fs');
const stailwc = require("stailwc/install");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    experimental: {
        appDir: true,
        swcPlugins: [stailwc()],
    },
    env: {
        NEXT_PUBLIC_INTROSPECTION: fs.readFileSync('./introspection.json', 'utf-8'),
    }
}

module.exports = nextConfig
