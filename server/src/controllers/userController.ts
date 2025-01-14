import { Request, Response } from 'express';
import { registerUserService, loginUserService , getUserByIdService , updateUserService } from '../services/userServices';


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const imagePath = req.file ? req.file.path : null; 

    const result = await registerUserService(email, password, name, imagePath);
    if (result.error) {
       return res.status(400).json({ error: result.error });  
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
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
      userId : result.userId
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUser = (userId: string): Promise<any> => {
  return getUserByIdService(userId)
    .then((user) => {
      return user; 
    })
    .catch((error) => {
      throw new Error('Error fetching user');
    });
};


export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const { name } = req.body;
  const file = req.file;

  try {
    const updatedUser = await updateUserService(userId, name, file);

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
