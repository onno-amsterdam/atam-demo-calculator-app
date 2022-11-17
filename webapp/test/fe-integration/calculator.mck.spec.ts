import { Page, test, expect } from '@playwright/test';
import { CalculatorPage } from '../playwright/pages/calculator.page.po';
import { HttpRequestHelper } from '../playwright/helpers/http-request.helper';
import { HttpResponseHelper } from '../playwright/helpers/http-response.helper';
import { ResultBody } from '../playwright/models/model';
import { Mock } from '../playwright/helpers/mock.helper';
import { MockEndpoint } from '../playwright/enums/mock.enum';
import { result } from '../playwright/testdata/result';

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

    test('SHOULD - show values and text in elements', async ({ page }) => {
        // ARRANGE
        await arrange(page);

        // ACT
        await calculatorPage.openPage();

        // ASSERT
        // TODO: check if the place holder values can be tested 
        // expect(await calculatorPage.number1Field.inputValue()).toEqual('number 1 here');
        // expect(await calculatorPage.number2Field.inputValue()).toEqual('number 2 here');
        expect(await calculatorPage.addUpButton.inputValue()).toEqual('Add up!');
        expect(await calculatorPage.resultField.textContent()).toEqual('Result:');
    })

    test('SHOULD - calculate numbers and show result', async ({ page }) => {
        const addUpRequestHelper = new HttpRequestHelper(page, MockEndpoint.addUp);
        const addUpResponseHelper = new HttpResponseHelper<ResultBody>(page, MockEndpoint.addUp);
        const addUpMock = new Mock(page, MockEndpoint.addUp, result, 200);

        // ARRANGE
        await arrange(page);

        // ACT
        // Given the calculator window is open;
        await calculatorPage.openPage();
        // When the user enters "5" in the first number field;
        await calculatorPage.number1Field.type('5');
        // And the user enters "5" in the second number field;
        await calculatorPage.number2Field.type('4');

        // ASSERT
        // And the user clicks the "Add up!" button;
        // Then a request is made to the "/add-up" endpoint;
        await addUpMock.mockResponse();
        const [requestIsMade, requestPostData, response] = await Promise.all([
            addUpRequestHelper.httpRequestIsMade(),
            addUpRequestHelper.catchHttpRequestPostData(),
            addUpResponseHelper.catchHttpResponse(),
            calculatorPage.addUpButton.click()
        ]);
        expect(requestIsMade).toEqual(true);
        // And the request body has both numbers;
        expect(JSON.parse(requestPostData)).toEqual({ num1: 5, num2: 4 });

        // When the API responds with a 200 and result value in body;
        expect(response.status()).toEqual(200);
        expect(JSON.parse((await response.body()).toString())).toEqual(result);
        // Then the result is displayed in the Result element;
        expect(Number(await calculatorPage.resultField.textContent())).toEqual(result.result);
    });
});
