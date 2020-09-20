import DBContext, { DBInstance } from 'tymon/modules/db';
import { Model, StaticSqlModel } from '../model/model';
import { Attributes, BaseProps, IPagination, QueryOptions } from '../typings/common';
export default class SQLRepo<ModelClass extends Model, Props extends BaseProps = BaseProps> extends DBContext {
    protected modelName: string;
    private model;
    constructor(modelClass: StaticSqlModel<ModelClass>);
    protected build(data: any): ModelClass;
    protected buildMany(datas: any[]): ModelClass[];
    protected getInstance(): DBInstance;
    findById(id: string, attributes?: Attributes): Promise<ModelClass | null>;
    findOne(conditions: Partial<Props>, attributes?: Attributes): Promise<ModelClass | null>;
    findOneOrFail(conditions: Partial<Props>, attributes?: Attributes): Promise<ModelClass>;
    findAll(conditions: Partial<Props>, { sort, attributes }: QueryOptions): Promise<ModelClass[]>;
    upsert(search: Partial<Props>, data: Partial<Props>): Promise<void>;
    create(data: Partial<Props>): Promise<ModelClass>;
    update(conditions: Partial<Props>, data: Partial<Props>): Promise<[number, any]>;
    delete(conditions: Partial<Props>): Promise<number>;
    increment(conditions: Partial<Props>, fields: {
        [P in keyof ModelClass]?: P extends number ? number : never;
    }): Promise<any>;
    count(conditions: Partial<Props>): Promise<number>;
    paginate(conditions: Partial<Props>, { page, per_page, sort, attributes }: QueryOptions): Promise<{
        data: ModelClass[];
        meta: IPagination;
    }>;
}
