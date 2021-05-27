import * as StatusCode from 'http-status-codes';

interface ICustomError {
    message: string;
    name: string;
    http_status: number;
    code?: string;
    data?: any;
}

export class HttpError extends Error {
    public message: string;
    public httpStatus: number;
    public name: string;
    public code: string;
    public data: any;

    constructor({ message, name, http_status, data, code }: ICustomError) {
        super(message);
        this.message = message;
        this.httpStatus = http_status;
        this.name = name;
        this.code = code ? code : String(http_status);
        this.data = data ? data : undefined;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'BadRequest', http_status: StatusCode.BAD_REQUEST, message, code, })
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'Unauthorized', http_status: StatusCode.UNAUTHORIZED, message, code, })
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'Forbidden', http_status: StatusCode.FORBIDDEN, message, code, })
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'NotFound', http_status: StatusCode.NOT_FOUND, message, code, })
    }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'UnprocessableEntity', http_status: StatusCode.UNPROCESSABLE_ENTITY, message, code, })
    }
}

export class TooManyRequestsError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'TooManyRequests', http_status: StatusCode.TOO_MANY_REQUESTS, message, code, })
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string, code?: string) {
        super({ name: 'InternalServerError', http_status: StatusCode.INTERNAL_SERVER_ERROR, message, code, })
    }
}

export default {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    UnprocessableEntityError,
    TooManyRequestsError,
    InternalServerError
};
