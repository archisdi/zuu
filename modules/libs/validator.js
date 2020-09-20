"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemeValidator = exports.COMMON_SCHEME = void 0;
const Joi = require("joi");
const tymon_1 = require("tymon");
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
exports.SchemeValidator = (input, scheme) => {
    return scheme.validateAsync(input).catch((err) => {
        const details = err.details.reduce((detail, item) => {
            detail[item.context.key] = item.message.replace(/"/g, '');
            return detail;
        }, {});
        throw new tymon_1.HttpError.HttpError({
            message: 'error validating fields',
            http_status: 422,
            name: constant_1.COMMON_ERRORS.VALIDATION_ERROR,
            data: details
        });
    });
};
exports.default = exports.SchemeValidator;
