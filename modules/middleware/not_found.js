"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../utils/http_error");
const constant_1 = require("../utils/constant");
const RouteNotFoundExceptionHandler = (req, res, next) => {
    const err = new http_error_1.NotFoundError('route not found', constant_1.COMMON_ERRORS.ROUTE_NOT_FOUND);
    return next(err);
};
exports.default = RouteNotFoundExceptionHandler;
