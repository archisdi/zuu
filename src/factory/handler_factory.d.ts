import { RequestHandler } from 'express';
import { MethodHandler } from '../typings/common';
export declare const HandlerFactory: (method: MethodHandler, isCached?: boolean) => RequestHandler;
export default HandlerFactory;
