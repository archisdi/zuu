import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../utils/http_error';
import { COMMON_ERRORS } from '../utils/constant';

const RouteNotFoundExceptionHandler = (req: Request, res: Response, next: NextFunction): void => {
    const err: any = new NotFoundError('route not found', COMMON_ERRORS.ROUTE_NOT_FOUND);
    return next(err);
};

export default RouteNotFoundExceptionHandler;
