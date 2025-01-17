import React, { useState } from 'react';
import { useNotes } from '../lib/store';
import { Flashcards } from './study-tools/flashcards';
import { Quiz } from './study-tools/quiz';
import { Chat } from './study-tools/chat';
import { BookOpen, BrainCircuit, MessageSquare, GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Tab = 'summary' | 'flashcards' | 'quiz' | 'chat';

export function NoteDetail() {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const { notes, currentNote } = useNotes();
  
  const note = notes.find(n => n.id === currentNote);
  if (!note) return null;
  
  return (
    <div className="flex-1 min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
        <p className="text-slate-400 mb-8">
          Created on {note.createdAt.toLocaleDateString()}
        </p>
        
        <div className="grid grid-cols-4 gap-4 mb-8">
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
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${
              activeTab === 'chat' 
                ? 'bg-red-500 text-white' 
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat</span>
          </button>
        </div>
        
        {activeTab === 'summary' && (
          <div className="p-6 bg-slate-800 rounded-xl">
            <h2 className="text-xl font-bold mb-6">Summary</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  pre: ({ node, ...props }) => (
                    <pre className="whitespace-pre-wrap" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table className="border-collapse w-full my-4" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-slate-600 px-4 py-2 bg-slate-700" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-slate-600 px-4 py-2" {...props} />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1 className="mt-8 mb-4 text-3xl font-bold" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="mt-6 mb-4 text-2xl font-bold" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="my-4 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="my-4 pl-6 space-y-2 list-disc" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="my-4 pl-6 space-y-2 list-decimal" {...props} />
                  ),
                  li: ({ node, children, ...props }) => (
                    <li className="pl-2" {...props}>
                      <span className="block">{children}</span>
                    </li>
                  ),
                }}
              >
                {note.summary}
              </ReactMarkdown>
            </div>
          </div>
        )}
        
        {activeTab === 'flashcards' && <Flashcards noteId={note.id} />}
        {activeTab === 'quiz' && <Quiz noteId={note.id} />}
        {activeTab === 'chat' && <Chat noteId={note.id} />}
      </div>
    </div>
  );
}