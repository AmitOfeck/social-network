import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';


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
    const accessToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '7h' });
    const refreshToken = jwt.sign({ userId: user._id }, 'your-refresh-secret-key', { expiresIn: '180d' });

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
