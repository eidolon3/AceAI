import { Router, RequestHandler } from 'express';
import { AuthController } from './controllers/authController';

const router = Router();
const authController = new AuthController();

const signup: RequestHandler = async (req, res) => {
  await authController.signup(req, res);
};

const login: RequestHandler = async (req, res) => {
  await authController.login(req, res);
};

router.post('/signup', signup);
router.post('/login', login);

export default router;
