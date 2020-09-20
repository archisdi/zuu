"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoFactory = void 0;
const mongo_repository_1 = require("../repository/mongo_repository");
const redis_repository_1 = require("../repository/redis_repository");
const sql_repository_1 = require("../repository/sql_repository");
class RepoFactory {
    static getSql(modelClass) {
        return new (class Repository extends sql_repository_1.default {
            constructor() {
                super(modelClass);
            }
        })();
    }
    static getMongo(modelClass) {
        return new (class Repository extends mongo_repository_1.default {
            constructor() {
                super(modelClass);
            }
        })();
    }
    static getRedis(modelClass) {
        return new (class Repository extends redis_repository_1.default {
            constructor() {
                super(modelClass.cacheName);
            }
        })();
    }
}
exports.RepoFactory = RepoFactory;
exports.default = RepoFactory;
