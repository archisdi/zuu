import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RedisRepo from '../repository/redis_repository';
import { Context } from '../typings/common';

const RouteCache = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const PathCache = new RedisRepo<{ [s: string]: any }>('path');

    const context: Context | null = req.context;
    const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
    const cache = await PathCache.get(cacheKey);

    if (cache) {
        return res.status(StatusCodes.OK).json(cache);
    }

    return next();
};

export default RouteCache;

