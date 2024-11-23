import { Request, Response } from 'express';
import { createCommentService } from '../services/commentService';

export const createComment = async (postId: string, content: string, authorId: string): Promise<any> => {
    return await createCommentService(postId, content, authorId)
      .then((comment) => {
        return comment;  
      })
      .catch((error) => {
        throw new Error('Error creating comment');
      });
  };
