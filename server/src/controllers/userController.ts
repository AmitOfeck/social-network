import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// פונקציה להרשמה
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, image, googleId } = req.body;

    // בודק אם כבר יש משתמש עם האימייל הזה
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // יצירת סיסמא מוצפנת
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      image,
      googleId, // אם יש googleId (אם מדובר בהרשמה דרך גוגל)
    });

    // שמירה למסד נתונים
    const savedUser = await newUser.save();

    // יצירת JWT (אחרת לא נדרש, אבל אפשר אם צריך לשלוח לאדם את ה-token)
    const accessToken = jwt.sign({ userId: savedUser._id }, 'your-secret-key', {
      expiresIn: '5h',
    });

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      user: savedUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};



// פונקציה להתחברות
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    // וודא שהאימייל והסיסמה קיימים בבקשה
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // חפש את המשתמש במערכת לפי האימייל
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // השוואת הסיסמה (יש לוודא שהסיסמה קיימת)
      if (user.password && password) {
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).json({ error: 'Invalid credentials' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // יצירת JWT עבור המשתמש המחובר
      const accessToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '7h' });
      const refreshToken = jwt.sign({ userId: user._id }, 'your-refresh-secret-key', { expiresIn: '7d' });

  
      // שלח את ה-token בתשובה
      res.status(200).json({ accessToken , refreshToken });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
