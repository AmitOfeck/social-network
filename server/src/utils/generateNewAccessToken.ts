import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateNewAccessToken = async (userId: string): Promise<string> => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, { expiresIn: '3h' }); 
    return accessToken;
  } catch (error) {
    throw new Error('Error generating access token');
  }
};
