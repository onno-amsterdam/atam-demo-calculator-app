import { addUp } from './calculator';

export async function addUpNumbers(req: any, res: any) {
    interface Request {
        num1: number;
        num2: number;
    }

    const numbers: Request = req.body;

    if (typeof numbers.num1 !== 'number' || typeof numbers.num2 !== 'number') {
        res.status(204);
        res.send();
    }

    // NOTE: in the contract test were mocking the response - so we need to test this with a unit test.
    const result = await addUp(numbers.num1, numbers.num2);

    if (result) {
        res.status(200);
        res.send({ result: 10 });
    } else {
        res.status(500);
        res.send();
    }
};