import { Router } from 'express';
import { authenticateAccessToken } from '../middlewares/authenticateToken';
import { tokenValid } from '../controllers/homeController';

const Homerouter = Router();

Homerouter.get('/', authenticateAccessToken, tokenValid);

export default Homerouter;