"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const controller_factory_1 = require("../factory/controller_factory");
const exception_1 = require("../middleware/exception");
const not_found_1 = require("../middleware/not_found");
class App {
    constructor(port = 8080) {
        this._app = express();
        this._port = port;
        this.setSingletonModules();
        this.setPlugins();
        this.setControllers();
        this.setExceptionHandlers();
    }
    /** @Overrided */
    setSingletonModules() { }
    ;
    get app() {
        return this._app;
    }
    get port() {
        return this._port;
    }
    addController(controller) {
        const ctrl = new controller();
        this.app.use(ctrl.path, ctrl.routes);
    }
    addControllerFromModel(model, options) {
        const controller = controller_factory_1.default(model, options);
        this.addController(controller);
    }
    setPlugins() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }
    setExceptionHandlers() {
        this.app.use(not_found_1.default);
        this.app.use(exception_1.default);
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('server started on port: ' + this.port);
        });
    }
}
exports.App = App;
exports.default = App;
