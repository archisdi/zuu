import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RedisRepo from '../repository/redis_repository';
import { Context, RequestData, HandlerMethod } from '../typings/common';

const ROUTE_CACHE_TIME = 600;

const parseInput = (req: Request): RequestData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export const HandlerFactory = (method: HandlerMethod, isCached = false): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const data = parseInput(req);
        const context: Context = req?.context;
        const outData: any = await method(data, context);

        /** route caching */
        if (isCached) {
            const PathCache = new RedisRepo<{ [s: string]: any }>('path');
            const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
            await PathCache.set(cacheKey, outData, ROUTE_CACHE_TIME);
        }

        return res.status(StatusCodes.OK).json(outData);
    } catch (err) {
        return next(err);
    }
};

export default HandlerFactory;
