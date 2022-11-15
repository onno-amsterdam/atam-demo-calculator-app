import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { router } from "./router";

export const app = express();

// To allows for making request from outside
app.use(cors());
app.options("*", cors);

// To allow for handling json in request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
