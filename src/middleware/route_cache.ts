import { NextFunction, Request, Response } from 'express';
import { OK } from 'http-status-codes';
import RedisRepo from '../repository/redis_repository';
import { IContext } from '../typings/common';

const RouteCache = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const PathCache = new RedisRepo<{ [s: string]: any }>('path');

    const context: IContext | null = req.context;
    const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
    const cache = await PathCache.get(cacheKey);

    if (cache) {
        return res.status(OK).json(cache);
    }

    return next();
};

export default RouteCache;

