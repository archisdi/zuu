import { IObject } from '../typings/common';
import * as Joi from 'joi'
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from '../utils/constant';

export const COMMON_SCHEME = {
    PAGINATION: Joi.object({
        page: Joi.number().integer().positive().default(1).optional(),
        per_page: Joi.number().integer().positive().default(10).optional(),
        sort: Joi.string().optional().default('-created_at')
    })
};

const defaultOptions: IObject = {
    stripUnknown: {
        arrays: false,
        objects: true
    },
    abortEarly: false
};

export const SchemeValidator = (input: IObject, scheme: Joi.ObjectSchema, options = defaultOptions): any => {
    return scheme.validateAsync(input, options)
        .catch((err: any): void => {
            const details = err.details.reduce((detail: any, item: any): IObject => {
                detail[item.context.key] = item.message.replace(/"/g, '');
                return detail;
            }, {});
            throw new HttpError.HttpError({
                message: 'error validating fields',
                http_status: 422,
                name: COMMON_ERRORS.VALIDATION_ERROR,
                data: details
            });
        });
};

export default SchemeValidator;
