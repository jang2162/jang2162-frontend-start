const fs = require('fs');

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        NEXT_PUBLIC_INTROSPECTION: fs.readFileSync('./introspection.json', 'utf-8'),
    }
}

module.exports = nextConfig
