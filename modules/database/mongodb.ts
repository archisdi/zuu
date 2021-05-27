import { MongoClient, Db } from 'mongodb';

interface MongoOpts {
    connection_string: string;
    database: string;
}

export type MongoInstance = Db;

export class MongodbModule {
    public static instance: MongoInstance;

    public static  async initialize({ connection_string, database }: MongoOpts): Promise<void>{
        if (!this.instance) {
            this.instance = await MongoClient.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((client) => client.db(database))
                .catch((err) => {
                    throw new Error(`fail initializing mongodb connection, ${err.message}`);
                });
        }
    }
    
    public static getInstance(): MongoInstance {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
}

export default MongodbModule;
