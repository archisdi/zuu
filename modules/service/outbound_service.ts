import axios, { AxiosInstance } from 'axios';

export class OutboundService {
    private caller: AxiosInstance;

    constructor(url: string) {
        this.caller = axios.create({ baseURL: url });
    }
}

export default OutboundService;
