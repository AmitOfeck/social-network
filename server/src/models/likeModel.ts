import mongoose, { Schema, Document } from 'mongoose';

interface ILike extends Document {
  authorId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  date: Date;
}

const likeSchema = new Schema<ILike>({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  date: { type: Date, default: Date.now },
});

const Like = mongoose.model<ILike>('Like', likeSchema);

export default Like;
