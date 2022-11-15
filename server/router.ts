import express from 'express';
import { addUpNumbers } from './controller';

const router = express.Router();

router.post('/add-up', addUpNumbers);

export { router };