"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tymon_1 = require("tymon");
const constant_1 = require("../utils/constant");
const RouteNotFoundExceptionHandler = (req, res, next) => {
    const err = tymon_1.HttpError.NotFoundError('route not found', constant_1.COMMON_ERRORS.ROUTE_NOT_FOUND);
    return next(err);
};
exports.default = RouteNotFoundExceptionHandler;
