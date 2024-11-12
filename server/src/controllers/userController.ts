import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/userServices';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, image, googleId } = req.body;

    const result = await registerUserService(email, password, name, image, googleId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: result.user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await loginUserService(email, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(200).json({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
