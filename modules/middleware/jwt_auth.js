"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_error_1 = require("../utils/http_error");
const auth_1 = require("../libs/auth");
const JWT_EXPIRED_MESSAGE = 'jwt expired';
var RESPONSE_CODE;
(function (RESPONSE_CODE) {
    RESPONSE_CODE["TOKEN_INVALID"] = "TOKEN_INVALID";
    RESPONSE_CODE["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
})(RESPONSE_CODE || (RESPONSE_CODE = {}));
const generateContext = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        user_id: payload.user_id,
    };
});
const JWTMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationToken = req.headers.authorization;
        if (!authorizationToken) {
            throw new http_error_1.UnauthorizedError('token not provided', RESPONSE_CODE.TOKEN_INVALID);
        }
        const [type, token] = authorizationToken.split(' ');
        if (!token || type !== 'Bearer') {
            throw new http_error_1.UnauthorizedError('token signature invalid', RESPONSE_CODE.TOKEN_INVALID);
        }
        let context;
        try {
            const tokenPayload = yield auth_1.default.verifyJwtToken(token);
            context = yield generateContext(tokenPayload);
        }
        catch (err) {
            const message = err.message === JWT_EXPIRED_MESSAGE
                ? ['token expired', RESPONSE_CODE.TOKEN_EXPIRED]
                : ['token invalid', RESPONSE_CODE.TOKEN_INVALID];
            throw new http_error_1.UnauthorizedError(message[0], message[1]);
        }
        // assign context to request
        req.context = context;
        return next();
    }
    catch (err) {
        return next(err);
    }
});
exports.default = JWTMiddleware;
