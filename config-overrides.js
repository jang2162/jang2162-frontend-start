const path = require('path');
const {addBabelPlugins} = require('customize-cra');

const customize = (...items) => config => items.reduce((c, item) => item(c), config);
const DEV = "development";
const PROD = "production";

const overrideDev = (config) => {
    customize(
        ...addBabelPlugins(['styled-components', {
            displayName: true,
            fileName: true,
            minify: false
        }])
    )(config)
}

const overrideProd = (config) => {
    customize(
        ...addBabelPlugins(['styled-components', {
            displayName: false,
            fileName: false,
            minify: true
        }]),
        ...addBabelPlugins(['polished'])
    )(config)
}

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: { '@': path.resolve(__dirname, 'src') },
    };

    if (process.env.NODE_ENV === DEV) {
        overrideDev(config);
    } else if (process.env.NODE_ENV === PROD){
        overrideProd(config);
    }

    return config;
};
