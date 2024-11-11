import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password?: string;  // אם זה לא יינתן, משתמשים ב-Single Sign-On
  name: string;
  image?: string;
  googleId?: string;  // שדה חדש עבור googleId
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    image: { type: String },
    googleId: { type: String },  // שדה עבור googleId
  },
  { timestamps: true }
);

// יצירת מודל של משתמש
const User = mongoose.model<IUser>('User', userSchema);

export default User;
