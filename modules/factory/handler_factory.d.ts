import { RequestHandler } from 'express';
import { HandlerMethod } from '../typings/common';
export declare const HandlerFactory: (method: HandlerMethod, isCached?: boolean) => RequestHandler;
export default HandlerFactory;
