import * as Sequelize from 'sequelize';
import { Options } from 'sequelize';
import { Transaction } from 'sequelize';
interface DBOpts {
    connection_string: string;
    models_path: string;
    options?: Options;
}
interface DBModel extends Sequelize.ModelType {
    associate?: (models: DBModelCollection) => void;
}
interface DBModelCollection {
    [s: string]: DBModel;
}
export interface DBInstance {
    model: DBModelCollection;
    context: Sequelize.Sequelize;
    ORMProvider: typeof Sequelize;
    db_transaction: Transaction | null;
}
export declare class DBModule {
    private static instance;
    static initialize({ connection_string, models_path, options }: DBOpts): Promise<void>;
    static getInstance(): DBInstance;
    static getModel(modelName: string): DBModel;
    static startTransaction(): Promise<void>;
    static endTransaction(): Promise<void>;
    static getTransaction(): Transaction | undefined;
    static commit(): Promise<void>;
    static rollback(): Promise<void>;
}
export default DBModule;
