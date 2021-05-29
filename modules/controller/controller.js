"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
const handler_factory_1 = require("../factory/handler_factory");
const request_validator_1 = require("../middleware/request_validator");
const route_cache_1 = require("../middleware/route_cache");
class Controller {
    constructor({ path, middleware }) {
        this._middlewares = [];
        this._path = path;
        if (middleware) {
            this.setMiddleware(middleware);
        }
        this._routes = express_1.Router({ mergeParams: true });
        this.setRoutes();
    }
    setMiddleware(middleware) {
        if (middleware instanceof Array) {
            this._middlewares = middleware;
        }
        else {
            this._middlewares.push(middleware);
        }
    }
    addRoute(httpMethod, path = '/', handler, options) {
        const middlewares = (options === null || options === void 0 ? void 0 : options.middlewares) ? options.middlewares instanceof Array ? options.middlewares : [options.middlewares] : [];
        if (options === null || options === void 0 ? void 0 : options.validate) {
            middlewares.push(request_validator_1.default(options.validate));
        }
        if (options === null || options === void 0 ? void 0 : options.cache) {
            middlewares.push(route_cache_1.default);
        }
        const routeMiddleware = middlewares instanceof Array ? middlewares : [middlewares];
        this.routes[httpMethod](path, [...this._middlewares, ...routeMiddleware], handler_factory_1.default(handler, options === null || options === void 0 ? void 0 : options.cache));
    }
    addChildController(controller) {
        const ctrl = controller instanceof Controller ? controller : new controller();
        this.routes.use(ctrl.path, ctrl.routes);
    }
    get routes() {
        return this._routes;
    }
    get path() {
        return this._path;
    }
}
exports.Controller = Controller;
exports.default = Controller;
