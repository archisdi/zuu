"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../utils/http_error");
const constant_1 = require("../utils/constant");
const StaticAuth = (req, res, next) => {
    if (req.query.secret !== process.env.API_SECRET && req.headers.secret !== process.env.API_SECRET) {
        return next(new http_error_1.UnauthorizedError('token invalid', constant_1.COMMON_ERRORS.TOKEN_INVALID));
    }
    return next();
};
exports.default = StaticAuth;
