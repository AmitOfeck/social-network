import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const sanitizedEmail = req.body.email.replace(/[^a-zA-Z0-9]/g, '_'); 
    const newFilename = `${sanitizedEmail}-${file.originalname}`; 
    cb(null, newFilename);  
    //cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); 

router.post('/register', upload.single('image'), async (req, res) => { 
  try {
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
