import { NextFunction, Request, Response } from 'express';
declare const RouteNotFoundExceptionHandler: (req: Request, res: Response, next: NextFunction) => void;
export default RouteNotFoundExceptionHandler;
