import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/http_error';
import { Context, IObject } from '../typings/common';
import Auth from '../libs/auth';

const JWT_EXPIRED_MESSAGE = 'jwt expired';

enum RESPONSE_CODE {
    TOKEN_INVALID = 'TOKEN_INVALID',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED'
}

const generateContext = async <Tokenable extends IObject>(payload: Tokenable): Promise<Context> => {
    return {
        user_id: payload.user_id,
    };
};

const JWTMiddleware = async <Tokenable extends IObject>(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationToken: string | undefined = req.headers.authorization;
        if (!authorizationToken) {
            throw new UnauthorizedError('token not provided', RESPONSE_CODE.TOKEN_INVALID);
        }

        const [type, token] = authorizationToken.split(' ');
        if (!token || type !== 'Bearer') {
            throw new UnauthorizedError('token signature invalid', RESPONSE_CODE.TOKEN_INVALID);
        }

        let context;
        try {
            const tokenPayload: Tokenable = await Auth.verifyJwtToken(token);
            context = await generateContext<Tokenable>(tokenPayload);
        } catch (err) {
            const message =
                err.message === JWT_EXPIRED_MESSAGE
                    ? ['token expired', RESPONSE_CODE.TOKEN_EXPIRED]
                    : ['token invalid', RESPONSE_CODE.TOKEN_INVALID];

            throw new UnauthorizedError(message[0], message[1]);
        }

        // assign context to request
        req.context = context;

        return next();
    } catch (err) {
        return next(err);
    }
};

export default JWTMiddleware;
