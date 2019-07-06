"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.get = get;
exports.getBool = getBool;
exports.getNumber = getNumber;
exports.getString = getString;
exports.default = exports.env = void 0;

var _clone = _interopRequireDefault(require("clone"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var envData = JSON.parse((0, _fs.readFileSync)(process.env.ENV_PATH || './environments/dev.json', 'utf8').toString());
function get(key, defaultValue) {
    if (!key) {
        return envData;
    }

    var keyArr = key.split('.');
    var curVal = envData;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = keyArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var keyItem = _step.value;

            if (keyItem in curVal) {
                curVal = curVal[keyItem];
            } else {
                return defaultValue;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return (0, _clone.default)(curVal);
}

function getBool(key, defaultValue) {
    return !!get(key, defaultValue);
}

function getNumber(key, defaultValue) {
    return parseFloat(get(key, defaultValue));
}

function getString(key, defaultValue) {
    var res = get(key, defaultValue);
    return _typeof(res) === 'object' ? JSON.stringify(res) : res + '';
}

var env = {
    get: get,
    getBool: getBool,
    getNumber: getNumber,
    getString: getString
};
exports.env = env;
var _default = env;
exports.default = _default;