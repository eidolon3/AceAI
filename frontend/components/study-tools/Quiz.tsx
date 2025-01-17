'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Check, X } from 'lucide-react';
import { openai } from '../../lib/openai';

interface QuizProps {
  note: {
    id: string;
    title: string;
    content: string;
    summary?: string;
  };
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function Quiz({ note }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        const content = note.summary || note.content;
        const response = await openai.generateQuiz(content);
        setQuestions(response);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // Fallback to mock data if generation fails
        setQuestions([
          {
            id: '1',
            question: 'Sample question about ' + note.title,
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [note]);

  if (loading || questions.length === 0) {
    return <div className="text-gray-400">Generating quiz...</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentIndex((current) =>
      current === questions.length - 1 ? 0 : current + 1
    );
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="p-6 bg-slate-800 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Quiz</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-400">
            Question {currentIndex + 1} of {questions.length}
          </div>
          <button
            onClick={resetQuiz}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg mb-4">{currentQuestion.question}</h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                showResult
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-500/20 text-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-slate-700'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-500">Correct!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5 text-red-500" />
                <span className="text-red-500">Incorrect</span>
              </>
            )}
          </div>

          <button
            onClick={nextQuestion}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
} 