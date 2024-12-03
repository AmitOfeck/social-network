import jwt from 'jsonwebtoken';

export const generateNewAccessToken = async (userId: string): Promise<string> => {
  try {
    const accessToken = jwt.sign({ userId }, 'your-secret-key', { expiresIn: '3h' }); 
    return accessToken;
  } catch (error) {
    throw new Error('Error generating access token');
  }
};
