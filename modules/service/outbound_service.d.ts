import { AxiosInstance } from 'axios';
export declare abstract class OutboundService {
    protected caller: AxiosInstance;
    constructor(url: string);
    protected call<T>(path: string, data?: any): Promise<T>;
    protected callAsync(path: string, data?: any): Promise<void>;
}
export default OutboundService;
