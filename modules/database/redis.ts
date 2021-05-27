import * as Redis from 'ioredis';

interface IRedisOpts {
    connection_string: string;
}

export type RedisInstance = Redis.Redis;

export class RedisModule {
    private static instance: RedisInstance;

    public static initialize({ connection_string }: IRedisOpts): void {
        if (!this.instance) {
            this.instance = new Redis(connection_string);
        }
    }
    
    public static getInstance(): RedisInstance {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
}

export default RedisModule;
