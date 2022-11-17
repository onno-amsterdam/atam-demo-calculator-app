import { Page, Request } from "@playwright/test";

export class HttpRequestHelper {
    readonly page: Page;
    readonly endpoint: string;
    readonly timeout: number;

    constructor(page: Page, endpoint: string, timeout: number = 5000) {
        this.page = page;
        this.endpoint = endpoint;
        this.timeout = timeout;
    }

    async catchHttpRequest(): Promise<Request> {
        return this.page.waitForRequest(this.endpoint, { timeout: this.timeout });
    }

    async catchHttpRequestPostData(): Promise<string> {
        const request = await this.catchHttpRequest();
        const body = request.postData();
        if (typeof body === 'string') {
            return body;
        } else {
            throw new Error('the http request did not have post data');
        }
    }

    async httpRequestIsMade(): Promise<boolean> {
        return await this.catchHttpRequest()
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            })
    }
}