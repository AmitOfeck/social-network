import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';
import bodyParser from 'body-parser';
import * as path from 'path';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swaggerConfig';
import fs from 'fs';
import http from 'http';
import https from 'https';

const envPath = path.resolve(__dirname, `../config/.env.${process.env.NODE_ENV || 'local'}`);
dotenv.config({ path: envPath });

const app = express();
const PORT = process.env.PORT || 4000;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

console.log('Loaded environment:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('HTTPS_PORT:', process.env.HTTPS_PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const allowedOrigins = [
  process.env.DOMAIN_BASE,
  `${process.env.DOMAIN_BASE}:3000`,
  `${process.env.DOMAIN_BASE}:4000`,
  `${process.env.DOMAIN_BASE}/api-docs`,
  'http://localhost:3000',
  'http://localhost:4000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4000',
  'https://accounts.google.com',
  'https://www.googleapis.com',
  'https://node04.cs.colman.ac.il',
  'https://node04.cs.colman.ac.il:3000',
  'https://node04.cs.colman.ac.il:4000',
  'https://node04.cs.colman.ac.il/api-docs',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB:', err);
    });
}

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api/google-client-id', (req, res) => {
  res.json({ clientId: process.env.GOOGLE_CLIENT_ID });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// יצירת שרת HTTP בפיתוח
if (process.env.NODE_ENV !== 'production') {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
  });
} else {
  // יצירת שרת HTTPS בפרודקשן
  const httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/node04.cs.colman.ac.il/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/node04.cs.colman.ac.il/fullchain.pem')
  };

  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`🚀 HTTPS Server running on https://node04.cs.colman.ac.il`);
  });
}

export default app;