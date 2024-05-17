import { Router } from 'express';
import { login, newUser } from '../controllers/user.controller';

const router = Router();

router.post('/login', login);
router.post('/register', newUser);

export default router;
