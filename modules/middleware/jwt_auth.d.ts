import { NextFunction, Request, Response } from 'express';
import { IObject } from '../typings/common';
declare const JWTMiddleware: <Tokenable extends IObject<any>>(req: Request, res: Response, next: NextFunction) => Promise<void>;
export default JWTMiddleware;
