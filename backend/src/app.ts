import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';
import { OpenAI } from 'openai';
import youtubeRouter from './routes/youtube';
import cors from 'cors';

const app = express();

app.use(cors());

app.use('/api/youtube', youtubeRouter);

// ... rest of the file ... 