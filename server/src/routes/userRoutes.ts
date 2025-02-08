import express, { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser , getUser , updateUserController , deleteUserController } from '../controllers/userController';
import { authorizeUser } from '../middleware/authorizeUser';
import verifyToken from '../utils/verifyToken'; 
import { verifyRefreshToken } from '../utils/verifyToken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { saveFileToFolder } from '../utils/saveFile'; 
import { generateNewAccessToken } from '../utils/generateNewAccessToken';
import User from '../models/userModel';
import { OAuth2Client } from 'google-auth-library';
import { getTokensForUser } from '../utils/getTokensForUser';


const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/register', upload.single('image'), async (req, res) => { 
  try {

    const { email } = req.body;
    const userExists = await User.findOne({ email });

    if (req.file && !userExists) {
      const destinationFolder = path.join(__dirname, '../uploads');
      const sanitizedEmail = req.body.email.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${sanitizedEmail}-${req.file.originalname}`;

      req.file.path = saveFileToFolder(req.file.buffer, fileName, destinationFolder);
    }

    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
      await loginUser(req, res); 
  } catch (error) {
      res.status(400).json({ error: 'Invalid credentials' });
  }
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  getUser(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'Server error' });
    });
});

router.put('/:id', verifyToken, authorizeUser, upload.single('image'), updateUserController);

router.post('/refresh-token/:userId', verifyRefreshToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization');
    if (!token) {
       res.status(401).json({ error: 'No refresh token provided' });
    }

    const { userId } = req.params;
    const newAccessToken = await generateNewAccessToken(userId);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error); 
  }
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req: Request, res: Response, next: Function) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const googleId = payload?.sub; 
    let user = await User.findOne({ email });

    if (!user) {
     
      user = await User.create({
        email,
        name: payload?.name || '', 
        image: payload?.picture || '', 
        googleId, 
        password: 'google-signin', 
      });
    }

    const tokens = await getTokensForUser(user);
    res.status(200).send(tokens);
  } catch (err) {
    next(err); 
  }
});

router.delete('/:id', verifyToken, authorizeUser, deleteUserController);





export default router;
