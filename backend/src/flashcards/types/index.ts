export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  sourceType: 'note' | 'summary';
  sourceId: string;
  createdAt: Date;
}

export interface FlashcardGenerateRequest {
  content: string;
  sourceType: 'note' | 'summary';
  sourceId: string;
  numberOfCards?: number;
}

export interface FlashcardSet {
  id: string;
  cards: Flashcard[];
  sourceType: 'note' | 'summary';
  sourceId: string;
  createdAt: Date;
}
