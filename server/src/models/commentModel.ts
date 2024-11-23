import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  authorId: mongoose.Types.ObjectId;
  content: string;
  date: Date;
  postId: mongoose.Types.ObjectId;
}

const commentSchema: Schema = new Schema(
  {
    authorId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post', 
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
