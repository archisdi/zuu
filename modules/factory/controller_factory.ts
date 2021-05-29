import { RequestHandler } from 'express';
import { DBContext } from '../database';
import { NotFoundError } from '../utils/http_error';
import BaseController from '../controller/controller';
import { COMMON_SCHEME, SchemeValidator } from '../libs/validator';
import { Model } from '../model/model';
import { GenericStaticClass, Context, RequestData, IObject, Page } from '../typings/common';
import RepoFactory from './repository_factory';

export interface ControllerOpts {
    middleware?: RequestHandler | RequestHandler[];
    path?: string;
    resource?: string;
}

export interface StaticModel<ClassModel = Model> {
    new(...params: any): ClassModel;
    fillable: string[];
    modelName: string;
    buildFromSql(...params: any): ClassModel;
    create(...params: any): ClassModel;
}

export interface CrudController<ModelProperties> {
    create(data: RequestData, context: Context): Promise<ModelProperties>
    list(data: RequestData, context: Context): Promise<Page<ModelProperties>>
    detail(data: RequestData, context: Context): Promise<ModelProperties>
    update(data: RequestData, context: Context): Promise<ModelProperties>
    delete(data: RequestData, context: Context): Promise<void>
}

const genericQueryBuilder = (keys: string[], query: IObject): IObject => {
    const db = DBContext.getInstance();
    const Op = db.ORMProvider.Op;
    const conditions: IObject = {};

    keys.forEach(key => {
        if (query[key]) {
            conditions[key] = { [Op.like]: `%${query[key]}%` };
        }
    });

    return conditions;
};

export const RestfulControllerFactory = <ModelClass extends StaticModel<Model>>(Model: ModelClass, options?: ControllerOpts): GenericStaticClass<BaseController> => {
    type ModelProps = ConstructorParameters<typeof Model>[0];

    const InstanceName = Model.modelName.toUpperCase();
    const PathName = `/${Model.modelName.toLowerCase()}`;

    return class GeneratedController extends BaseController implements CrudController<ModelProps> {
        public constructor() {
            super({
                path: options?.path || PathName,
                middleware: options?.middleware
            });
        }

        public async create(data: RequestData<any, any, ModelProps>, context: Context): Promise<ModelProps> {
            const modelInstance = Model.create(data.body);
            await modelInstance.validate();
            await modelInstance.save();
            return modelInstance.toJson({ removeHidden: true });
        }

        public async list(data: RequestData, context: Context): Promise<Page<ModelProps>> {
            const query = await SchemeValidator(data.query, COMMON_SCHEME.PAGINATION);

            const conditions = genericQueryBuilder(Model.fillable, data.query);
            const ModelRepo = RepoFactory.getSql(Model);
            const datas = await ModelRepo.paginate(conditions, query);

            return {
                data: datas.data.map(item => item.toJson({ removeHidden: true })),
                meta: datas.meta
            };
        }

        public async detail(data: RequestData, context: Context): Promise<ModelProps> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelData = await ModelRepo.findById(data.params.id);
            if (!modelData) {
                throw new NotFoundError(`${InstanceName}_NOT_FOUND`);
            }
            return modelData.toJson({ removeHidden: true });
        }

        public async update(data: RequestData<any, { id: string }, ModelProps>, context: Context): Promise<ModelProps> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelInstance = await ModelRepo.findById(data.params.id);

            if (!modelInstance) {
                throw new NotFoundError(`${InstanceName}_NOT_FOUND`);
            }

            /** auto validate and save */
            await modelInstance.update(data.body, { validate: true, save: true });
            return modelInstance.toJson({ removeHidden: true });
        }

        public async delete(data: RequestData, context: Context): Promise<void> {
            const ModelRepo = RepoFactory.getSql(Model);
            await ModelRepo.delete({ id: data.params.id } as any);
        }

        public setRoutes(): void {
            if (options?.resource) {
                const resource = options.resource.split('').map(i => i.toUpperCase());
                if (resource.includes('C')) {
                    this.addRoute('post', '/', this.create);
                }
                if (resource.includes('R')) {
                    this.addRoute('get', '/', this.list);
                    this.addRoute('get', '/:id', this.detail);
                }
                if (resource.includes('U')) {
                    this.addRoute('put', '/:id', this.update);
                }
                if (resource.includes('D')) {
                    this.addRoute('delete', '/:id', this.delete);
                }
            } else {
                this.addRoute('post', '/', this.create);
                this.addRoute('get', '/', this.list);
                this.addRoute('get', '/:id', this.detail);
                this.addRoute('put', '/:id', this.update);
                this.addRoute('delete', '/:id', this.delete);
            }
        }
    };
};

export default RestfulControllerFactory;