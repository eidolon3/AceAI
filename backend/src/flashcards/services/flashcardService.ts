import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
<<<<<<< HEAD
import { database } from '../../config/database';
=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
import { Flashcard, FlashcardGenerateRequest, FlashcardSet } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class FlashcardService {
  async generateFlashcards(request: FlashcardGenerateRequest): Promise<FlashcardSet> {
<<<<<<< HEAD
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
=======
    const numCards = request.numberOfCards || 5;
    
    const prompt = `Create ${numCards} flashcards from the following content. 
    Format: Question: [question] Answer: [answer]
    Make questions that test understanding, not just memorization.
    Content: ${request.content}`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      const rawText = completion.choices[0].message.content || '';
      const cards = this.parseFlashcards(rawText, request.sourceType, request.sourceId);

      return {
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
        id: uuidv4(),
        cards,
        sourceType: request.sourceType,
        sourceId: request.sourceId,
        createdAt: new Date()
      };
<<<<<<< HEAD

      await database.createFlashcardSet(flashcardSet);
      return flashcardSet;
=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    } catch (error) {
      console.error('Flashcard generation error:', error);
      throw new Error('Failed to generate flashcards');
    }
  }

<<<<<<< HEAD
  async getFlashcardSetById(id: string): Promise<FlashcardSet | null> {
    return database.getFlashcardSetById(id);
=======
  private parseFlashcards(text: string, sourceType: 'note' | 'summary', sourceId: string): Flashcard[] {
    const cards: Flashcard[] = [];
    const pairs = text.split('\n\n');

    for (const pair of pairs) {
      const questionMatch = pair.match(/Question: (.+)/);
      const answerMatch = pair.match(/Answer: (.+)/);

      if (questionMatch && answerMatch) {
        cards.push({
          id: uuidv4(),
          question: questionMatch[1].trim(),
          answer: answerMatch[1].trim(),
          sourceType,
          sourceId,
          createdAt: new Date()
        });
      }
    }

    return cards;
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
  }
}