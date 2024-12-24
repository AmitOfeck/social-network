import jwt from 'jsonwebtoken';

export const getTokensForUser = (user: any) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '3h' });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY as string, { expiresIn: '180d' });

  return { accessToken, refreshToken, userId: user._id };
};
