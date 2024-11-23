import express from 'express';
import { createComment , getCommentsByPostId } from '../controllers/commentController';
import verifyToken from '../utils/verifyToken'; 


const router = express.Router();


router.get('/:postId', verifyToken, (req, res) => {
  const { postId } = req.params;

  getCommentsByPostId(postId)
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch(() => {
      return res.status(500).json({ error: 'Failed to retrieve comments' });
    });
});


router.post('/:postId', verifyToken , (req, res) => {
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
