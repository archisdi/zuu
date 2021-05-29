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
exports.RestfulControllerFactory = void 0;
const database_1 = require("../database");
const http_error_1 = require("../utils/http_error");
const controller_1 = require("../controller/controller");
const validator_1 = require("../libs/validator");
const repository_factory_1 = require("./repository_factory");
const genericQueryBuilder = (keys, query) => {
    const db = database_1.DBContext.getInstance();
    const Op = db.ORMProvider.Op;
    const conditions = {};
    keys.forEach(key => {
        if (query[key]) {
            conditions[key] = { [Op.like]: `%${query[key]}%` };
        }
    });
    return conditions;
};
exports.RestfulControllerFactory = (Model, options) => {
    const InstanceName = Model.modelName.toUpperCase();
    const PathName = `/${Model.modelName.toLowerCase()}`;
    return class GeneratedController extends controller_1.default {
        constructor() {
            super({
                path: (options === null || options === void 0 ? void 0 : options.path) || PathName,
                middleware: options === null || options === void 0 ? void 0 : options.middleware
            });
        }
        create(data, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const modelInstance = Model.create(data.body);
                yield modelInstance.validate();
                yield modelInstance.save();
                return modelInstance.toJson({ removeHidden: true });
            });
        }
        list(data, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const query = yield validator_1.SchemeValidator(data.query, validator_1.COMMON_SCHEME.PAGINATION);
                const conditions = genericQueryBuilder(Model.fillable, data.query);
                const ModelRepo = repository_factory_1.default.getSql(Model);
                const datas = yield ModelRepo.paginate(conditions, query);
                return {
                    data: datas.data.map(item => item.toJson({ removeHidden: true })),
                    meta: datas.meta
                };
            });
        }
        detail(data, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const ModelRepo = repository_factory_1.default.getSql(Model);
                const modelData = yield ModelRepo.findById(data.params.id);
                if (!modelData) {
                    throw new http_error_1.NotFoundError(`${InstanceName}_NOT_FOUND`);
                }
                return modelData.toJson({ removeHidden: true });
            });
        }
        update(data, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const ModelRepo = repository_factory_1.default.getSql(Model);
                const modelInstance = yield ModelRepo.findById(data.params.id);
                if (!modelInstance) {
                    throw new http_error_1.NotFoundError(`${InstanceName}_NOT_FOUND`);
                }
                /** auto validate and save */
                yield modelInstance.update(data.body, { validate: true, save: true });
                return modelInstance.toJson({ removeHidden: true });
            });
        }
        delete(data, context) {
            return __awaiter(this, void 0, void 0, function* () {
                const ModelRepo = repository_factory_1.default.getSql(Model);
                yield ModelRepo.delete({ id: data.params.id });
            });
        }
        setRoutes() {
            if (options === null || options === void 0 ? void 0 : options.resource) {
                const resource = options.resource.split('').map(i => i.toUpperCase());
                if (resource.includes('C')) {
                    this.addRoute('post', '/', this.create);
                }
                if (resource.includes('R')) {
                    this.addRoute('get', '/', this.list);
                    this.addRoute('get', '/:id', this.detail);
                }
                if (resource.includes('U')) {
                    this.addRoute('put', '/:id', this.update);
                }
                if (resource.includes('D')) {
                    this.addRoute('delete', '/:id', this.delete);
                }
            }
            else {
                this.addRoute('post', '/', this.create);
                this.addRoute('get', '/', this.list);
                this.addRoute('get', '/:id', this.detail);
                this.addRoute('put', '/:id', this.update);
                this.addRoute('delete', '/:id', this.delete);
            }
        }
    };
};
exports.default = exports.RestfulControllerFactory;
