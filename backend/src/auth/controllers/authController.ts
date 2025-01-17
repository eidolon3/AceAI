import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { UserSignupRequest, UserLoginRequest } from '../types';

const authService = new AuthService();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const request: UserSignupRequest = req.body;
      const response = await authService.signup(request);
      res.status(201).json(response);
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Failed to signup' 
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const request: UserLoginRequest = req.body;
      const response = await authService.login(request);
      res.json(response);
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ 
        error: error instanceof Error ? error.message : 'Invalid credentials' 
      });
    }
  }
}
