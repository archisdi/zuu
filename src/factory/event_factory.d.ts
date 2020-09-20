import { BaseEvent, StaticBaseEvent, StaticEventHandler } from '../event/event';
export declare const EventFactory: <dispatchPayload = any>(eventHandler: StaticEventHandler<dispatchPayload>) => StaticBaseEvent<BaseEvent<import("../typings/common").IObject<any>>, dispatchPayload>;
export default EventFactory;
