import { Router } from 'express';
import { reasignAccessToken, signIn } from '../controllers/authController';
import { authenticateToken } from '../middlewares/authenticateToken';
import { tokenValid } from '../controllers/homeController';

const AuthRouter = Router();

AuthRouter.post('/sign-in', signIn);
AuthRouter.get('/sign-in', authenticateToken, tokenValid ) // this checks on the first render if a token is existing and valid already.
AuthRouter.post('/refresh', authenticateToken , reasignAccessToken)

export default AuthRouter;