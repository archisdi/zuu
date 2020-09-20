import { NextFunction, Request, Response } from 'express';
declare const RouteCache: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export default RouteCache;
