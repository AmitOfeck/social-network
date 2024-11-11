import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';


const app = express();
const PORT = 4000;


mongoose
  .connect('mongodb://localhost:27017/social-network') 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
