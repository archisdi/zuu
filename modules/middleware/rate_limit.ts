import * as RateLimit from 'express-rate-limit';
import * as RateLimitRedis from 'rate-limit-redis';
import * as moment from 'moment';
import { RedisContext } from '../database';
import { StatusCodes } from 'http-status-codes';

const RateLimiter = (max = 5, retryAfter = 1): RateLimit.RateLimit => {
    return RateLimit({
        store: new RateLimitRedis({
            client: RedisContext.getInstance()
        }),
        windowMs: retryAfter * 60 * 1000,
        max,
        handler: (req: any, res: any) => {
            const tryInSec = moment(req.rateLimit.resetTime).diff(moment(), 'seconds');
            const response = {
                error_name: 'TOO_MANY_REQUEST',
                error_message: 'too many requests',
                error_code: StatusCodes.TOO_MANY_REQUESTS,
                error_data: { try_in: tryInSec }
            };
            return res.status(StatusCodes.TOO_MANY_REQUESTS).json(response);
        }
    });
};

export default RateLimiter;