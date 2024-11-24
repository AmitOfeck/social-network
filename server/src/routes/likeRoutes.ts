import express from 'express';
import { createLike } from '../controllers/likeController';

const router = express.Router();

router.post('/:postId', (req, res) => {
    const { postId } = req.params;
    const { authorId } = req.body;
  
    createLike(postId, authorId)
      .then((like) => {
        return res.status(201).json({ message: 'Like added successfully.', like });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  });
  
export default router;
