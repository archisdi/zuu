import { RequestHandler, Router } from 'express';
import * as Joi from "joi";
import HandlerFactory from '../factory/handler_factory';
import request_validator from '../middleware/request_validator';
import route_cache from '../middleware/route_cache';
import { MethodHandler } from '../typings/common';

type AllowedMethod = 'get' | 'post' | 'put' | 'delete';
type MiddleWare = RequestHandler | RequestHandler[];

export interface StaticBaseController {
    new(...param: any): Controller;
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

export abstract class Controller {
    private _routes: Router;
    private _middlewares: RequestHandler[] = [];
    private _path: string;

    public constructor({ path, middleware }: ControllerOptions) {
        this._path = path;
        if (middleware) {
            this.setMiddleware(middleware);
        }
        this._routes = Router({ mergeParams: true });
        this.setRoutes();
    }

    protected setMiddleware(middleware: MiddleWare): void {
        if (middleware instanceof Array) {
            this._middlewares = middleware;
        } else {
            this._middlewares.push(middleware);
        }
    }

    protected addRoute<DataOutput = any>(
        httpMethod: AllowedMethod,
        path = '/',
        handler: MethodHandler<DataOutput>,
        options?: RouteOptions
    ): void {
        const middlewares = options?.middlewares ? options.middlewares instanceof Array ? options.middlewares : [options.middlewares] : [];

        if (options?.validate) {
            middlewares.push(request_validator(options.validate));
        }

        if (options?.cache) {
            middlewares.push(route_cache);
        }

        const routeMiddleware: RequestHandler[] = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this._middlewares, ...routeMiddleware], HandlerFactory(handler, options?.cache));
    }

    protected addChildController(controller: StaticBaseController): void {
        const ctrl = new controller();
        this.routes.use(ctrl.path, ctrl.routes);
    }

    abstract setRoutes(): void;

    public get routes(): Router {
        return this._routes;
    }

    public get path(): string {
        return this._path;
    }
}

export default Controller;
