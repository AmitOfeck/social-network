import express from 'express';
import multer from 'multer';
import { createPostController } from '../controllers/postController';
import { getAllPosts , getPostByIdController , getPostsByAuthorIdController , deletePostController , updatePostController } from '../controllers/postController';
import verifyToken from '../utils/verifyToken'; 
import authorizePostOwner from '../middleware/authorizePostOwner';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', verifyToken , upload.single('photo'), createPostController);
router.get('/', verifyToken , getAllPosts);
router.get('/:id', verifyToken, getPostByIdController);
router.get('/author/:authorId', verifyToken, getPostsByAuthorIdController);

router.delete('/:id', verifyToken, authorizePostOwner, deletePostController);
router.put('/:id', verifyToken, authorizePostOwner, upload.single('photo'), updatePostController);




export default router;
