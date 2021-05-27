import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/http_error';
import { COMMON_ERRORS } from '../utils/constant';

const StaticAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.query.secret !== process.env.API_SECRET && req.headers.secret !== process.env.API_SECRET) {
        return next(new UnauthorizedError('token invalid', COMMON_ERRORS.TOKEN_INVALID));
    }

    return next();
};

export default StaticAuth;
