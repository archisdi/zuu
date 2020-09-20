import { NextFunction, Request, Response, RequestHandler } from 'express';
import * as Joi from "joi";
import ValidatorFactory from '../libs/validator';

const RequestValidator = (schema: Joi.ObjectSchema): any => (req: Request, res: Response, next: NextFunction): RequestHandler => {
    const { query, params, body } = req;

    return ValidatorFactory({ query, params, body }, schema)
        .then((validated: any): void => {
            req.query = validated.query;
            req.params = validated.params;
            req.body = validated.body;
            return next();
        })
        .catch((err: Error): void => next(err));
};


export default RequestValidator;
