import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import User from '../models/userModel';
import { saveFileToFolder } from '../utils/saveFile'; 
import { deleteFileFromFolder } from '../utils/deleteFile';
import dotenv from 'dotenv';

dotenv.config();


export const registerUserService = async (
    email: string,
    password: string,
    name: string,
    imagePath: string | null 
  ) => {
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return { error: 'Email already exists' };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        image: imagePath, 
      });
  
      const savedUser = await newUser.save();
      return { user: savedUser };
    } catch (error) {
      throw new Error('Error registering user');
    }
  };


export const loginUserService = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    if (user.password && password) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { error: 'Invalid credentials' };
      }
    }

    const userId = user._id;
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '7h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY as string, { expiresIn: '180d' });

    return { accessToken, refreshToken , userId };
  } catch (error) {
    throw new Error('Server error');
  }
};


export const getUserByIdService = (userId: string): Promise<any> => {
  return User.findById(userId)  
    .then((user) => {
      return user;  
    })
    .catch((error) => {
      throw new Error('Error fetching user');
    });
};


export const updateUserService = async (userId: string, name?: string, file?: Express.Multer.File): Promise<any> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (name) {
    user.name = name;
  }

  if (file) {
    const destinationFolder = path.join(__dirname, '../uploads');
    const fileName = `${user._id}-${file.originalname}`;

    if (user.image) {
      deleteFileFromFolder(user.image, destinationFolder);
    }

    try {
      const imagePath = saveFileToFolder(file.buffer, fileName, destinationFolder);
      user.image = imagePath;
    } catch (error) {
      throw new Error('Failed to save image');
    }
  }

  try {
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};
