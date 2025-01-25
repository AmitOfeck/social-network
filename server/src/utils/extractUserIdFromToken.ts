import jwt from 'jsonwebtoken';

/**
 * Extracts the user ID from a given token.
 * 
 * @param token - The JWT token.
 * @param secretKey - The secret key used to verify the token.
 * @returns The user ID if the token is valid.
 * @throws Error if the token is invalid or verification fails.
 */
export const extractUserIdFromToken = (token: string): string => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };
    if (!decoded || !decoded.userId) {
      throw new Error('Invalid token: User ID not found');
    }
    return decoded.userId;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Invalid token: ' + error.message);
    } else {
      throw new Error('Invalid token: An unknown error occurred');
    }
  }
};
