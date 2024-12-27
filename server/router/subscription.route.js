import express from 'express';
const router = express.Router();

import { add } from '../controller/subscription/add.subscription.js';
import { getSubscriptions } from '../controller/subscription/get.subscription.js';

router.post('/', add);
router.get('/', getSubscriptions);

export default router;
