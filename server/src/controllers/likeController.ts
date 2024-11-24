import { Request, Response } from 'express';
import { addLike , removeLike } from '../services/likeService';

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
