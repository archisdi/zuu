import { NextFunction, Request, Response } from 'express';
declare const StaticAuth: (req: Request, res: Response, next: NextFunction) => void;
export default StaticAuth;
