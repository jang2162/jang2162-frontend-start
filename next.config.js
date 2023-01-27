/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    experimental: {
        appDir: true,
    },
    // webpack (config, options) {
    //     const { module = {}, resolve = {}, plugins = [] } = config;
    //     return {
    //         ...config,
    //         module: {
    //             ...module,
    //             rules: [
    //                 ...(module.rules || []),
    //                 {
    //                     test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
    //                     loader: 'file-loader',
    //                     options: {
    //                         name: '[name]_[hash].[ext]',
    //                         publicPath: '/_next/static/files',
    //                         outputPath: 'static/files'
    //                     }
    //                 }
    //             ]
    //         },
    //         // plugins: [
    //         //     ...plugins,
    //         //     new webpack.DefinePlugin({
    //         //         INTROSPECTION_DATA: fs.readFileSync('./introspection.json', 'utf-8').toString(),
    //         //         'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    //         //     }),
    //         //     new Dotenv({ silent: true }),
    //         // ],
    //         }
    //     }
    // }
}

module.exports = nextConfig
