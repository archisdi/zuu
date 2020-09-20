import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { StaticBaseController } from '../controller/controller';
import RestfulControllerFactory, { ControllerOpts, StaticModel } from '../factory/controller_factory';
import GlobalExceptionHandler from '../middleware/exception';
import RouteNotFoundExceptionHandler from '../middleware/not_found';
import { BaseModel } from '../model/model';

abstract class BaseApp {
    protected _app: express.Application;
    protected _port: number;

    public constructor(port: number = 8080) {
        this._app = express();
        this._port = port;
        this.setSingletonModules();
        this.setPlugins();
        this.setControllers();
        this.setExceptionHandlers();
    }

    /** @Overrided */
    protected setSingletonModules(): void { };

    abstract setControllers(): void;

    public get app(): express.Application {
        return this._app;
    }

    public get port(): number {
        return this._port;
    }

    public addController(controller: StaticBaseController): void {
        const ctrl = new controller();
        this.app.use(ctrl.path, ctrl.routes);
    }

    public addControllerFromModel<ModelClass extends StaticModel<BaseModel>>(model: ModelClass, options?: ControllerOpts): void {
        const controller = RestfulControllerFactory(model, options);
        this.addController(controller);
    }

    private setPlugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private setExceptionHandlers(): void {
        this.app.use(RouteNotFoundExceptionHandler);
        this.app.use(GlobalExceptionHandler);
    }

    public start(): void {
        this.app.listen(this.port, (): void => {
            console.info('server started on port: ' + this.port);
        });
    }
}

export default BaseApp;
