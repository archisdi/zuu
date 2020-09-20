"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_repository_1 = require("./sql_repository");
const mongo_repository_1 = require("./mongo_repository");
const redis_repository_1 = require("./redis_repository");
exports.default = {
    SqlRepo: sql_repository_1.default,
    MongoRepo: mongo_repository_1.default,
    RedisRepo: redis_repository_1.default
};
