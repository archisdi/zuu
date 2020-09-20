import { RequestHandler, Router } from 'express';
import * as Joi from "joi";
import { MethodHandler } from '../typings/common';
declare type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
declare type MiddleWare = RequestHandler | RequestHandler[];
export interface StaticBaseController {
    new (...param: any): BaseController;
}
interface ControllerOptions {
    path: string;
    middleware?: MiddleWare;
}
interface RouteOptions {
    cache?: boolean;
    middlewares?: MiddleWare;
    validate: Joi.ObjectSchema;
}
export default abstract class BaseController {
    private _routes;
    private _middlewares;
    private _path;
    constructor({ path, middleware }: ControllerOptions);
    protected setMiddleware(middleware: MiddleWare): void;
    protected addRoute<DataOutput = any>(httpMethod: AllowedMethod, path: string | undefined, handler: MethodHandler<DataOutput>, options?: RouteOptions): void;
    protected addChildController(controller: StaticBaseController): void;
    abstract setRoutes(): void;
    get routes(): Router;
    get path(): string;
}
export {};
