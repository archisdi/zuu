import { Model, StaticMongoModel, StaticRedisModel, StaticSqlModel } from '../model/model';
import MongoRepo from '../repository/mongo_repository';
import RedisRepo from '../repository/redis_repository';
import SQLRepo from '../repository/sql_repository';
import { BaseProps } from '../typings/common';
export declare class RepoFactory {
    static getSql<ModelClass extends Model, Props extends BaseProps>(modelClass: StaticSqlModel<ModelClass>): SQLRepo<ModelClass, Props>;
    static getMongo<ModelClass>(modelClass: StaticMongoModel<ModelClass>): MongoRepo<ModelClass>;
    static getRedis<ModelClass>(modelClass: StaticRedisModel<ModelClass>): RedisRepo<ModelClass>;
}
export default RepoFactory;
