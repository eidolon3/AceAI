import { Request, Response } from 'express';
import { FlashcardService } from '../services/flashcardService';
import { FlashcardGenerateRequest } from '../types';

const flashcardService = new FlashcardService();

export class FlashcardController {
  async generateFlashcards(req: Request, res: Response) {
    try {
      const request: FlashcardGenerateRequest = req.body;
      const flashcardSet = await flashcardService.generateFlashcards(request);
      res.json(flashcardSet);
    } catch (error) {
      console.error('Flashcard generation error:', error);
      res.status(500).json({ error: 'Failed to generate flashcards' });
    }
  }
}