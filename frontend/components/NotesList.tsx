'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notesApi } from '../lib/api';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  source: {
    type: 'pdf' | 'youtube' | 'audio' | 'manual';
    originalContent?: string;
  };
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await notesApi.getAllNotes();
      setNotes(response);
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading notes...</div>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <Link href={`/notes/${note.id}`}>
            <div className="cursor-pointer">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-sm text-gray-500">
                Created: {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Source: {note.source.type}
              </p>
              <p className="mt-2 text-gray-700 line-clamp-3">{note.content}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
} 