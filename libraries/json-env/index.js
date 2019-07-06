import clone from 'clone';

let envData = null;
export function get(key, defaultValue) {
    if (!envData) {
        envData = {
            'production': false,
            'host': '0.0.0.0',
            'port': 8000,
            'cert': {
                'cert': 'cert/self.crt',
                'key': 'cert/self.key'
            }
        };
    }

    if (!key) { return envData; }

    const keyArr = key.split('.');
    let curVal = envData;
    for (const keyItem of keyArr) {
        if (keyItem in curVal) {
            curVal = curVal[keyItem];
        } else {
            return defaultValue;
        }
    }

    return clone(curVal);
}

export function getBool(key, defaultValue) {
    return !!get(key, defaultValue);
}

export function getNumber(key, defaultValue) {
    return parseFloat(get(key, defaultValue));
}

export function getString(key, defaultValue) {
    let res = get(key, defaultValue);
    return typeof res === 'object' ? JSON.stringify(res) : res + '';
}

export const env = {
    get, getBool, getNumber, getString
};

export default env;