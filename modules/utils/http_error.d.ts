interface ICustomError {
    message: string;
    name: string;
    http_status: number;
    code?: string;
    data?: any;
}
export declare class HttpError extends Error {
    message: string;
    httpStatus: number;
    name: string;
    code: string;
    data: any;
    constructor({ message, name, http_status, data, code }: ICustomError);
}
export declare class BadRequestError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class UnauthorizedError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class ForbiddenError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class NotFoundError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class UnprocessableEntityError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class TooManyRequestsError extends HttpError {
    constructor(message: string, code?: string);
}
export declare class InternalServerError extends HttpError {
    constructor(message: string, code?: string);
}
declare const _default: {
    HttpError: typeof HttpError;
    BadRequestError: typeof BadRequestError;
    UnauthorizedError: typeof UnauthorizedError;
    ForbiddenError: typeof ForbiddenError;
    NotFoundError: typeof NotFoundError;
    UnprocessableEntityError: typeof UnprocessableEntityError;
    TooManyRequestsError: typeof TooManyRequestsError;
    InternalServerError: typeof InternalServerError;
};
export default _default;
