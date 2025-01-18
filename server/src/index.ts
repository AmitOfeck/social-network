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
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig';


const envPath = path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV || 'local'}`);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 4000;


console.log('Loaded environment:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


if (process.env.NODE_ENV !== 'test') {
mongoose
  .connect(process.env.MONGODB_URI as string) 
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
}

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/google-client-id', (req, res) => {
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID });
});

app.get('/api/openai-api-key', (req: Request, res: Response) => {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (openaiApiKey) {
    res.json({ apiKey: openaiApiKey });
  } else {
    res.status(500).json({ error: 'OpenAI API key not found in environment variables.' });
  }
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;

