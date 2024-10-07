import { Router } from 'express';
import { signIn } from '../controllers/authController';

const AuthRouter = Router();

AuthRouter.post('/sign-in', signIn);

export default AuthRouter;