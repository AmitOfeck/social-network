import { Request, Response } from 'express';
import { createPost } from '../services/postServices';
import hasAllFields from '../utils/hasAllFields'; 
import { getAllPostsService , getPostByIdService , getPostsByAuthorIdService , deletePostService } from '../services/postServices'; 
import Post from '../models/postModel';

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


  export const getPostByIdController = (req: Request, res: Response): void => {
    const { id } = req.params; 
    getPostByIdService(id)  
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            return res.status(200).json(post);  
        })
        .catch(() => {
            return res.status(500).json({ message: 'Failed to fetch post' });
        });
};


export const getPostsByAuthorIdController = (req: Request, res: Response): void => {
  const { authorId } = req.params;  

  getPostsByAuthorIdService(authorId)  
      .then((posts) => {
          return res.status(200).json(posts);  
      })
      .catch(() => {
          return res.status(500).json({ message: 'Failed to fetch posts' });
      });
};


export const deletePostController = async (req: Request, res: Response): Promise<void> => {
  const { id: postId } = req.params; 

  try {
      await deletePostService(postId); 
      res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
      if (error instanceof Error) { 
          if (error.message === 'Post not found' || error.message === 'Failed to delete post or post not found') {
              res.status(404).json({ error: error.message });
              return;
          }
      }
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Failed to delete post', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

  