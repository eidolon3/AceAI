'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import YouTubeUpload from '../components/YouTubeUpload';
import { Card } from '../components/Card';
import { Youtube, FileText, Mic } from 'lucide-react';
<<<<<<< HEAD
import Notes from '../components/Notes';
=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c

export default function Home() {
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);

  return (
    <Layout>
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-start min-h-screen py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 w-full max-w-7xl">
=======
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
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

<<<<<<< HEAD
        <div className="w-full max-w-7xl p-8">
          <h2 className="text-xl font-semibold mb-6">Recent Notes</h2>
          <div className="bg-slate-800/50 rounded-xl p-6">
            <Notes mainContent={true} />
          </div>
        </div>

=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
        <YouTubeUpload
          isOpen={isYouTubeModalOpen}
          onClose={() => setIsYouTubeModalOpen(false)}
        />
      </div>
    </Layout>
  );
}