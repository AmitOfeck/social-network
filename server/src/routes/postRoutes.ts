import express from 'express';
import multer from 'multer';
import { createPostController } from '../controllers/postController';
import { getAllPosts , getPostByIdController , getPostsByAuthorIdController } from '../controllers/postController';
import verifyToken from '../utils/verifyToken'; 

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken , upload.single('photo'), createPostController);
router.get('/', verifyToken , getAllPosts);
router.get('/:id', verifyToken, getPostByIdController);
router.get('/author/:authorId', verifyToken, getPostsByAuthorIdController);


export default router;
