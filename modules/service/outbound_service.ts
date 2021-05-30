import axios, { AxiosInstance } from 'axios';

export abstract class OutboundService {
    protected caller: AxiosInstance;

    constructor(url: string) {
        this.caller = axios.create({ baseURL: url });
    }

    protected async call<T>(path: string, data?: any): Promise<T> {
        return this.caller.post(path, data)
            .then(result => result.data);
    }

    protected async callAsync(path: string, data?: any): Promise<void> {
        setImmediate(() => this.call(path, data));
    }
}

export default OutboundService;
