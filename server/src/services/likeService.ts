import Like from '../models/likeModel';
import Post from '../models/postModel';

export const addLike = async (postId: string, authorId: string) => {

    const existingLike = await Like.findOne({ postId, authorId });
    if (existingLike) {
      throw new Error('User has already liked this post.');
    }
  
    const newLike = await Like.create({ postId, authorId });
  
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likesCount: 1 } },
      { new: true } 
    );
  
    if (!updatedPost) {
      throw new Error('Post not found.');
    }
  
    return newLike;
  };


  export const removeLike = async (postId: string, authorId: string) => {
    const existingLike = await Like.findOneAndDelete({ postId, authorId });
    if (!existingLike) {
      throw new Error('Like not found for this user and post.');
    }
  
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likesCount: -1 } },
      { new: true }
    );
  
    if (!updatedPost) {
      throw new Error('Post not found.');
    }
  
    return;
  };


  export const checkLikeStatus = async (postId: string, authorId: string) => {
    const existingLike = await Like.findOne({ postId, authorId });  
    return existingLike !== null;  
  };
  
  
