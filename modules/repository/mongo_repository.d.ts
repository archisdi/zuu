import MongoContext from '../database/mongodb';
import { StaticMongoModel } from '../model/model';
import { MakeAny } from '../typings/common';
export declare class MongoRepo<ModelClass> extends MongoContext {
    private collection;
    private model;
    constructor(model: StaticMongoModel<ModelClass>);
    private build;
    private buildMany;
    findOne(condition: MakeAny<ModelClass>): Promise<ModelClass | null>;
    findAll(condition: MakeAny<ModelClass>): Promise<ModelClass[]>;
    createOne(payload: Partial<ModelClass>): Promise<ModelClass>;
    createMany(payloads: Partial<ModelClass>[]): Promise<ModelClass[]>;
    updateOne(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<number>;
    updateMany(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<number>;
    upsert(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<void>;
}
export default MongoRepo;
