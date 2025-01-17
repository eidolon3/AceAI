'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from './Modal';

interface PDFUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => Promise<void>;
}

export default function PDFUpload({ isOpen, onClose, onSubmit }: PDFUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    try {
      setLoading(true);
      await onSubmit(file);
      setFile(null);
      onClose();
    } catch (error) {
      setError('Failed to process PDF. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload PDF Document">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pdf-file" className="block text-sm font-medium mb-1">
            PDF File
          </label>
          <input
            type="file"
            id="pdf-file"
            accept=".pdf,application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 bg-slate-800 rounded-lg focus:ring-2 focus:ring-red-500 outline-none
                     file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                     file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600"
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