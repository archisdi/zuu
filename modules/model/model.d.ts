import { BaseProps } from '../typings/common';
interface ModelStaticClass<ClassInstance> {
    new (...params: any): ClassInstance;
}
export interface StaticSqlModel<ClassModel = Model> extends ModelStaticClass<ClassModel> {
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}
export interface StaticMongoModel<ClassModel = Model> extends ModelStaticClass<ClassModel> {
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}
export interface StaticRedisModel<ClassModel = Model> extends ModelStaticClass<ClassModel> {
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}
export declare abstract class Model<P extends BaseProps = BaseProps> {
    protected props: P;
    protected hidden: string[];
    constructor(props: P);
    static fillable: string[];
    static generateId(): string;
    static generateTimestamp(): string;
    get id(): string;
    set id(value: string);
    get created_at(): string | null;
    set created_at(value: string | null);
    get updated_at(): string | null;
    set updated_at(value: string | null);
    toJson(option?: {
        removeHidden?: boolean;
        removeTimestamps?: boolean;
    }): P;
    update(data: Partial<P>, options?: {
        save?: boolean;
        validate?: boolean;
    }): Promise<void>;
    save(): Promise<void>;
    validate(): Promise<void>;
}
export default Model;
