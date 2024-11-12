import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

router.post('/register', async (req, res) => {
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
