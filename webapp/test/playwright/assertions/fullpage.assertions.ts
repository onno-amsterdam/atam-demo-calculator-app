import { Page, expect, Locator } from '@playwright/test';
import { ComponentPageObject } from '../components/component.po';

export class FullPageAssertions {
    readonly page: Page;

    root: Locator;

    // components that should be present on the page
    components: ComponentPageObject[];

    constructor(page: Page, readonly pageName: string, root: Locator) {
        this.page = page;
        this.root = root;
        this.components = [];
    }

    async assertIfOpened(timeout: number = 2000): Promise<void> {
        expect(await this.root.isVisible({ timeout: timeout }),
            `Root element of the ${this.pageName} page was not visible within ${timeout} milliseconds`
        ).toEqual(true);
    }

    async assertIfPageFullyLoaded(): Promise<void> {
        for (let i = 0; i < this.components.length; i++) {
            await this.components[i].isPresentOnPage();
            await this.components[i].isProperlyLoaded();
        }
    }

    async assertIfPageDisplayedProperly(): Promise<void> {
        const image = await this.page.screenshot();
        expect(image).toMatchSnapshot(this.pageName + '.png');
    }
}