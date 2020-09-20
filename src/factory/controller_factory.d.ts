import { RequestHandler } from 'express';
import BaseController from '../controller/controller';
import { BaseModel } from '../model/model';
import { GenericStaticClass, IContext, IData, IPagination } from '../typings/common';
export interface ControllerOpts {
    middleware?: RequestHandler | RequestHandler[];
    path?: string;
    resource?: string;
}
export interface StaticModel<ClassModel = BaseModel> {
    new (...params: any): ClassModel;
    fillable: string[];
    modelName: string;
    buildFromSql(...params: any): ClassModel;
    create(...params: any): ClassModel;
}
export interface CrudController<ModelProperties> {
    create(data: IData, context: IContext): Promise<ModelProperties>;
    list(data: IData, context: IContext): Promise<{
        data: ModelProperties[];
        pagination: IPagination;
    }>;
    detail(data: IData, context: IContext): Promise<ModelProperties>;
    update(data: IData, context: IContext): Promise<ModelProperties>;
    delete(data: IData, context: IContext): Promise<void>;
}
export declare const RestfulControllerFactory: <ModelClass extends StaticModel<BaseModel<import("../typings/common").BaseProps>>>(Model: ModelClass, options?: ControllerOpts | undefined) => GenericStaticClass<BaseController>;
export default RestfulControllerFactory;
