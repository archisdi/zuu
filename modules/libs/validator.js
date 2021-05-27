"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemeValidator = exports.COMMON_SCHEME = void 0;
const Joi = require("joi");
const http_error_1 = require("../utils/http_error");
const constant_1 = require("../utils/constant");
exports.COMMON_SCHEME = {
    PAGINATION: Joi.object({
        page: Joi.number().integer().positive().default(1).optional(),
        per_page: Joi.number().integer().positive().default(10).optional(),
        sort: Joi.string().optional().default('-created_at')
    })
};
const defaultOptions = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};
exports.SchemeValidator = (input, scheme, options = defaultOptions) => {
    return scheme.validateAsync(input, options)
        .catch((err) => {
        const details = err.details.reduce((detail, item) => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw new http_error_1.HttpError({
            message: 'error validating fields',
            http_status: 422,
            name: constant_1.COMMON_ERRORS.VALIDATION_ERROR,
            data: details
        });
    });
};
exports.default = exports.SchemeValidator;
