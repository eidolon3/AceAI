export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  options: string[];  // Multiple choice options
  explanation: string;
  sourceType: 'note' | 'summary';
  sourceId: string;
  createdAt: Date;
}

export interface QuizGenerateRequest {
  content: string;
  sourceType: 'note' | 'summary';
  sourceId: string;
  numberOfQuestions?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  sourceType: 'note' | 'summary';
  sourceId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}
