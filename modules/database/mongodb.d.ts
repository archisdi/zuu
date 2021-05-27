import { Db } from 'mongodb';
interface MongoOpts {
    connection_string: string;
    database: string;
}
export declare type MongoInstance = Db;
export declare class MongodbModule {
    static instance: MongoInstance;
    static initialize({ connection_string, database }: MongoOpts): Promise<void>;
    static getInstance(): MongoInstance;
}
export default MongodbModule;
