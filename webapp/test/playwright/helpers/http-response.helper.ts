import { Page, Response } from "@playwright/test";
import { HttpAddressHelper } from "./http-address.helper";

export class HttpResponseHelper<T> {
    readonly page: Page;
    readonly endpoint: string;
    readonly timeout: number;
    readonly address: string;

    constructor(page: Page, endpoint: string, timeout: number = 5000) {
        this.page = page;
        this.endpoint = endpoint;
        this.timeout = timeout;

        // TODO: this is too complex - fix the creation of the addresses
        if (this.endpoint.indexOf('*') == -1 && this.endpoint.slice(0, 4) !== 'http') {
            this.address = new HttpAddressHelper(this.endpoint).address;
        } else {
            this.address = this.endpoint;
        }
    }

    async catchHttpResponse(): Promise<Response> {
        return this.page.waitForResponse(this.address, { timeout: this.timeout });
    }

    async catchHttpResponseBody(): Promise<T> {
        const response = await this.catchHttpResponse();

        return JSON.parse((await response.body()).toString());
    }
}