'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { UploadCard } from '../components/UploadCard';
import YouTubeUpload from '../components/YouTubeUpload';
import PDFUpload from '../components/PDFUpload';
import TextUpload from '../components/TextUpload';
import { FileText, Youtube, FileUp, FolderPlus } from 'lucide-react';

export default function Home() {
  const [uploadType, setUploadType] = useState<'youtube' | 'pdf' | 'text' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (type: 'youtube' | 'pdf' | 'text') => {
    setUploadType(type);
  };

  const handleYoutubeSubmit = async (url: string) => {
    // TODO: Implement YouTube processing
    console.log('Processing YouTube URL:', url);
  };

  const handlePDFSubmit = async (file: File) => {
    // TODO: Implement PDF processing
    console.log('Processing PDF:', file.name);
  };

  const handleTextSubmit = async (text: string) => {
    // TODO: Implement text processing
    console.log('Processing text:', text.substring(0, 100) + '...');
  };

  return (
    <Layout>
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
              onClick={() => {}} // TODO: Implement folder creation
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Folder</span>
            </button>
          </div>
          
          <div className="text-slate-400 text-center py-8">
            <p>Upload your first study material to get started</p>
            <p className="text-sm mt-2">Your notes and summaries will appear here</p>
          </div>
        </div>

        {/* Upload Modals */}
        <YouTubeUpload
          isOpen={uploadType === 'youtube'}
          onClose={() => setUploadType(null)}
          onSubmit={handleYoutubeSubmit}
        />
        
        <PDFUpload
          isOpen={uploadType === 'pdf'}
          onClose={() => setUploadType(null)}
          onSubmit={handlePDFSubmit}
        />
        
        <TextUpload
          isOpen={uploadType === 'text'}
          onClose={() => setUploadType(null)}
          onSubmit={handleTextSubmit}
        />
      </div>
    </Layout>
  );
}
