"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const constant_1 = require("../utils/constant");
const GlobalExceptionHandler = (err, req, res, next) => {
    const { message, httpStatus = http_status_codes_1.INTERNAL_SERVER_ERROR, name, data, code } = err;
    let stack = err && err.stack;
    stack = stack ? stack.split('\n').map((item) => item.trim()) : null;
    const response = {
        error_name: httpStatus === http_status_codes_1.INTERNAL_SERVER_ERROR ? constant_1.COMMON_ERRORS.SERVER_ERROR : name,
        error_message: message,
        error_code: code || httpStatus,
        error_data: data,
        stack
    };
    return res.status(httpStatus).json(response);
};
exports.default = GlobalExceptionHandler;
