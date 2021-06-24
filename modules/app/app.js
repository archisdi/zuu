"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const controller_1 = require("../controller/controller");
const controller_factory_1 = require("../factory/controller_factory");
const exception_1 = require("../middleware/exception");
const not_found_1 = require("../middleware/not_found");
class App {
    constructor(port = 8080) {
        this._app = express();
        this._port = port;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.initProviders();
                yield this.initPlugins();
                yield this.initControllers();
                yield this.initExceptionHandlers();
            }
            catch (error) {
                console.error(`fail initializing server on port ${this.port}, ${error}`);
            }
        });
    }
    /** @Overrided */
    initProviders() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    /** @Overrided */
    extendsPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    ;
    get app() {
        return this._app;
    }
    get port() {
        return this._port;
    }
    addController(controller) {
        const ctrl = controller instanceof controller_1.default ? controller : new controller();
        this.app.use(ctrl.path, ctrl.routes);
    }
    addControllerFromModel(model, options) {
        const controller = controller_factory_1.default(model, options);
        this.addController(controller);
    }
    initPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(helmet());
            this.app.use(cors());
            this.app.use(compression());
        });
    }
    initExceptionHandlers() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(not_found_1.default);
            this.app.use(exception_1.default);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('server started on port: ' + this.port);
        });
    }
}
exports.App = App;
exports.default = App;
