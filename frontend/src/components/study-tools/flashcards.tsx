import React, { useState } from 'react';
import { useNotes } from '../../lib/store';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

interface FlashcardsProps {
  noteId: string;
}

export function Flashcards({ noteId }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { notes, updateFlashcard } = useNotes();
  
  const note = notes.find(n => n.id === noteId);
  if (!note) return null;
  
  const { flashcards } = note;
  const currentCard = flashcards[currentIndex];
  
  const nextCard = () => {
    setShowAnswer(false);
    setCurrentIndex((current) => 
      current === flashcards.length - 1 ? 0 : current + 1
    );
  };
  
  const previousCard = () => {
    setShowAnswer(false);
    setCurrentIndex((current) => 
      current === 0 ? flashcards.length - 1 : current - 1
    );
  };
  
  const toggleMastered = () => {
    updateFlashcard(noteId, currentCard.id, !currentCard.mastered);
  };
  
  return (
    <div className="p-6 bg-slate-800 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Flashcards</h2>
        <div className="text-sm text-slate-400">
          {currentIndex + 1} / {flashcards.length}
        </div>
      </div>
      
      <div 
        className="min-h-[200px] bg-slate-700 rounded-lg p-6 mb-6 cursor-pointer"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        <div className="text-center">
          {showAnswer ? currentCard.answer : currentCard.question}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={previousCard}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={toggleMastered}
            className={`p-2 rounded-lg transition-colors ${
              currentCard.mastered 
                ? 'bg-green-500/20 text-green-500' 
                : 'hover:bg-slate-700'
            }`}
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
        
        <button
          onClick={nextCard}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}