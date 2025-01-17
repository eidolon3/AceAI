import express from 'express';
import { YouTubeService } from '../services/youtubeService';
import { authenticateToken } from '../../auth/middleware/auth';

const router = express.Router();
const youtubeService = new YouTubeService();

router.post('/transcript', authenticateToken, async (req, res) => {
  try {
    const { url } = req.body;
    const transcript = await youtubeService.getTranscript(url);
    res.json(transcript);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 