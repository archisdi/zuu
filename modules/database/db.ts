import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { Options } from 'sequelize';
import { Transaction } from 'sequelize';

interface DBOpts {
    connection_string: string;
    models_path: string;
    options?: Options;
}

interface DBModel extends Sequelize.ModelType {
    associate?: (models: DBModelCollection) => void
}

interface DBModelCollection { 
    [s:string]: DBModel 
}

export interface DBInstance { 
    model: DBModelCollection; 
    context: Sequelize.Sequelize; 
    ORMProvider: typeof Sequelize; 
    db_transaction: Transaction | null; 
}

const opts: Options = {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : console.log, // tslint:disable-line
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000
    }
};

export class DBModule {
    private static instance: DBInstance;

    public static async initialize({ connection_string, models_path, options }: DBOpts): Promise<void> {
        const models: DBModelCollection = {};
        const sequelize = new Sequelize.Sequelize(connection_string, { ...opts, ...options});
    
        const modelsDir = path.join(__dirname, '../../..', models_path);
        fs.readdirSync(modelsDir)
            .filter((file) => {
                const fileExtension: string = file.slice(-3);
                const isEligible: boolean = (fileExtension === '.js' || fileExtension === '.ts');
                return (file.indexOf('.') !== 0) && isEligible;
            })
            .forEach((file) => {
                const model: DBModel = sequelize.import(path.join(modelsDir, file));
                models[model.name] = model;
            });
    
        Object.keys(models).forEach((modelName) => {
            const subModel = models[modelName];
            if (subModel && subModel.associate) {
                subModel.associate(models);
            }
        });
    
        this.instance = {
            ORMProvider: Sequelize,
            context: sequelize,
            model: models,
            db_transaction: null
        };
    }
    
    public static getInstance(): DBInstance {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
    
    public static getModel(modelName: string): DBModel {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance.model[modelName];
    }
    
    public static async startTransaction(): Promise<void> {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        this.instance.db_transaction = await this.instance.context.transaction({
            isolationLevel: this.instance.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
        });
    }
    
    public static async endTransaction(): Promise<void>{
        if (this.instance) {
            this.instance.db_transaction = null;
        }
    }
    
    public static getTransaction(): Transaction | undefined{
        return this.instance?.db_transaction ? this.instance.db_transaction : undefined;
    }
    
    public static async commit(): Promise<void>{
        if (this.instance && this.instance.db_transaction) {
            await this.instance.db_transaction.commit();
            await this.endTransaction();
        }
    }
    
    public static async rollback(): Promise<void>{
        if (this.instance.db_transaction) {
            await this.instance.db_transaction.rollback();
            await this.endTransaction();
        }
    }
}

export default DBModule;
