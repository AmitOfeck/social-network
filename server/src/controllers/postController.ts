import { Request, Response } from 'express';
import { createPost } from '../services/postServices';
import hasAllFields from '../utils/hasAllFields'; 
import { getAllPostsService } from '../services/postServices'; 

export const createPostController = async (req: Request, res: Response): Promise<void> => {
    const requiredFields = ['authorId', 'content'];
    
    if (!hasAllFields(req, res, requiredFields)) {
      return;  
    }
  
    try {
      await createPost(req, res); 
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  };


  export const getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await getAllPostsService();
      res.status(200).json(posts); 
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Failed to fetch posts' });
    }
  };
  