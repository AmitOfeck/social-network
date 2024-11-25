import { Request , Response } from 'express';
import Post from '../models/postModel';
import { saveFileToFolder } from '../utils/saveFile'; 
import path from 'path';

/**
 * @param req 
 * @param res 
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
    const { authorId, content } = req.body;
    
    const newPost = new Post({
      authorId,
      content,
      date: new Date(),
      likesCount: 0,
      commentCount: 0,
      photoUrl: '',
    });
  
    try {
      await newPost.save();  
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });  
      return;  
    }
  
    let photoUrl = '';
    
    if (req.file) {
      const destinationFolder = path.join(__dirname, '../uploads');
      const fileName = `${newPost._id}-${req.file.originalname}`;
  
      try {
        photoUrl = saveFileToFolder(req.file.buffer, fileName, destinationFolder);
        newPost.photoUrl = photoUrl; 
      } catch (error) {
        res.status(500).json({ message: 'Error saving photo', error });  
        return;  
      }
    }
  
    try {
      await newPost.save(); 
      res.status(201).json({ message: 'Post created successfully', post: newPost });  
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });  
    }
  };


  export const getAllPostsService = async () => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }); 
      return posts;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  };


  export const getPostByIdService = async (id: string): Promise<any> => {
    try {
        const post = await Post.findById(id); 
        return post; 
    } catch (error) {
        throw new Error('Failed to fetch post');  
    }
};


export const getPostsByAuthorIdService = async (authorId: string): Promise<any[]> => {
  try {
      const posts = await Post.find({ authorId }).sort({ date: -1 });  
      return posts;  
  } catch (error) {
      throw new Error('Failed to fetch posts');
  }
};
  
  
