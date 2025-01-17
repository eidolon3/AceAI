import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { database } from '../../config/database';
import { Quiz, QuizGenerateRequest, QuizQuestion } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class QuizService {
  async generateQuiz(request: QuizGenerateRequest): Promise<Quiz> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create multiple choice questions based on the provided content."
          },
          {
            role: "user",
            content: `Create ${request.numberOfQuestions || 5} ${request.difficulty || 'medium'} difficulty questions based on: ${request.content}`
          }
        ]
      });

      const questions: QuizQuestion[] = completion.choices[0].message.content!
        .split('\n\n')
        .filter(q => q.trim())
        .map((q, index) => ({
          id: uuidv4(),
          question: q,
          options: ['Option A', 'Option B', 'Option C', 'Option D'], // Placeholder options
          correctAnswer: 0, // Placeholder correct answer
          explanation: 'Generated explanation',
          sourceType: request.sourceType,
          sourceId: request.sourceId,
          createdAt: new Date()
        }));

      const quiz: Quiz = {
        id: uuidv4(),
        questions,
        sourceType: request.sourceType,
        sourceId: request.sourceId,
        difficulty: request.difficulty || 'medium',
        createdAt: new Date()
      };

      await database.createQuiz(quiz);
      return quiz;
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw new Error('Failed to generate quiz');
    }
  }

  async getQuizById(id: string): Promise<Quiz | null> {
    return database.getQuizById(id);
  }
}

// Force file to be a module
export {};