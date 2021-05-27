"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.TooManyRequestsError = exports.UnprocessableEntityError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
const StatusCode = require("http-status-codes");
class HttpError extends Error {
    constructor({ message, name, http_status, data, code }) {
        super(message);
        this.message = message;
        this.httpStatus = http_status;
        this.name = name;
        this.code = code ? code : String(http_status);
        this.data = data ? data : undefined;
    }
}
exports.HttpError = HttpError;
class BadRequestError extends HttpError {
    constructor(message, code) {
        super({ name: 'BadRequest', http_status: StatusCode.BAD_REQUEST, message, code, });
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends HttpError {
    constructor(message, code) {
        super({ name: 'Unauthorized', http_status: StatusCode.UNAUTHORIZED, message, code, });
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends HttpError {
    constructor(message, code) {
        super({ name: 'Forbidden', http_status: StatusCode.FORBIDDEN, message, code, });
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends HttpError {
    constructor(message, code) {
        super({ name: 'NotFound', http_status: StatusCode.NOT_FOUND, message, code, });
    }
}
exports.NotFoundError = NotFoundError;
class UnprocessableEntityError extends HttpError {
    constructor(message, code) {
        super({ name: 'UnprocessableEntity', http_status: StatusCode.UNPROCESSABLE_ENTITY, message, code, });
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class TooManyRequestsError extends HttpError {
    constructor(message, code) {
        super({ name: 'TooManyRequests', http_status: StatusCode.TOO_MANY_REQUESTS, message, code, });
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
class InternalServerError extends HttpError {
    constructor(message, code) {
        super({ name: 'InternalServerError', http_status: StatusCode.INTERNAL_SERVER_ERROR, message, code, });
    }
}
exports.InternalServerError = InternalServerError;
exports.default = {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    UnprocessableEntityError,
    TooManyRequestsError,
    InternalServerError
};
