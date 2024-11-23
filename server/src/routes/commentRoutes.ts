import express from 'express';
import { createComment } from '../controllers/commentController';

const router = express.Router();

router.post('/:postId', (req, res) => {
    const { postId } = req.params;
    const { content, authorId } = req.body;
  
    createComment(postId, content, authorId)
      .then((comment) => {
        return res.status(201).json(comment);  
      })
      .catch(() => {
        return res.status(500).json({ error: 'Failed to create comment' });
      });
  });

export default router;
