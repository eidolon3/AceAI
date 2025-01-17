'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import YouTubeUpload from '../components/YouTubeUpload';
import { Card } from '../components/Card';
import { Youtube, FileText, Mic } from 'lucide-react';

export default function Home() {
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          <Card
            icon={<Youtube className="w-8 h-8 text-red-500" />}
            title="YouTube Video"
            description="Generate study materials from a YouTube video"
            onClick={() => setIsYouTubeModalOpen(true)}
          />
          <Card
            icon={<FileText className="w-8 h-8 text-blue-500" />}
            title="PDF Document"
            description="Upload a PDF to create study materials"
            onClick={() => {}}
          />
          <Card
            icon={<Mic className="w-8 h-8 text-purple-500" />}
            title="Audio Recording"
            description="Record or upload audio for transcription"
            onClick={() => {}}
          />
        </div>

        <YouTubeUpload
          isOpen={isYouTubeModalOpen}
          onClose={() => setIsYouTubeModalOpen(false)}
        />
      </div>
    </Layout>
  );
}