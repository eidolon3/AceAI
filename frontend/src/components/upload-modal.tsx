import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useNotes } from '../lib/store';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'youtube' | 'pdf' | 'text';
}

export function UploadModal({ isOpen, onClose, type }: UploadModalProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { addNote, isProcessing } = useNotes();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!input.trim()) {
      setError('Please provide content to process');
      return;
    }

    try {
      let content = input;
      let title = '';

      // Process based on type
      if (type === 'youtube') {
        if (!input.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
          setError('Please enter a valid YouTube URL');
          return;
        }
        title = 'YouTube Video Summary';
      } else if (type === 'pdf') {
        const file = (e.target as HTMLFormElement).querySelector('input[type="file"]')?.files?.[0];
        if (!file) {
          setError('Please select a PDF file');
          return;
        }
        if (file.type !== 'application/pdf') {
          setError('Please select a valid PDF file');
          return;
        }
        content = await readFileAsText(file);
        title = file.name.replace(/\.pdf$/i, '');
      } else {
        if (input.length < 10) {
          setError('Please enter more text content');
          return;
        }
        title = 'Text Notes';
      }

      await addNote({
        title,
        content,
        type,
      });

      onClose();
      setInput('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing';
      setError(errorMessage);
      console.error('Processing failed:', err);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {type === 'youtube' ? 'Upload YouTube Video' :
           type === 'pdf' ? 'Upload PDF Document' :
           'Upload Text Content'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'youtube' && (
            <div>
              <label htmlFor="youtube-url" className="block text-sm font-medium mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                id="youtube-url"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
            </div>
          )}

          {type === 'pdf' && (
            <div>
              <label htmlFor="pdf-file" className="block text-sm font-medium mb-1">
                PDF File
              </label>
              <input
                type="file"
                id="pdf-file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setInput(file.name);
                  }
                }}
                className="w-full px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600"
                required
              />
            </div>
          )}

          {type === 'text' && (
            <div>
              <label htmlFor="text-content" className="block text-sm font-medium mb-1">
                Text Content
              </label>
              <textarea
                id="text-content"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your notes here..."
                className="w-full h-48 px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-blue-900 rounded-lg font-medium hover:from-red-600 hover:to-blue-950 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Upload and Process'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}