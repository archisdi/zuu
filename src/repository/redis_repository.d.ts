import RedisContext from 'tymon/modules/redis';
import { IObject } from '../typings/common';
declare class RedisRepo<Model = any> extends RedisContext {
    private path;
    constructor(path: string);
    private parse;
    private stringify;
    get(key: string): Promise<Partial<Model> | null>;
    set(key: string, payload: Partial<Model>, expires?: number): Promise<void>;
    delete(key: string): Promise<void>;
    setHash(key: string, payload: Partial<Model>, expires?: number): Promise<void>;
    getHash(key: string): Promise<Model | null>;
    getAllHash(): Promise<IObject>;
    deleteHash(key: string): Promise<void>;
    setExpire(key: string, time?: number): Promise<void>;
}
export default RedisRepo;