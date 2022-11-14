import express from "express";
export const app = express();
import bodyParser from "body-parser";
import { addUp } from "./calculator";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/add-up", async function (req, res) {
  interface Request {
    num1: number;
    num2: number;
  }
  const numbers: Request = req.body;

  // NOTE: in the contract test were mocking the response - so we need to test this with a unit test.
  const result = await addUp(numbers.num1, numbers.num2);

  res.status(200);
  res.send({ result: result });
});
