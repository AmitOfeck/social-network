import { Request , Response } from 'express';
import Post from '../models/postModel';
import Comment from '../models/commentModel';
import Like from '../models/likeModel';
import { saveFileToFolder } from '../utils/saveFile'; 
import path from 'path';
import fs from 'fs';
import { deleteFileFromFolder } from '../utils/deleteFile';


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

  export const updatePostService = async (postId: string, content: string, file?: Express.Multer.File): Promise<any> => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    if (content) {
        post.content = content;
    }

    if (file) {
        const destinationFolder = path.join(__dirname, '../uploads');
        const fileName = `${post._id}-${file.originalname}`;

        if (post.photoUrl) {
            deleteFileFromFolder(post.photoUrl, destinationFolder);
        }

        try {
            const photoUrl = saveFileToFolder(file.buffer, fileName, destinationFolder);
            post.photoUrl = photoUrl;
        } catch (error) {
            throw new Error('Failed to save photo');
        }
    }

    try {
        const updatedPost = await post.save();
        return updatedPost;
    } catch (error) {
        throw new Error('Failed to update post');
    }
};




export const getAllPostsService = async (skip: number, limit: number) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentSkip: skip,
      currentLimit: limit,
    };
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


export const getPostsByAuthorIdService = async (authorId: string, skip: number, limit: number): Promise<any> => {
  try {
    const posts = await Post.find({ authorId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments({ authorId });

    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit), 
      currentSkip: skip,
      currentLimit: limit,
    };
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
};

export const isPostAuthor = async (postId: string, userId: string): Promise<boolean> => {
  const post = await Post.findById(postId);
  if (!post) {
      throw new Error('Post not found');
  }
  return post.authorId.toString() === userId;
};


export const deletePostService = async (postId: string): Promise<void> => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  await Comment.deleteMany({ postId });
  await Like.deleteMany({ postId });

  if (post.photoUrl) {
    const destinationFolder = path.join(__dirname, '../uploads');
    deleteFileFromFolder(post.photoUrl, destinationFolder);
  }

  const result = await Post.findByIdAndDelete(postId);

  if (!result) {
    throw new Error('Failed to delete post');
  }
};
  



  
