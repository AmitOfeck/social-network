import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param req 
 * @param res 
 * @param next 
 */
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { _id: string };

    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return; 
    }

    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return; 
  }
};

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return; 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY as string) as { _id: string };

    if (!decoded) {
      res.status(401).json({ error: 'Invalid token' });
      return; 
    }

    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    return; 
  }
};

export default verifyToken;
