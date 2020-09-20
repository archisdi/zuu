import SqlRepo from './sql_repository';
import MongoRepo from './mongo_repository';
import RedisRepo from './redis_repository';
declare const _default: {
    SqlRepo: typeof SqlRepo;
    MongoRepo: typeof MongoRepo;
    RedisRepo: typeof RedisRepo;
};
export default _default;
