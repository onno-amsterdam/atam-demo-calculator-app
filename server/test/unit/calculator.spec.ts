import { addUp } from "../../calculator"

describe('calculator', () => {
    // When the two numbers are added up
    it('SHOULD - return a number', async () => {
        // ACT
        const result = await addUp(5, 5);

        // ASSERT 
        expect(result).toEqual(10);
    });
});