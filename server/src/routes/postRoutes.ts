import express from 'express';
import multer from 'multer';
import { createPostController } from '../controllers/postController';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('photo'), createPostController);

export default router;
