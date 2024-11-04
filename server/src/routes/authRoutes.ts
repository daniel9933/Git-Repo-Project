import { Router } from 'express';
import { signIn } from '../controllers/authController';
import { authenticateAccessToken } from '../middlewares/authenticateToken';
import { tokenValid } from '../controllers/homeController';

const AuthRouter = Router();

AuthRouter.post('/sign-in', signIn);
AuthRouter.get('/sign-in', authenticateAccessToken, tokenValid ) // this checks on the first render if a token is existing and valid already.

export default AuthRouter;