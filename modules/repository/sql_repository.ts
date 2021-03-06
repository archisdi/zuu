import { NotFoundError } from '../utils/http_error';
import DBContext, { DBInstance } from '../database/db';
import { Model, StaticSqlModel } from '../model/model';
import { Attributes, BaseProps, Page, QueryOptions } from '../typings/common';
import { offset, sorter } from '../utils/helpers';

const DEFAULT = {
    SORT: '-created_at'
};

export class SQLRepo<ModelClass extends Model, Props extends BaseProps = BaseProps> extends DBContext {
    protected modelName: string;
    private model: StaticSqlModel<ModelClass>;

    public constructor(modelClass: StaticSqlModel<ModelClass>) {
        super();
        this.model = modelClass;
        this.modelName = modelClass.modelName;
    }

    protected build(data: any): ModelClass {
        return this.model.buildFromSql(data);
    }

    protected buildMany(datas: any[]): ModelClass[] {
        return datas.map((data): ModelClass => this.build(data));
    }

    protected getInstance(): DBInstance {
        return SQLRepo.getInstance();
    }

    public async findById(id: string, attributes?: Attributes): Promise<ModelClass | null> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName]
            .findOne({ where: { id }, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOne(conditions: Partial<Props>, attributes?: Attributes): Promise<ModelClass | null> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName]
            .findOne({ where: conditions as any, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOneOrFail(conditions: Partial<Props>, attributes?: Attributes): Promise<ModelClass> {
        return this.findOne(conditions, attributes).then(
            (res: any): ModelClass => {
                if (!res) {
                    throw new NotFoundError(`${this.modelName.toUpperCase()}_NOT_FOUND`);
                }
                return res;
            }
        );
    }

    public async findAll(
        conditions: Partial<Props>,
        { sort = DEFAULT.SORT, attributes }: QueryOptions
    ): Promise<ModelClass[]> {
        const order = sorter(sort);
        const db = SQLRepo.getInstance();
        return db.model[this.modelName]
            .findAll({
                where: conditions as any,
                attributes,
                order: [order as any]
            })
            .then((res: any): any => this.buildMany(res));
    }

    public async upsert(search: Partial<Props>, data: Partial<Props>): Promise<void> {
        return this.findOne(search).then(
            (row): Promise<any> => {
                return row ? this.update(search, data) : this.create(data);
            }
        );
    }

    public async create(data: Partial<Props>): Promise<ModelClass> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName]
            .create(data, { transaction: await SQLRepo.getTransaction() })
            .then((res: any): any => this.build(res));
    }

    public async update(conditions: Partial<Props>, data: Partial<Props>): Promise<[number, any]> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName].update(data, {
            where: conditions as any,
            transaction: await SQLRepo.getTransaction()
        });
    }

    public async delete(conditions: Partial<Props>): Promise<number> {
        const db = DBContext.getInstance();
        return db.model[this.modelName].destroy({
            where: conditions as any,
            transaction: await SQLRepo.getTransaction()
        });
    }

    public async increment(
        conditions: Partial<Props>,
        fields: { [P in keyof ModelClass]?: P extends number ? number : never }
    ): Promise<any> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName].increment(fields, {
            where: conditions as any,
            transaction: await SQLRepo.getTransaction()
        });
    }

    public async count(conditions: Partial<Props>): Promise<number> {
        const db = SQLRepo.getInstance();
        return db.model[this.modelName].count({ where: conditions as any });
    }

    public async paginate(
        conditions: Partial<Props>,
        { page = 1, per_page = 10, sort = DEFAULT.SORT, attributes }: QueryOptions
    ): Promise<Page<ModelClass>> {
        const order = sorter(sort);
        const db = SQLRepo.getInstance();
        return db.model[this.modelName]
            .findAndCountAll({
                where: conditions as any,
                attributes,
                limit: per_page,
                offset: offset(page, per_page),
                order: [order as any]
            })
            .then(({ rows, count }: { rows: any[]; count: number}): Page<ModelClass> => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }

    public async save(model: ModelClass): Promise<void> {
        const props = model.toJson();
        return this.upsert({ id: model.id } as any, props as any);
    }
}

export default SQLRepo;
