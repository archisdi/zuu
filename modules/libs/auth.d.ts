export interface RefreshToken {
    token: string;
    valid_until: string;
}
export default class Auth {
    private static SALT;
    private static REFRESH_TOKEN_LENGTH;
    private static REFRESH_TOKEN_LIFETIME;
    static generateToken<Claims extends Object>(claims: Claims, withLifetime?: boolean): {
        token: string;
        lifetime: number;
    };
    static verifyJwtToken(token: string): any;
    static generateRefreshToken(): RefreshToken;
    static generateHash(password: string): string;
    static validatePassword: (password: string, hash: string) => boolean;
}
