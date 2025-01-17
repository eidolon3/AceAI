import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import { database } from '../../config/database';
import { Flashcard, FlashcardGenerateRequest, FlashcardSet } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class FlashcardService {
  async generateFlashcards(request: FlashcardGenerateRequest): Promise<FlashcardSet> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Create flashcard question-answer pairs based on the provided content."
          },
          {
            role: "user",
            content: `Create ${request.numberOfCards || 10} flashcards based on: ${request.content}`
          }
        ]
      });

      const cards: Flashcard[] = completion.choices[0].message.content!
        .split('\n\n')
        .filter(f => f.trim())
        .map((f, index) => ({
          id: uuidv4(),
          question: `Question ${index + 1}`,
          answer: f,
          sourceType: request.sourceType,
          sourceId: request.sourceId,
          createdAt: new Date()
        }));

      const flashcardSet: FlashcardSet = {
        id: uuidv4(),
        cards,
        sourceType: request.sourceType,
        sourceId: request.sourceId,
        createdAt: new Date()
      };

      await database.createFlashcardSet(flashcardSet);
      return flashcardSet;
    } catch (error) {
      console.error('Flashcard generation error:', error);
      throw new Error('Failed to generate flashcards');
    }
  }

  async getFlashcardSetById(id: string): Promise<FlashcardSet | null> {
    return database.getFlashcardSetById(id);
  }
}