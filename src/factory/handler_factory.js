"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerFactory = void 0;
const http_status_codes_1 = require("http-status-codes");
const redis_repository_1 = require("../repository/redis_repository");
const ROUTE_CACHE_TIME = 600;
const parseInput = (req) => ({
    query: req.query,
    params: req.params,
    body: req.body
});
exports.HandlerFactory = (method, isCached = false) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = parseInput(req);
        const context = req === null || req === void 0 ? void 0 : req.context;
        const outData = yield method(data, context);
        /** route caching */
        if (isCached) {
            const PathCache = new redis_repository_1.default('path');
            const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
            yield PathCache.set(cacheKey, outData, ROUTE_CACHE_TIME);
        }
        return res.status(http_status_codes_1.OK).json(outData);
    }
    catch (err) {
        return next(err);
    }
});
exports.default = exports.HandlerFactory;
