"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const random = require("randomstring");
class Auth {
    static generateToken(claims, withLifetime = true) {
        const lifetime = Number(process.env.JWT_LIFETIME);
        const options = {};
        if (withLifetime) {
            options.expiresIn = lifetime;
        }
        const token = jwt.sign(claims, String(process.env.JWT_SECRET), options);
        return {
            token,
            lifetime
        };
    }
    static verifyJwtToken(token) {
        return jwt.verify(token, String(process.env.JWT_SECRET));
    }
    static generateRefreshToken() {
        return {
            token: random.generate(Auth.REFRESH_TOKEN_LENGTH),
            valid_until: moment().add(Auth.REFRESH_TOKEN_LIFETIME, 'days').utc().format()
        };
    }
    static generateHash(password) {
        return bcrypt.hashSync(password, Auth.SALT);
    }
}
exports.default = Auth;
Auth.SALT = 10;
Auth.REFRESH_TOKEN_LENGTH = 50;
Auth.REFRESH_TOKEN_LIFETIME = 7; // days
Auth.validatePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
