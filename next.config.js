const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = {
    webpack (config, options) {
        const { module = {}, resolve = {}, plugins = [] } = config;
        return {
            ...config,
            module: {
                ...module,
                rules: [
                    ...(module.rules || []),
                    {
                        test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash].[ext]',
                            publicPath: '/_next/static/files',
                            outputPath: 'static/files'
                        }
                    }
                ]
            },
            plugins: [
                ...plugins,
                new Dotenv({ silent: true })
            ],
            resolve: {
                ...resolve,
                alias: {
                    ...resolve.alias,
                    '@': path.join(__dirname, 'src'),
                    '@r': path.join(__dirname, 'resources'),
                }
            }
        }
    }
}
