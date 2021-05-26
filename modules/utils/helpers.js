"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spitTrim = exports.timestamp = exports.sorter = exports.stringifyObjectKey = exports.trimObjectKey = exports.isEmptyArray = exports.isEmptyObject = exports.offset = exports.parseDataObject = void 0;
const moment = require("moment");
const parseDataObject = (object) => JSON.parse(JSON.stringify(object));
exports.parseDataObject = parseDataObject;
const offset = (page = 1, per_page = 10) => (page - 1) * per_page;
exports.offset = offset;
const isEmptyObject = (object) => !Object.keys(object).length;
exports.isEmptyObject = isEmptyObject;
const isEmptyArray = (array) => array.length === 0;
exports.isEmptyArray = isEmptyArray;
const trimObjectKey = (object) => {
    Object.keys(object).forEach((key) => (object[key] === null || object[key] === '' || object[key] === undefined) && delete object[key]);
    return object;
};
exports.trimObjectKey = trimObjectKey;
const stringifyObjectKey = (object) => {
    Object.keys(object).forEach((key) => {
        object[key] = String(object[key]);
    });
    return object;
};
exports.stringifyObjectKey = stringifyObjectKey;
const sorter = (sort = '-created_at') => {
    let sortString = sort;
    let sortMethod;
    if (sortString.charAt(0) === '-') {
        sortMethod = 'DESC';
        sortString = sort.substr(1);
    }
    else {
        sortMethod = 'ASC';
    }
    return [sortString, sortMethod];
};
exports.sorter = sorter;
const timestamp = () => moment().utc().toISOString();
exports.timestamp = timestamp;
const spitTrim = (str, delimiter = ',') => {
    const strings = str.split(delimiter).map(i => i.trim()).filter(i => i);
    return strings;
};
exports.spitTrim = spitTrim;
exports.default = {
    timestamp: exports.timestamp,
    parseDataObject: exports.parseDataObject,
    offset: exports.offset,
    isEmptyArray: exports.isEmptyArray,
    isEmptyObject: exports.isEmptyObject,
    trimObjectKey: exports.trimObjectKey,
    stringifyObjectKey: exports.stringifyObjectKey,
    spitTrim: exports.spitTrim
};
