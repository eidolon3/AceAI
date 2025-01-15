import { Router, RequestHandler } from 'express';
import { QuizController } from './controllers/quizController';

const router = Router();
const quizController = new QuizController();

const generateQuiz: RequestHandler = async (req, res) => {
  await quizController.generateQuiz(req, res);
};

router.post('/generate', generateQuiz);

export default router;

// Force file to be a module
export {};