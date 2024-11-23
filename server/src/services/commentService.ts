import Comment from '../models/commentModel';
import Post from '../models/postModel';

export const createCommentService = async (postId: string, content: string, authorId: string): Promise<any> => {

    if (!postId || !content || !authorId) {
        throw new Error('Missing required fields: postId, content, or authorId');
    }

    const newComment = new Comment({
      postId,
      content,
      authorId,
      date: new Date(),
    });

    try {
        const savedComment = await newComment.save();

        await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

        return savedComment; 
    } catch (error) {
        throw new Error('Error creating comment and updating post');
    }
};



export const getCommentsByPostIdService = (postId: string): Promise<any[]> => {
    return Comment.find({ postId }).sort({ createdAt: -1 })
      .then((comments) => {
        return comments;
      })
      .catch((error) => {
        throw new Error('Error retrieving comments');
      });
  };
