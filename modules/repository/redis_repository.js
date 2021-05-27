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
exports.RedisRepo = void 0;
const redis_1 = require("../database/redis");
class RedisRepo extends redis_1.default {
    constructor(path) {
        super();
        this.path = path;
    }
    parse(serialize) {
        try {
            return JSON.parse(serialize);
        }
        catch (error) {
            return serialize;
        }
    }
    stringify(object) {
        if (typeof object === 'object') {
            return JSON.stringify(object);
        }
        return String(object);
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            return redisClient
                .get(`${this.path}-${key}`)
                .then((res) => (res ? this.parse(res) : null));
        });
    }
    set(key, payload, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            const cacheKey = `${this.path}-${key}`;
            const cachePayload = this.stringify(payload);
            yield redisClient.set(cacheKey, cachePayload);
            if (expires) {
                yield this.setExpire(cacheKey, expires);
            }
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            yield redisClient.del(`${this.path}-${key}`);
        });
    }
    setHash(key, payload, expires) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            const cachePayload = this.stringify(payload);
            yield redisClient.hset(this.path, key, cachePayload);
            if (expires) {
                yield this.setExpire(key, expires);
            }
        });
    }
    getHash(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            return redisClient.hget(this.path, key)
                .then((res) => (res ? this.parse(res) : null));
        });
    }
    getAllHash() {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            return redisClient.hgetall(this.path)
                .then((res) => {
                Object.keys(res).forEach(key => {
                    res[key] = this.parse(res[key]);
                });
                return res;
            });
        });
    }
    deleteHash(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            yield redisClient.hdel(this.path, key);
        });
    }
    setExpire(key, time = 600) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisClient = RedisRepo.getInstance();
            yield redisClient.expire(key, time);
        });
    }
}
exports.RedisRepo = RedisRepo;
exports.default = RedisRepo;
