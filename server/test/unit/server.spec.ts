import sinon from "sinon";

import { addUpNumbers } from "../../controller";
import * as calculator from '../../calculator';

describe('addUpNumbers controller', () => {
    // Then the result is returned in the response
    it('SHOULD - respond with 200 and a result', async () => {
        // ARANGE
        const request = { body: { num1: 8, num2: 2 } };
        const expectedResponse = { result: 10 };

        // setup the mock
        const addUpStub = sinon
            .stub(calculator, 'addUp')
            .resolves(10);

        // setup the spies
        const response = { send: sinon.spy(), status: sinon.spy() };

        // ACT 
        await addUpNumbers(request, response);

        // ASSERT
        expect(addUpStub.calledOnce).toEqual(true);
        expect(response.status.calledWithMatch(200)).toEqual(true);
        expect(response.send.calledOnceWith(expectedResponse)).toEqual(true);

        // CLEAN UP
        addUpStub.restore();
    });

    // When the server fails to add up the two numbers;
    // Then a 500 internal server error response is returned
    it('SHOULD - respond with 500 when calculation goes wrong', async () => {
        // ARANGE
        const request = { body: { num1: 8, num2: 2 } };

        // setup the mock
        const addUpStub = sinon
            .stub(calculator, 'addUp')
            .resolves(false);

        // setup the spies
        const response = { send: sinon.spy(), status: sinon.spy() };

        // ACT 
        await addUpNumbers(request, response);

        // ASSERT
        expect(addUpStub.calledOnce).toEqual(true);
        expect(response.status.calledWithMatch(500)).toEqual(true);

        // CLEAN UP
        addUpStub.restore();
    });

    // And one of the numbers is not a number;
    // Then a 204 bad request error response is returned;
    it('SHOULD - respond with 204 when one of the numbers is not a number', async () => {
        // ARANGE
        const request = { body: { num1: 8, num2: '9' } };

        // setup the mock
        const addUpStub = sinon
            .stub(calculator, 'addUp')
            .resolves(false);

        // setup the spies
        const response = { send: sinon.spy(), status: sinon.spy() };

        // ACT 
        await addUpNumbers(request, response);

        // ASSERT
        expect(addUpStub.calledOnce).toEqual(true);
        expect(response.status.calledWithMatch(204)).toEqual(true);

        // CLEAN UP
        addUpStub.restore();
    });
});
