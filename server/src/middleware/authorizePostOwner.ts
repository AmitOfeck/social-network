import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isPostAuthor } from '../services/postServices';
import { console } from 'inspector';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @param req 
 * @param res 
 * @param next 
 */
const authorizePostOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return; 
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };
        const userId = decoded.userId; 
        const { id: postId } = req.params; 

        const isAuthor = await isPostAuthor(postId, userId);
        console.log(isAuthor)

        if (!isAuthor) {
            res.status(403).json({ error: 'You are not authorized to access this post' });
            return; 
        }

        next(); 
    } catch (error) {
        if (error instanceof Error) {
            console.error('Authorization error:', error.message);
            res.status(500).json({ error: 'Failed to authorize user' });
            return; 
        }

        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
        return; 
    }
};

export default authorizePostOwner;
