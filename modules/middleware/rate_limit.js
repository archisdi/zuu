"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RateLimit = require("express-rate-limit");
const RateLimitRedis = require("rate-limit-redis");
const moment = require("moment");
const database_1 = require("../database");
const http_status_codes_1 = require("http-status-codes");
const RateLimiter = (max = 5, retryAfter = 1) => {
    return RateLimit({
        store: new RateLimitRedis({
            client: database_1.RedisContext.getInstance()
        }),
        windowMs: retryAfter * 60 * 1000,
        max,
        handler: (req, res) => {
            const tryInSec = moment(req.rateLimit.resetTime).diff(moment(), 'seconds');
            const response = {
                error_name: 'TOO_MANY_REQUEST',
                error_message: 'too many requests',
                error_code: http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS,
                error_data: { try_in: tryInSec }
            };
            return res.status(http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS).json(response);
        }
    });
};
exports.default = RateLimiter;
