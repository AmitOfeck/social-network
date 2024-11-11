import express from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const router = express.Router();

// נתיב להרשמה
router.post('/register', async (req, res) => {
    try {
      await registerUser(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


// נתיב להתחברות
router.post('/login', (req, res) => {
    loginUser(req, res)
      .then(() => {
        // תוכל להוסיף כאן את הטיפול במקרה של הצלחה
        res.status(200).json({ message: 'Login successful' });
      })
      .catch((error) => {
        // טיפול בשגיאה במקרה של חיבור לא נכון או כל שגיאה אחרת
        res.status(400).json({ error: 'Invalid credentials' });
      });
  });


// אם יש צורך בנתיב שמצריך אימות, נוכל להוסיף את המידלוואר verifyToken
// לדוגמה:
// router.get('/profile', verifyToken, getUserProfile);

export default router;
