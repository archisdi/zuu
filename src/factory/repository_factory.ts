import { BaseModel, StaticMongoModel, StaticRedisModel, StaticSqlModel } from '../model/model';
import MongoRepo from '../repository/mongo_repository';
import RedisRepo from '../repository/redis_repository';
import SQLRepo from '../repository/sql_repository';
import { BaseProps } from '../typings/common';

class RepoFactory {
    public static getSql<ModelClass extends BaseModel, Props extends BaseProps>(modelClass: StaticSqlModel<ModelClass>): SQLRepo<ModelClass, Props> {
        return new (class Repository extends SQLRepo<ModelClass, Props> {
            public constructor() {
                super(modelClass);
            }
        })();
    }

    public static getMongo<ModelClass>(modelClass: StaticMongoModel<ModelClass>): MongoRepo<ModelClass> {
        return new (class Repository extends MongoRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }

    public static getRedis<ModelClass>(modelClass: StaticRedisModel<ModelClass>): RedisRepo<ModelClass> {
        return new (class Repository extends RedisRepo<ModelClass> {
            public constructor() {
                super(modelClass.cacheName);
            }
        })();
    }
}

export default RepoFactory;
