import { Locator } from '@playwright/test';

export interface ComponentPageObject {
    root: Locator;
    locators: Locator[];
    isPresentOnPage(): Promise<void>;
    isProperlyLoaded(): Promise<void>;
    isDisplayedAsExpected(): Promise<void>;
}