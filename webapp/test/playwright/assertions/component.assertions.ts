import { Page, expect, Locator } from '@playwright/test';

export class ComponentAssertions {
    readonly page: Page;

    /**
     * The root locator should be the top level element in the component. This is used to 
     * check if the element is present on the page / DOM with the "isPresentOnPage()" function.
     */
    root: Locator;
    /**
     * The locators variable can be used to create a list of locators that should be present
     * in the component. The function "isProperlyLoaded()" can then be used to check if all
     * the elements in the component are there as expected. 
     * 
     * The array of components should be assigned in the class extending the Component Assertions.
     */
    locators: Locator[];
    /** 
     * The name of the component is used in test logging and to create the names of the visual 
     * test files.
     */
    componentName: string;

    constructor(page: Page, componentName: string, root: Locator) {
        this.page = page;
        this.root = root;
        this.locators = [];
        this.componentName = componentName;
    }

    async isPresentOnPage(): Promise<void> {
        await this.root.waitFor();
        expect(await this.root.isVisible({ timeout: 5000 }),
            `Component was NOT FOUND on the page: ${this.root}; \n` +
            'Check: if component is on page or selector is incorrect;'
        ).toEqual(true);
    }

    async isProperlyLoaded(): Promise<void> {
        for (let i = 0; i < this.locators.length; i++) {
            expect((await this.locators[i].elementHandles()).length >= 1,
                `Element was NOT FOUND at least once in the component with: ${this.locators[i]}; \n` +
                'Check: if element is in the component or selector is incorrect;'
            ).toEqual(true);
        }
    }

    async isDisplayedAsExpected(): Promise<void> {
        const element = await this.root.elementHandle();
        const image = element ? await element.screenshot() : fail('element was not found');
        expect(image).toMatchSnapshot(this.componentName + '.png');
    }
}