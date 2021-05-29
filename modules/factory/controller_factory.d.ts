import { RequestHandler } from 'express';
import BaseController from '../controller/controller';
import { Model } from '../model/model';
import { GenericStaticClass, Context, RequestData, Page } from '../typings/common';
export interface ControllerOpts {
    middleware?: RequestHandler | RequestHandler[];
    path?: string;
    resource?: string;
}
export interface StaticModel<ClassModel = Model> {
    new (...params: any): ClassModel;
    fillable: string[];
    modelName: string;
    buildFromSql(...params: any): ClassModel;
    create(...params: any): ClassModel;
}
export interface CrudController<ModelProperties> {
    create(data: RequestData, context: Context): Promise<ModelProperties>;
    list(data: RequestData, context: Context): Promise<Page<ModelProperties>>;
    detail(data: RequestData, context: Context): Promise<ModelProperties>;
    update(data: RequestData, context: Context): Promise<ModelProperties>;
    delete(data: RequestData, context: Context): Promise<void>;
}
export declare const RestfulControllerFactory: <ModelClass extends StaticModel<Model<import("../typings/common").BaseProps>>>(Model: ModelClass, options?: ControllerOpts | undefined) => GenericStaticClass<BaseController>;
export default RestfulControllerFactory;
