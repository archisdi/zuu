"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_1 = require("../utils/constant");
const http_error_1 = require("../utils/http_error");
const BasicAuth = (basicUsername, basicPassword) => (req, res, next) => {
    var _a;
    const [tokenType, credentials] = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) || [null, null];
    /** check token type */
    if (tokenType && tokenType.toLowerCase() !== constant_1.TOKEN_TYPE.BASIC.toLowerCase()) {
        return next(new http_error_1.UnauthorizedError('token type invalid', constant_1.COMMON_ERRORS.TOKEN_INVALID));
    }
    /** check credentials */
    const [username, password] = (credentials === null || credentials === void 0 ? void 0 : credentials.split(":")) || [null, null];
    if (username !== basicUsername || password !== basicPassword) {
        return next(new http_error_1.UnauthorizedError('invalid credentials', constant_1.COMMON_ERRORS.INVALID_CREDENTIALS));
    }
    return next();
};
exports.default = BasicAuth;
