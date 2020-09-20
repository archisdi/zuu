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
exports.SQLRepo = void 0;
const tymon_1 = require("tymon");
const db_1 = require("tymon/modules/db");
const helpers_1 = require("../utils/helpers");
const DEFAULT = {
    SORT: '-created_at'
};
class SQLRepo extends db_1.default {
    constructor(modelClass) {
        super();
        this.model = modelClass;
        this.modelName = modelClass.modelName;
    }
    build(data) {
        return this.model.buildFromSql(data);
    }
    buildMany(datas) {
        return datas.map((data) => this.build(data));
    }
    getInstance() {
        return SQLRepo.getInstance();
    }
    findById(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName]
                .findOne({ where: { id }, attributes })
                .then((res) => (res ? this.build(res) : null));
        });
    }
    findOne(conditions, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName]
                .findOne({ where: conditions, attributes })
                .then((res) => (res ? this.build(res) : null));
        });
    }
    findOneOrFail(conditions, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne(conditions, attributes).then((res) => {
                if (!res) {
                    throw tymon_1.HttpError.NotFoundError(`${this.modelName.toUpperCase()}_NOT_FOUND`);
                }
                return res;
            });
        });
    }
    findAll(conditions, { sort = DEFAULT.SORT, attributes }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = helpers_1.sorter(sort);
            const db = SQLRepo.getInstance();
            return db.model[this.modelName]
                .findAll({
                where: conditions,
                attributes,
                order: [order]
            })
                .then((res) => this.buildMany(res));
        });
    }
    upsert(search, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne(search).then((row) => {
                return row ? this.update(search, data) : this.create(data);
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName]
                .create(data, { transaction: yield SQLRepo.getTransaction() })
                .then((res) => this.build(res));
        });
    }
    update(conditions, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName].update(data, {
                where: conditions,
                transaction: yield SQLRepo.getTransaction()
            });
        });
    }
    delete(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = db_1.default.getInstance();
            return db.model[this.modelName].destroy({
                where: conditions,
                transaction: yield SQLRepo.getTransaction()
            });
        });
    }
    increment(conditions, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName].increment(fields, {
                where: conditions,
                transaction: yield SQLRepo.getTransaction()
            });
        });
    }
    count(conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = SQLRepo.getInstance();
            return db.model[this.modelName].count({ where: conditions });
        });
    }
    paginate(conditions, { page = 1, per_page = 10, sort = DEFAULT.SORT, attributes }) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = helpers_1.sorter(sort);
            const db = SQLRepo.getInstance();
            return db.model[this.modelName]
                .findAndCountAll({
                where: conditions,
                attributes,
                limit: per_page,
                offset: helpers_1.offset(page, per_page),
                order: [order]
            })
                .then(({ rows, count }) => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
        });
    }
}
exports.SQLRepo = SQLRepo;
exports.default = SQLRepo;
