import { Page, test, expect } from '@playwright/test';
import { CalculatorPage } from '../playwright/pages/calculator.page.po';
import { HttpRequestHelper } from '../playwright/helpers/http-request.helper';
import { Mock } from '../playwright/helpers/mock.helper';
import { MockEndpoint } from '../playwright/enums/mock.enum';
import { result } from '../playwright/testdata/result';
import { HttpResponseHelper } from '../playwright/helpers/http-response.helper';
import { ResultBody } from '../playwright/models/model';

test.describe('Calculator page', () => {
    let calculatorPage: CalculatorPage;

    async function arrange(page: Page) {
        calculatorPage = new CalculatorPage(page);
    }

    test('SHOULD - not a number error messages', async ({ page }) => {
        const addUpRequestHelper = new HttpRequestHelper(page, MockEndpoint.addUp);
        const addUpMock = new Mock(page, MockEndpoint.addUp, result, 200);

        // ARRANGE
        await arrange(page);

        // ACT
        // Given the calculator window is open;
        await calculatorPage.openPage();
        // When the user enters "5 2" in the first number field;
        await calculatorPage.number1Field.type('12 40');
        // And the user enters "one" in the second number field;
        await calculatorPage.number2Field.type('one');
        // And the user clicks the "Add up!" button;
        await calculatorPage.addUpButton.click();

        // ASSERT
        // Then the invalid error message is shown for number field 1
        expect(await calculatorPage.number1FieldError.isVisible()).toEqual(true);
        // And the invalid error message is shown for number field 2
        expect(await calculatorPage.number2FieldError.isVisible()).toEqual(true);

        // ACT
        await addUpMock.mockResponse();
        // When the user enters "52" in the first number field;
        await calculatorPage.number1Field.fill('1');
        // And the user enters "1" in the second number field;
        await calculatorPage.number2Field.fill('4');
        // And the user clicks the "Add up!" button;
        const [requestIsMade] = await Promise.all([
            addUpRequestHelper.httpRequestIsMade(),
            calculatorPage.addUpButton.click()
        ]);

        // ASSERT
        // Then a request is made to the "/add-up" endpoint;
        expect(requestIsMade).toEqual(true);
        // Then the result is displayed in the Result element;
        expect(Number(await calculatorPage.resultField.textContent())).toEqual(result.result);
        // And the errors messages are no longer displayed;
        expect(await calculatorPage.number1FieldError.isVisible()).toEqual(false);
        expect(await calculatorPage.number2FieldError.isVisible()).toEqual(false);
    });

    test('SHOULD - something went wrong error', async ({ page }) => {
        const addUpResponseHelper = new HttpResponseHelper<ResultBody>(page, MockEndpoint.addUp);
        const addUpMock = new Mock(page, MockEndpoint.addUp, {}, 500);

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
        // When the API responds with anything else than a 200 success status;
        await addUpMock.mockResponse();
        const [response] = await Promise.all([
            addUpResponseHelper.catchHttpResponse(),
            calculatorPage.addUpButton.click()
        ])
        expect(response.status()).toEqual(500);
        // Then the error and try again message is displayed;
        expect(await calculatorPage.somethingWentWrongError.isVisible()).toEqual(true);
    });
});