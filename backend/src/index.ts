<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/routes';
import noteRoutes from './notes/routes';
import youtubeRoutes from './youtube/routes';
import { seedDatabase } from './config/seed';

// Load environment variables
dotenv.config();

=======
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import summaryRoutes from './summaries/routes';
import noteRoutes from './notes/routes';
import flashcardRoutes from './flashcards/routes';
import quizRoutes from './quizzes/routes';
import authRoutes from './auth/routes';
import youtubeRoutes from './youtube/routes';

// Load environment variables FIRST
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Seed the database
seedDatabase().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/youtube', youtubeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
=======
// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to AceAI API',
    endpoints: {
      health: '/health',
      summaries: {
        pdf: '/api/summaries/pdf',
        youtube: '/api/summaries/youtube',
        audio: '/api/summaries/audio'
      }
    }
  });
});

// Routes
app.use('/api/youtube', youtubeRoutes);
app.use('/api/summaries', summaryRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/auth', authRoutes);

// Basic health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
declare namespace Express {
  export interface Request {
    user?: {
      userId: string;
      email: string;
    }
  }
}
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
