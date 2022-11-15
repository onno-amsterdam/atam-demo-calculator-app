// When the user opens the calculator app;
// Then the calculator window opens;
// And the window has a header "Calculator";
// And the window has a text field with default value "number 1 here"
// And the window has a text field with default value "number 2 here"
// And the window has a purple button with text "Add up!"
// And the window has an element with text "Result"

import { Page, test, expect } from '@playwright/test';
import { CalculatorPage } from '../playwright/pages/calculator.page.po';

test.describe('Calculator page', () => {
    let calculatorPage: CalculatorPage;

    async function arrange(page: Page) {
        calculatorPage = new CalculatorPage(page);
    }

    test('SHOULD - all elements on page', async ({ page }) => {
        // ARRANGE
        await arrange(page);

        // ACT
        await calculatorPage.openPage();

        // ASSERT
        await calculatorPage.title.isVisible();
        await calculatorPage.number1Field.isVisible();
        await calculatorPage.number2Field.isVisible();
        await calculatorPage.addUpButton.isVisible();
        await calculatorPage.resultField.isVisible();
        expect(await calculatorPage.title.textContent()).toEqual('Calculator');
    });

    test('SHOULD - elements have values and text', async ({ page }) => {
        // ARRANGE
        await arrange(page);

        // ACT
        await calculatorPage.openPage();

        // ASSERT 
        expect(await calculatorPage.number1Field.inputValue()).toEqual('number 1 here');
        expect(await calculatorPage.number2Field.inputValue()).toEqual('number 2 here');
        expect(await calculatorPage.addUpButton.inputValue()).toEqual('Add up!');
        expect(await calculatorPage.resultField.textContent()).toEqual('Result:');
    })
})
