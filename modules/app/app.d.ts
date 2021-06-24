import * as express from 'express';
import Controller, { StaticBaseController } from '../controller/controller';
import { ControllerOpts, StaticModel } from '../factory/controller_factory';
import { Model } from '../model';
export declare abstract class App {
    protected _app: express.Application;
    protected _port: number;
    constructor(port?: number);
    initialize(): Promise<void>;
    /** @Overrided */
    protected initProviders(): Promise<void>;
    /** @Overrided */
    protected extendsPlugins(): Promise<void>;
    abstract initControllers(): Promise<void>;
    get app(): express.Application;
    get port(): number;
    addController(controller: StaticBaseController | Controller): void;
    addControllerFromModel<ModelClass extends StaticModel<Model>>(model: ModelClass, options?: ControllerOpts): void;
    private initPlugins;
    private initExceptionHandlers;
    start(): void;
}
export default App;
