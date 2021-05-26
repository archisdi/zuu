import * as express from 'express';
import Controller, { StaticBaseController } from '../controller/controller';
export declare abstract class App {
    protected _app: express.Application;
    protected _port: number;
    constructor(port?: number);
    /** @Overrided */
    protected setSingletonModules(): void;
    abstract setControllers(): void;
    get app(): express.Application;
    get port(): number;
    addController(controller: StaticBaseController | Controller): void;
    private setPlugins;
    private setExceptionHandlers;
    start(): void;
}
export default App;
