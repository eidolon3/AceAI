import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      }
    }
  }
}

export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your-secret-key-123';
    
    try {
      const decoded = jwt.verify(token, secret) as { userId: string; email: string };
      req.user = decoded;
      next();
    } catch (jwtError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};
