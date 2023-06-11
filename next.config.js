const fs = require('fs');
const stailwc = require("stailwc/install");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        swcPlugins: [stailwc({
            engine: 'styled-components'
        })],
    },
    compiler: {
        styledComponents: true,
    },
    env: {
        NEXT_PUBLIC_INTROSPECTION: fs.readFileSync('./introspection.json', 'utf-8'),
    }
}

module.exports = nextConfig
