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
const http_status_codes_1 = require("http-status-codes");
const redis_repository_1 = require("../repository/redis_repository");
const RouteCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const PathCache = new redis_repository_1.default('path');
    const context = req.context;
    const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
    const cache = yield PathCache.get(cacheKey);
    if (cache) {
        return res.status(http_status_codes_1.OK).json(cache);
    }
    return next();
});
exports.default = RouteCache;
