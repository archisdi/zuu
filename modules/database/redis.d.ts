import * as Redis from 'ioredis';
interface IRedisOpts {
    connection_string: string;
}
export declare type RedisInstance = Redis.Redis;
export declare class RedisModule {
    private static instance;
    static initialize({ connection_string }: IRedisOpts): void;
    static getInstance(): RedisInstance;
}
export default RedisModule;
