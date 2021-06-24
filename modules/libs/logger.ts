import * as winston from "winston";

export abstract class Logger {
    public logger: winston.Logger;
    constructor() {
        this.logger = winston.createLogger({
            transports: [new winston.transports.Console()]
        });  
    }
}

export default Logger;