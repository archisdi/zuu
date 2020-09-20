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
const mongodb_1 = require("tymon/modules/mongodb");
class MongoRepo extends mongodb_1.default {
    constructor(model) {
        super();
        this.model = model;
        this.collection = this.model.collectionName;
    }
    build(data) {
        return this.model.buildFromMongo(data);
    }
    buildMany(datas) {
        return datas.map((data) => this.build(data));
    }
    findOne(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .findOne(condition)
                .then((res) => (res ? this.build(res) : null));
        });
    }
    findAll(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .find(condition)
                .toArray()
                .then((res) => this.buildMany(res));
        });
    }
    createOne(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .insertOne(payload)
                .then((res) => (res ? this.build(res.ops[0]) : null));
        });
    }
    createMany(payloads) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .insertMany(payloads)
                .then((res) => this.buildMany(res.ops));
        });
    }
    updateOne(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .updateOne(condition, { $set: payload })
                .then(({ result }) => result.nModified);
        });
    }
    updateMany(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = MongoRepo.getInstance();
            return db
                .collection(this.collection)
                .updateMany(condition, { $set: payload })
                .then(({ result }) => result.nModified);
        });
    }
    upsert(condition, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne(condition).then((res) => (res ? this.updateOne(condition, payload) : this.createOne(payload)));
        });
    }
}
exports.default = MongoRepo;
