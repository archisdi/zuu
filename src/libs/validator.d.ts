import { IObject } from '../typings/common';
import * as Joi from 'joi';
export declare const COMMON_SCHEME: {
    PAGINATION: Joi.ObjectSchema<any>;
};
export declare const SchemeValidator: (input: IObject, scheme: Joi.ObjectSchema) => any;
export default SchemeValidator;
