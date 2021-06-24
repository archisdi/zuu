import { RequestHandler, Router } from 'express';
import * as Joi from "joi";
import Logger from '../libs/logger';
import { HandlerMethod } from '../typings/common';
declare type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
declare type MiddleWare = RequestHandler | RequestHandler[];
export interface StaticBaseController {
    new (...param: any): Controller;
}
interface ControllerOptions {
    path: string;
    middleware?: MiddleWare;
}
interface RouteOptions {
    cache?: boolean;
    middlewares?: MiddleWare;
    validate?: Joi.ObjectSchema;
}
export declare abstract class Controller extends Logger {
    private _routes;
    private _middlewares;
    private _path;
    constructor({ path, middleware }: ControllerOptions);
    protected setMiddleware(middleware: MiddleWare): void;
    protected addRoute<DataOutput = any>(httpMethod: AllowedMethod, path: string | undefined, handler: HandlerMethod<DataOutput>, options?: RouteOptions): void;
    protected addChildController(controller: StaticBaseController | Controller): void;
    abstract setRoutes(): void;
    get routes(): Router;
    get path(): string;
}
export default Controller;
