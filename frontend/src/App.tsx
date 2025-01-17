import React from 'react';
import { Dashboard } from './components/dashboard';
import { Sidebar } from './components/sidebar';
import { NoteDetail } from './components/note-detail';
import { useNotes } from './lib/store';

function App() {
  const { currentNote } = useNotes();

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {currentNote ? <NoteDetail /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;