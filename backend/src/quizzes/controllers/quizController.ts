import { Request, Response } from 'express';
import { QuizService } from '../services/quizService';
import { QuizGenerateRequest } from '../types';

const quizService = new QuizService();

export class QuizController {
  async generateQuiz(req: Request, res: Response) {
    try {
      const request: QuizGenerateRequest = req.body;
      const quiz = await quizService.generateQuiz(request);
      res.json(quiz);
    } catch (error) {
      console.error('Quiz generation error:', error);
      res.status(500).json({ error: 'Failed to generate quiz' });
    }
  }
}