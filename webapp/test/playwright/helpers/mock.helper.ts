import { Page } from "@playwright/test";
import { MockEndpoint } from "../enums/mock.enum";
import { HttpAddressHelper } from "./http-address.helper";

export class Mock<T> {
    private page: Page;
    private endpoint: MockEndpoint | string;
    readonly testData: T;
    readonly address: string;
    readonly status: number;

    constructor(page: Page, endpoint: MockEndpoint | string, testData: T, status: number = 200) {
        this.page = page;
        this.endpoint = endpoint;
        this.testData = testData;
        this.status = status;

        if (this.endpoint.indexOf('*') == -1) {
            this.address = new HttpAddressHelper(this.endpoint).address;
        } else {
            this.address = this.endpoint;
        }
    }

    async mockResponse(): Promise<void> {
        await this.page.unroute(this.address);
        await this.page.route(this.address, (route) =>
            route.fulfill({
                headers: { "access-control-allow-origin": "*" },
                status: this.status,
                body: JSON.stringify(this.testData),
            })
        );
    }
}