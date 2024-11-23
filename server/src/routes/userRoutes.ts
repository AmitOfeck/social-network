import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
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



export default router;
