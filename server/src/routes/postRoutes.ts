import express from 'express';
import multer from 'multer';
import { createPostController } from '../controllers/postController';
import { getAllPosts } from '../controllers/postController';
import verifyToken from '../utils/verifyToken'; 

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken , upload.single('photo'), createPostController);
router.get('/', verifyToken , getAllPosts);


export default router;
