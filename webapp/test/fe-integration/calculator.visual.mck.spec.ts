import { test } from '@playwright/test';
import { CalculatorPage } from '../playwright/pages/calculator.page.po';

test.describe('CALCULATOR APP - VISUAL TEST', () => {
    test('SHOULD - look as expected WHEN app is opened', async ({ page }) => {
        // ARRANGE
        const calculator = new CalculatorPage(page);

        // ACT 
        await calculator.openPage();
        await calculator.assertIfOpened();

        // ASSERT
        await calculator.assertIfPageDisplayedProperly();
    })
});