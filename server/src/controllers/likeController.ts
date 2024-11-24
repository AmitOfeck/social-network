import { Request, Response } from 'express';
import { addLike } from '../services/likeService';

export const createLike = async (postId: string, authorId: string): Promise<any> => {
    return await addLike(postId, authorId)
      .then((like) => {
        return like; 
      })
      .catch((error) => {
        throw new Error(error.message || 'Error creating like');
      });
  };
