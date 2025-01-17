'use client';

import { useState } from 'react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
}

export default function Flashcards({ cards }: FlashcardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const previousCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  const toggleKnown = () => {
    const newKnown = new Set(knownCards);
    if (newKnown.has(cards[currentCard].id)) {
      newKnown.delete(cards[currentCard].id);
    } else {
      newKnown.add(cards[currentCard].id);
    }
    setKnownCards(newKnown);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Flashcard {currentCard + 1}/{cards.length}</h3>
        <span className="text-sm text-gray-500">
          Mastered: {knownCards.size}/{cards.length}
        </span>
      </div>

      <div 
        className="min-h-[200px] p-6 bg-white rounded-lg shadow cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className="text-center">
          {showAnswer ? cards[currentCard].answer : cards[currentCard].question}
        </div>
        <div className="text-center mt-4 text-sm text-gray-500">
          Click to {showAnswer ? 'show question' : 'show answer'}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={previousCard}
          disabled={currentCard === 0}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={toggleKnown}
          className={`px-4 py-2 rounded-lg ${
            knownCards.has(cards[currentCard].id)
              ? 'bg-green-500 text-white'
              : 'bg-gray-200'
          }`}
        >
          {knownCards.has(cards[currentCard].id) ? 'Mastered' : 'Mark as Known'}
        </button>
        <button
          onClick={nextCard}
          disabled={currentCard === cards.length - 1}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
} 