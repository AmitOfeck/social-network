import { Request, Response } from 'express';
import { createPost } from '../services/postServices';
import hasAllFields from '../utils/hasAllFields'; 
import { getAllPostsService , getPostByIdService , getPostsByAuthorIdService } from '../services/postServices'; 

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
          if (!posts || posts.length === 0) {
              return res.status(404).json({ message: 'No posts found for this author' });
          }
          return res.status(200).json(posts); 
      })
      .catch(() => {
          return res.status(500).json({ message: 'Failed to fetch posts' });
      });
};

  