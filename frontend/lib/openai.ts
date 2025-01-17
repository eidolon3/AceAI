interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export const openai = {
  async generateQuiz(content: string): Promise<QuizQuestion[]> {
    const response = await fetch('/api/generate/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate quiz');
    }

    return response.json();
  },

  async generateFlashcards(content: string): Promise<Flashcard[]> {
    const response = await fetch('/api/generate/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate flashcards');
    }

    return response.json();
  },
}; 