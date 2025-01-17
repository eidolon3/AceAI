import { Router, RequestHandler } from 'express';
import { FlashcardController } from './controllers/flashcardController';

const router = Router();
const flashcardController = new FlashcardController();

const generateFlashcards: RequestHandler = async (req, res) => {
  await flashcardController.generateFlashcards(req, res);
};

router.post('/generate', generateFlashcards);

export default router;
