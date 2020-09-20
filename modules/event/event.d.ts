import * as Bull from 'bull';
import { IObject } from '../typings/common';
export interface StaticEventHandler<dispatchPayload = any> {
    eventName: string;
    handler(payload: dispatchPayload): Promise<void>;
}
export interface StaticBaseEvent<InstanceBaseEvent, dispatchPayload = IObject> {
    new (...param: any): InstanceBaseEvent;
    getInstance(): InstanceBaseEvent;
    dispatch(payload: dispatchPayload): Promise<void>;
}
export declare abstract class Event<PayloadData = IObject> {
    queue: Bull.Queue;
    constructor(eventName: string);
    protected abstract handler({ data }: {
        data: PayloadData;
    }): Promise<void>;
}
export interface StaticEvent {
    new (...params: any): Event;
}
export default Event;
