import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const authorizeUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };
    const { id: userIdToUpdate } = req.params;

    if (decoded.userId !== userIdToUpdate) {
      res.status(403).json({ error: 'You are not authorized to update this user' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authorize user' });
  }
};
