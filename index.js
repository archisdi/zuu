"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.App = void 0;
var app_1 = __importDefault(require("./src/app/app"));
exports.App = app_1.default;
var controller_1 = __importDefault(require("./src/controller/controller"));
exports.Controller = controller_1.default;
