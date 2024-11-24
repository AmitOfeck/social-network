import { Request, Response } from 'express';
import { addLike , removeLike , checkLikeStatus } from '../services/likeService';

export const createLike = async (postId: string, authorId: string): Promise<any> => {
    return await addLike(postId, authorId)
      .then((like) => {
        return like; 
      })
      .catch((error) => {
        throw new Error(error.message || 'Error creating like');
      });
  };


  export const deleteLike = async (postId: string, authorId: string): Promise<any> => {
    return await removeLike(postId, authorId)
      .then(() => {
        return { message: 'Like removed successfully' };
      })
      .catch((error) => {
        throw new Error(error.message || 'Error removing like');
      });
  };


  export const isLike = async (postId: string, authorId: string, res: Response) => {
    try {
      const isLiked = await checkLikeStatus(postId, authorId);  
      return res.status(200).json({ isLiked });  
    } catch (error: unknown) { 
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  };
