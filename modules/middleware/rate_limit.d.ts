import * as RateLimit from 'express-rate-limit';
declare const RateLimiter: (max?: number, retryAfter?: number) => RateLimit.RateLimit;
export default RateLimiter;
