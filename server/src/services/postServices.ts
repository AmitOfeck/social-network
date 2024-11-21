import { Request , Response } from 'express';
import Post from '../models/postModel';
import { saveFileToFolder } from '../utils/saveFile'; 
import path from 'path';

/**
 * פונקציה שמבצעת יצירת פוסט
 * @param req - אובייקט בקשה
 * @param res - אובייקט תגובה
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
      try {
        const destinationFolder = path.join(__dirname, '../uploads/postsPictures');
        const fileName = `${newPost._id}-${req.file.originalname}`; 
  
        photoUrl = saveFileToFolder(req.file.buffer, fileName, destinationFolder);
  
        newPost.photoUrl = photoUrl;
        await newPost.save();  
      } catch (error) {
        res.status(500).json({ message: 'Error saving photo', error });
        return;
      }
    }
  
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  };
