'use client';

import { useState } from 'react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questions[currentQuestion].id]: answer,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct += 1;
      }
    });
    return (correct / questions.length) * 100;
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Quiz Results</h3>
        <p className="text-lg">Your score: {calculateScore().toFixed(1)}%</p>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">Question {index + 1}: {question.question}</p>
              <p className="text-green-600">Correct answer: {question.correctAnswer}</p>
              <p className="text-gray-600">Your answer: {selectedAnswers[question.id]}</p>
              <p className="text-sm mt-2">{question.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Question {currentQuestion + 1}/{questions.length}</h3>
        <span className="text-sm text-gray-500">
          Progress: {((currentQuestion + 1) / questions.length * 100).toFixed(0)}%
        </span>
      </div>

      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-lg mb-4">{question.question}</p>
        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full p-3 text-left rounded-lg transition-colors ${
                selectedAnswers[question.id] === option
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={nextQuestion}
        disabled={!selectedAnswers[question.id]}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
} 