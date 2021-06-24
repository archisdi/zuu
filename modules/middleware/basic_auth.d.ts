import { NextFunction, Request, Response } from 'express';
declare const BasicAuth: (basicUsername: string, basicPassword: string) => (req: Request, res: Response, next: NextFunction) => void;
export default BasicAuth;
