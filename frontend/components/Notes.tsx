'use client';

import { useEffect } from 'react';
import { useNotes, useAuth } from '../lib/store';
import { useRouter } from 'next/navigation';

interface NotesProps {
  mainContent?: boolean;
}

export default function Notes({ mainContent = false }: NotesProps) {
  const { notes, loading, error, fetchNotes } = useNotes();
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchNotes().catch(console.error);
    } else {
      router.push('/login');
    }
  }, [fetchNotes, token, router]);

  if (!token) {
    return null;
  }

  if (loading) return <div className="text-gray-400">Loading...</div>;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className={`space-y-4 ${mainContent ? '' : 'overflow-y-auto'}`}>
      {!mainContent && (
        <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4">Recent Notes</h2>
      )}
      
      {!notes || notes.length === 0 ? (
        <div className="text-gray-400 text-center text-sm">
          {mainContent 
            ? 'Upload your first study material to get started'
            : 'No notes yet'}
        </div>
      ) : (
        <div className={`grid gap-4 ${mainContent ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {notes.map((note) => (
            <div 
              key={note.id} 
              onClick={() => router.push(`/notes/${note.id}`)}
              className={`p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer
                ${mainContent ? 'flex flex-col' : ''}`}
            >
              <h3 className={`font-semibold ${mainContent ? 'text-base' : 'text-sm'}`}>
                {note.title}
              </h3>
              <div className={`mt-2 text-gray-300 ${mainContent ? 'text-sm' : 'text-xs'} line-clamp-2`}>
                {note.content}
              </div>
              <div className={`mt-2 text-gray-400 ${mainContent ? 'text-sm' : 'text-xs'}`}>
                {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}