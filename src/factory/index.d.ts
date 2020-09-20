/// <reference types="qs" />
/// <reference types="express" />
import RepositoryFactory from './repository_factory';
declare const _default: {
    HandlerFactory: (method: import("../typings/common").MethodHandler<any>, isCached?: boolean) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>;
    EventFactory: <dispatchPayload = any>(eventHandler: import("../event/event").StaticEventHandler<dispatchPayload>) => import("../event/event").StaticBaseEvent<import("../..").Event<import("../typings/common").IObject<any>>, dispatchPayload>;
    RepositoryFactory: typeof RepositoryFactory;
};
export default _default;
