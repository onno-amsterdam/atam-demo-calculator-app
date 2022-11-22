import { Locator, LocatorScreenshotOptions, Page } from '@playwright/test';
import { FullPageAssertions } from '../assertions/fullpage.assertions';
import { FullPagePageObject } from './fullpage.po';

export class CalculatorPage extends FullPageAssertions implements FullPagePageObject {
    readonly route: string = '/';

    // locators
    readonly title: Locator;
    readonly number1Field: Locator;
    readonly number2Field: Locator;
    readonly addUpButton: Locator;
    readonly resultField: Locator;
    readonly number1FieldError: Locator;
    readonly number2FieldError: Locator;
    readonly somethingWentWrongError: Locator;

    // selectors
    readonly titleSelector: string = '#header';
    readonly number1FieldSelector: string = '#number1';
    readonly number2FieldSelector: string = '#number2';
    readonly addUpButtonSelector: string = '#calculateButton';
    readonly resultFieldSelector: string = '#resultField';
    readonly number1FieldErrorSelector: string = '#notANumberErrorNumber1';
    readonly number2FieldErrorSelector: string = '#notANumberErrorNumber2';
    readonly somethingWentWrongErrorSelector: string = '#somethingWentWrongError';

    constructor(page: Page) {
        super(page, 'Calculator', page.locator('body'));

        this.components = [];

        this.title = this.page.locator(this.titleSelector);
        this.number1Field = this.page.locator(this.number1FieldSelector);
        this.number2Field = this.page.locator(this.number2FieldSelector);
        this.addUpButton = this.page.locator(this.addUpButtonSelector);
        this.resultField = this.page.locator(this.resultFieldSelector);
        this.number1FieldError = this.page.locator(this.number1FieldErrorSelector);
        this.number2FieldError = this.page.locator(this.number2FieldErrorSelector);
        this.somethingWentWrongError = this.page.locator(this.somethingWentWrongErrorSelector);
    }

    openPage() {
        return this.page.goto(this.route);
    }
}