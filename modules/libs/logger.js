"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = require("winston");
class Logger {
    constructor() {
        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()]
        });
    }
}
exports.Logger = Logger;
exports.default = Logger;
