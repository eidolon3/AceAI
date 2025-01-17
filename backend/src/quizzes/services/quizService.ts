import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
<<<<<<< HEAD
import { database } from '../../config/database';
=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
import { Quiz, QuizGenerateRequest, QuizQuestion } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class QuizService {
  async generateQuiz(request: QuizGenerateRequest): Promise<Quiz> {
<<<<<<< HEAD
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
=======
    const numQuestions = request.numberOfQuestions || 5;
    const difficulty = request.difficulty || 'medium';
    
    const prompt = `Create a ${difficulty} difficulty quiz with ${numQuestions} multiple choice questions from this content.
    Format each question as:
    Q: [question]
    A: [correct answer]
    O: [option1] | [option2] | [option3] | [correct answer]
    E: [brief explanation]
    
    Content: ${request.content}`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const rawText = completion.choices[0].message.content || '';
      const questions = this.parseQuizQuestions(rawText, request.sourceType, request.sourceId);

      return {
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
        id: uuidv4(),
        questions,
        sourceType: request.sourceType,
        sourceId: request.sourceId,
<<<<<<< HEAD
        difficulty: request.difficulty || 'medium',
        createdAt: new Date()
      };

      await database.createQuiz(quiz);
      return quiz;
=======
        difficulty,
        createdAt: new Date()
      };
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    } catch (error) {
      console.error('Quiz generation error:', error);
      throw new Error('Failed to generate quiz');
    }
  }

<<<<<<< HEAD
  async getQuizById(id: string): Promise<Quiz | null> {
    return database.getQuizById(id);
=======
  private parseQuizQuestions(text: string, sourceType: 'note' | 'summary', sourceId: string): QuizQuestion[] {
    const questions: QuizQuestion[] = [];
    const questionBlocks = text.split('\n\n');

    for (const block of questionBlocks) {
      const questionMatch = block.match(/Q: (.+)/);
      const answerMatch = block.match(/A: (.+)/);
      const optionsMatch = block.match(/O: (.+)/);
      const explanationMatch = block.match(/E: (.+)/);

      if (questionMatch && answerMatch && optionsMatch && explanationMatch) {
        const options = optionsMatch[1].split('|').map(o => o.trim());
        
        questions.push({
          id: uuidv4(),
          question: questionMatch[1].trim(),
          correctAnswer: answerMatch[1].trim(),
          options: this.shuffleArray(options),
          explanation: explanationMatch[1].trim(),
          sourceType,
          sourceId,
          createdAt: new Date()
        });
      }
    }

    return questions;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
  }
}

// Force file to be a module
export {};