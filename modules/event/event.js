"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const Bull = require("bull");
class Event {
    constructor(eventName) {
        this.queue = new Bull(eventName, String(process.env.QUEUE_WORKER_CONNECTION_STRING));
        this.queue.process(this.handler);
    }
}
exports.Event = Event;
exports.default = Event;
