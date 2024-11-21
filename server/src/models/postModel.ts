// src/models/postModel.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  authorId: mongoose.Schema.Types.ObjectId;
  content: string;
  date: Date;
  likesCount: number;
  commentCount: number;
  photoUrl?: string; 
}

const postSchema: Schema = new Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    content: { type: String, required: true, },
    date: { type: Date, default: Date.now, },
    likesCount: { type: Number, default: 0, },
    commentCount: { type: Number, default: 0, },
    photoUrl: { type: String, default: '', },
  },
  {
    timestamps: true, 
  }
);

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
