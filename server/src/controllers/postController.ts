import { Request, Response } from 'express';
import { createPost } from '../services/postServices';

export const createPostController = async (req: Request, res: Response): Promise<void> => {
  await createPost(req, res);
};