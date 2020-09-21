import { Event, StaticBaseEvent, StaticEventHandler } from '../event/event';
export declare const EventFactory: <dispatchPayload = any>(eventHandler: StaticEventHandler<dispatchPayload>) => StaticBaseEvent<Event<import("../typings").IObject<any>>, dispatchPayload>;
export default EventFactory;
