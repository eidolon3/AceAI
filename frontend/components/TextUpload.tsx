'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from './Modal';

interface TextUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => Promise<void>;
}

export default function TextUpload({ isOpen, onClose, onSubmit }: TextUploadProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (text.trim().length < 10) {
      setError('Please enter more text content');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(text);
      setText('');
      onClose();
    } catch (error) {
      setError('Failed to process text. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Text Content">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text-content" className="block text-sm font-medium mb-1">
            Text Content
          </label>
          <textarea
            id="text-content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes here..."
            className="w-full h-48 px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-blue-900 rounded-lg font-medium 
                   hover:from-red-600 hover:to-blue-950 transition-colors flex items-center justify-center gap-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Generate Study Guide'
          )}
        </button>
      </form>
    </Modal>
  );
} 