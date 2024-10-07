import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import { tokenValid } from '../controllers/homeController';

const Homerouter = Router();

Homerouter.get('/', authenticateToken, tokenValid);

export default Homerouter;