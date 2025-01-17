import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

<<<<<<< HEAD
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-123';

=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
<<<<<<< HEAD
      };
=======
      }
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    }
  }
}

<<<<<<< HEAD
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
=======
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
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
  }
};
