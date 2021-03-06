import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import Controller, { StaticBaseController } from '../controller/controller';
import RestfulControllerFactory, { ControllerOpts, StaticModel } from '../factory/controller_factory';
import GlobalExceptionHandler from '../middleware/exception';
import RouteNotFoundExceptionHandler from '../middleware/not_found';
import { Model } from '../model';

export abstract class App {
    protected _app: express.Application;
    protected _port: number;

    public constructor(port: number = 8080) {
        this._app = express();
        this._port = port;
    }

    public async initialize(): Promise<void> {
        try {
            await this.initProviders();
            await this.initPlugins();
            await this.initControllers();
            await this.initExceptionHandlers();
        } catch (error) {
            console.error(`fail initializing server on port ${this.port}, ${error}`);
        }
    }

    /** @Overrided */
    protected async initProviders(): Promise<void> {
    };

    /** @Overrided */
    protected async extendsPlugins(): Promise<void> {
    };

    abstract initControllers(): Promise<void>;

    public get app(): express.Application {
        return this._app;
    }

    public get port(): number {
        return this._port;
    }

    public addController(controller: StaticBaseController | Controller): void {
        const ctrl: Controller = controller instanceof Controller ? controller : new controller();
        this.app.use(ctrl.path, ctrl.routes);
    }

    public addControllerFromModel<ModelClass extends StaticModel<Model>>(model: ModelClass, options?: ControllerOpts): void {
        const controller = RestfulControllerFactory(model, options);
        this.addController(controller);
    }

    private async initPlugins(): Promise<void> {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',').map(crs => crs.trim()) || "*" }));
        this.app.use(compression());
        this.app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
        await this.extendsPlugins();
    }

    private async initExceptionHandlers(): Promise<void> {
        this.app.use(RouteNotFoundExceptionHandler);
        this.app.use(GlobalExceptionHandler);
    }

    public start(): void {
        this.app.listen(this.port, (): void => {
            console.info('server started on port: ' + this.port);
        });
    }
}

export default App;
