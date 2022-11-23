import { test, expect } from '@playwright/test';
import { MockEndpoint } from '../playwright/enums/mock.enum';
import { HttpResponseHelper } from '../playwright/helpers/http-response.helper';
import { CalculatorPage } from '../playwright/pages/calculator.page.po';

test.describe('CALCULATOR APP', () => {
    test('SHOULD - be able to add up to numbers', async ({ page }) => {
        // ARANGE
        const calculatorPage = new CalculatorPage(page);
        const httpResponse = new HttpResponseHelper(page, MockEndpoint.addUp);

        // ACT
        await calculatorPage.openPage();
        await calculatorPage.assertIfOpened();
        await calculatorPage.number1Field.type('4');
        await calculatorPage.number2Field.type('4');
        const [response] = await Promise.all([
            httpResponse.catchHttpResponse(),
            calculatorPage.addUpButton.click()
        ]);

        // ASSERT
        expect(response).not.toEqual(null);
        expect(Number(await calculatorPage.resultField.textContent())).toEqual(8);
    });
})