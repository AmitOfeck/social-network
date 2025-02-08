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

router.post('/api/gemini-fact', async (req, res) => {

    const topics = [ "sport", "science", "geography", "animals", "history", "technology", "space", "food", "art", "music"]; 
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const prompt = `Tell me a fun fact. about ${randomTopic}.`;
    //console.log(prompt)
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: { 
            temperature: 1.2,
            topP: 0.9,
            topK: 50,
            candidateCount: 3 
          }
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`Gemini API Error: ${JSON.stringify(data)}`);
      }
  
      const fact = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from API';
      
      res.json({ fact });
    } catch (error) {
      console.error('Error fetching fact from Gemini API:', error);
      res.status(500).json({ error: 'Error fetching fact from Gemini API' });
    }
  });




export default router;
