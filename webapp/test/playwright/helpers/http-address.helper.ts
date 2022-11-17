export class HttpAddressHelper {
    // defaults to the local integration api
    private protocol: string = 'http';
    private host: string = 'localhost';
    private port: string = '4000';
    readonly address: string;

    constructor(endpoint: string) {
        require('dotenv').config();
        if (process.env.INTEGRATIONAPIPROTOCOL) this.protocol = process.env.INTEGRATIONAPIPROTOCOL;
        if (process.env.INTEGRATIONAPIHOST) this.host = process.env.INTEGRATIONAPIHOST;
        if (process.env.INTEGRATIONAPIPORT) this.port = process.env.INTEGRATIONAPIPORT;
        this.address = `${this.protocol}://${this.host}:${this.port}${endpoint}`;
    }
}