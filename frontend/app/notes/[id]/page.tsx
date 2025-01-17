'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../components/Layout';
import { notesApi } from '../../../lib/api';
import { BookOpen, BrainCircuit, GraduationCap } from 'lucide-react';
import { Quiz } from '../../../components/study-tools/Quiz';
import { Flashcards } from '../../../components/study-tools/Flashcards';
import ReactMarkdown from 'react-markdown';

type Tab = 'summary' | 'flashcards' | 'quiz';

interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: string;
}

export default function NotePage() {
  const params = useParams();
  const noteId = params.id as string;
  const [note, setNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await notesApi.getNoteById(noteId);
        setNote(noteData);
      } catch (error) {
        console.error('Error loading note:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [noteId]);

  if (loading || !note) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading...</div>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString();
    } catch {
      return 'Date not available';
    }
  };

  const displayContent = note.summary || note.content;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
        <p className="text-slate-400 mb-8">
          Created on {formatDate(note.createdAt)}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
              activeTab === 'summary'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
              activeTab === 'flashcards'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <BrainCircuit className="w-5 h-5" />
            <span>Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
              activeTab === 'quiz'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span>Quiz</span>
          </button>
        </div>

        {activeTab === 'summary' && (
          <div className="p-6 bg-slate-800 rounded-xl">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <div className="whitespace-pre-wrap">
                <ReactMarkdown>{displayContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && <Flashcards note={note} />}
        {activeTab === 'quiz' && <Quiz note={note} />}
      </div>
    </Layout>
  );
} 