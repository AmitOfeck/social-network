import { Request, Response } from 'express';
import { createPost } from '../services/postServices';
import hasAllFields from '../utils/hasAllFields'; 

export const createPostController = async (req: Request, res: Response): Promise<void> => {
    const requiredFields = ['authorId', 'content']; 
  if (!hasAllFields(req, res, requiredFields)) {
    return; 
  }
  await createPost(req, res);
};