import React, { useState } from 'react';
import { FileText, Youtube, FileUp, FolderPlus } from 'lucide-react';
import { UploadCard } from './upload-card';
import { UploadModal } from './upload-modal';
import { useNotes, useAuth } from '../lib/store';
import { AuthModal } from './auth-modal';

export function Dashboard() {
  const [uploadType, setUploadType] = useState<'youtube' | 'pdf' | 'text' | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { notes } = useNotes();
  const { isAuthenticated } = useAuth();

  const handleUpload = (type: 'youtube' | 'pdf' | 'text') => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setUploadType(type);
  };

  const handleCreateFolder = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    // TODO: Implement folder creation
    console.log('Creating new folder');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="mt-2 text-slate-400">Create new notes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <UploadCard
          title="YouTube Link"
          description="Upload video lectures and get AI-powered summaries"
          icon={Youtube}
          onClick={() => handleUpload('youtube')}
        />
        <UploadCard
          title="PDF Upload"
          description="Convert course materials into interactive study content"
          icon={FileUp}
          onClick={() => handleUpload('pdf')}
        />
        <UploadCard
          title="Text Upload"
          description="Transform your notes into structured study materials"
          icon={FileText}
          onClick={() => handleUpload('text')}
        />
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Notes</h2>
          <button
            onClick={handleCreateFolder}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
          >
            <FolderPlus className="w-4 h-4" />
            <span>Create Folder</span>
          </button>
        </div>
        
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-slate-800 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <h3 className="font-medium">{note.title}</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Created on {note.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-400 text-center py-8">
            <p>Upload your first study material to get started</p>
            <p className="text-sm mt-2">Your notes and summaries will appear here</p>
          </div>
        )}
      </div>

      <UploadModal
        isOpen={uploadType !== null}
        onClose={() => setUploadType(null)}
        type={uploadType || 'text'}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}