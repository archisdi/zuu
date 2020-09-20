import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon/modules/http_error';
declare const GlobalExceptionHandler: (err: HttpError, req: Request, res: Response, next: NextFunction) => Response;
export default GlobalExceptionHandler;
