import express from 'express';
import { registerUser, loginUser , getUser , updateUserController} from '../controllers/userController';
import { authorizeUser } from '../middleware/authorizeUser';
import verifyToken from '../utils/verifyToken'; 
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { saveFileToFolder } from '../utils/saveFile'; 

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.post('/register', upload.single('image'), async (req, res) => { 
  try {

    if (req.file) {
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



export default router;
