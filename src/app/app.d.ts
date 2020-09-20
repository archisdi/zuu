import * as express from 'express';
import { StaticBaseController } from '../controller/controller';
import { ControllerOpts, StaticModel } from '../factory/controller_factory';
import { BaseModel } from '../model/model';
declare abstract class BaseApp {
    protected _app: express.Application;
    protected _port: number;
    constructor(port?: number);
    /** @Overrided */
    protected setSingletonModules(): void;
    abstract setControllers(): void;
    get app(): express.Application;
    get port(): number;
    addController(controller: StaticBaseController): void;
    addControllerFromModel<ModelClass extends StaticModel<BaseModel>>(model: ModelClass, options?: ControllerOpts): void;
    private setPlugins;
    private setExceptionHandlers;
    start(): void;
}
export default BaseApp;
