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
exports.BaseModel = void 0;
const moment = require("moment");
const uuid_1 = require("uuid");
class BaseModel {
    constructor(props) {
        this.hidden = [];
        this.props = props;
    }
    static generateId() {
        return uuid_1.v4();
    }
    static generateTimestamp() {
        return moment().toISOString();
    }
    get id() {
        return this.props.id;
    }
    set id(value) {
        this.props.id = value;
    }
    get created_at() {
        return this.props.created_at;
    }
    set created_at(value) {
        this.props.created_at = value;
    }
    get updated_at() {
        return this.props.updated_at;
    }
    set updated_at(value) {
        this.props.updated_at = value;
    }
    toJson(option = { removeHidden: false, removeTimestamps: false }) {
        const data = Object.assign({}, this.props);
        if (option.removeHidden) {
            this.hidden.forEach((prop) => {
                delete data[prop];
            });
        }
        if (option.removeTimestamps) {
            delete data['created_at'];
            delete data['updated_at'];
            delete data['deleted_at'];
        }
        return data;
    }
    update(data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.props = Object.assign(Object.assign({}, this.props), data);
            if (options === null || options === void 0 ? void 0 : options.validate) {
                yield this.validate();
            }
            if (options === null || options === void 0 ? void 0 : options.save) {
                yield this.save();
            }
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('model validation not implemented');
        });
    }
}
exports.BaseModel = BaseModel;
BaseModel.fillable = ['id', 'created_at', 'updated_at'];
exports.default = BaseModel;
