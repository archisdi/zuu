"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBModule = void 0;
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const opts = {
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    pool: {
        min: 0,
        max: 5,
        idle: 10000,
        acquire: 20000
    }
};
class DBModule {
    static initialize({ connection_string, models_path, options }) {
        return __awaiter(this, void 0, void 0, function* () {
            const models = {};
            const sequelize = new Sequelize.Sequelize(connection_string, Object.assign(Object.assign({}, opts), options));
            const modelsDir = path.join(__dirname, '../../..', models_path);
            fs.readdirSync(modelsDir)
                .filter((file) => {
                const fileExtension = file.slice(-3);
                const isEligible = (fileExtension === '.js' || fileExtension === '.ts');
                return (file.indexOf('.') !== 0) && isEligible;
            })
                .forEach((file) => {
                const model = sequelize.import(path.join(modelsDir, file));
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
        });
    }
    static getInstance() {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance;
    }
    static getModel(modelName) {
        if (!this.instance) {
            throw new Error('Not initialize');
        }
        return this.instance.model[modelName];
    }
    static startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                throw new Error('Not initialize');
            }
            this.instance.db_transaction = yield this.instance.context.transaction({
                isolationLevel: this.instance.ORMProvider.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
            });
        });
    }
    static endTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.instance) {
                this.instance.db_transaction = null;
            }
        });
    }
    static getTransaction() {
        var _a;
        return ((_a = this.instance) === null || _a === void 0 ? void 0 : _a.db_transaction) ? this.instance.db_transaction : undefined;
    }
    static commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.instance && this.instance.db_transaction) {
                yield this.instance.db_transaction.commit();
                yield this.endTransaction();
            }
        });
    }
    static rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.instance.db_transaction) {
                yield this.instance.db_transaction.rollback();
                yield this.endTransaction();
            }
        });
    }
}
exports.DBModule = DBModule;
exports.default = DBModule;
