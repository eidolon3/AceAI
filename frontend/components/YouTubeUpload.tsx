'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from './Modal';
import { youtubeApi, notesApi } from '../lib/api';
import { useNotes } from '../lib/store';

interface YouTubeUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YouTubeUpload({ isOpen, onClose }: YouTubeUploadProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNote } = useNotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    try {
      setLoading(true);
      const data = await youtubeApi.getTranscription(url);
      
      // Create a new note with the summary
      const response = await notesApi.createNote({
        title: `YouTube Summary - ${new Date().toLocaleDateString()}`,
        content: data.data.summary,
        source: {
          type: 'youtube',
          originalContent: url,
        },
      });

      // Add the new note to the store
      addNote(response.data);

      setUrl('');
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process video');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add YouTube Video">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium mb-1">
            YouTube URL
          </label>
          <input
            type="url"
            id="youtube-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
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