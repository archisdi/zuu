"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../libs/validator");
const RequestValidator = (schema) => (req, res, next) => {
    const { query, params, body } = req;
    return validator_1.default({ query, params, body }, schema)
        .then((validated) => {
        req.query = validated.query;
        req.params = validated.params;
        req.body = validated.body;
        return next();
    })
        .catch((err) => next(err));
};
exports.default = RequestValidator;
