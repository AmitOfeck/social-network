import express from 'express';
import { createLike , deleteLike , isLike } from '../controllers/likeController';
import { extractUserIdFromToken } from '../utils/extractUserIdFromToken';
import verifyToken from '../utils/verifyToken'; 

const router = express.Router();

router.post('/:postId', verifyToken , (req, res) => {
    const { postId } = req.params;
    //const { authorId } = req.body;
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ error: 'Access denied' });
      return; 
    }
    const authorId = extractUserIdFromToken(token);
  
    createLike(postId, authorId)
      .then((like) => {
        return res.status(201).json({ message: 'Like added successfully.', like });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  });


router.delete('/:postId', verifyToken , (req, res) => {
    const { postId } = req.params;
    //const { authorId } = req.body;
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({ error: 'Access denied' });
      return; 
    }
    const authorId = extractUserIdFromToken(token);

  
    deleteLike(postId, authorId)
      .then(() => {
        return res.status(200).json({ message: 'Like removed successfully.' });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  });


  router.post('/:postId/isLike', verifyToken, (req, res) => {
    const { postId } = req.params; 
    const { authorId } = req.body;  
  
    isLike(postId, authorId, res); 
  });
  
export default router;
