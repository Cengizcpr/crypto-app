import express from 'express';
const router = express.Router();

import { add } from '../controller/users/create.user.js';
import { login } from '../controller/users/login.user.js';
import { tokenControl } from '../controller/users/auth.token.js';
router.post('/', add);
router.post('/login', login);
router.get('/validate-token', tokenControl);

export default router;
