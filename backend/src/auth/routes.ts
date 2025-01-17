<<<<<<< HEAD
import { Router } from 'express';
import { AuthService } from './services/authService';

const router = Router();
const authService = new AuthService();

router.post('/signup', async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'User already exists') {
      return res.status(409).json({ error: error.message });
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      return res.status(401).json({ error: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});
=======
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
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c

export default router;
