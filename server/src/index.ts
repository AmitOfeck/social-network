import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';
import bodyParser from 'body-parser';
import * as path from'path';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve(__dirname, '../config/.env') });


const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


mongoose
  .connect(process.env.MONGODB_URI as string) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.use(cors());
app.use(express.json());


app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const suffix = filename.split('/').pop() 
  const filePath = path.join(__dirname, 'uploads', suffix!);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Image not found');
    }
  });
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
