import { Request, Response } from 'express';
import { createCommentService , getCommentsByPostIdService } from '../services/commentService';

export const createComment = async (postId: string, content: string, authorId: string): Promise<any> => {
    return await createCommentService(postId, content, authorId)
      .then((comment) => {
        return comment;  
      })
      .catch((error) => {
        throw new Error('Error creating comment');
      });
  };


  export const getCommentsByPostId = (postId: string): Promise<any[]> => {
    return getCommentsByPostIdService(postId)
      .then((comments) => {
        return comments;
      })
      .catch((error) => {
        throw new Error('Failed to retrieve comments');
      });
  };
