import React, { useState, useRef, useEffect } from 'react';
import { useNotes } from '../../lib/store';
import { Send, Bot, User } from 'lucide-react';

interface ChatProps {
  noteId: string;
}

export function Chat({ noteId }: ChatProps) {
  const [message, setMessage] = useState('');
  const { notes, addChatMessage } = useNotes();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const note = notes.find(n => n.id === noteId);
  if (!note) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    await addChatMessage(noteId, message);
    setMessage('');
  };
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [note.chat]);
  
  return (
    <div className="p-6 bg-slate-800 rounded-xl flex flex-col h-[500px]">
      <h2 className="text-xl font-bold mb-6">AI Study Assistant</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {note.chat.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`p-2 rounded-full ${
              msg.role === 'user' ? 'bg-red-500' : 'bg-blue-900'
            }`}>
              {msg.role === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>
            
            <div className={`flex-1 p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-red-500/20 ml-12' 
                : 'bg-slate-700 mr-12'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about this topic..."
          className="flex-1 px-3 py-2 bg-slate-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}