"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
const Bull = require("bull");
class BaseEvent {
    constructor(eventName) {
        this.queue = new Bull(eventName, String(process.env.QUEUE_WORKER_CONNECTION_STRING));
        this.queue.process(this.handler);
    }
}
exports.BaseEvent = BaseEvent;
exports.default = BaseEvent;
