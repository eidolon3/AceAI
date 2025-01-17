import { create } from 'zustand';
import { generateSummary, generateFlashcards, generateQuiz, chatWithAI } from './openai';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  mastered: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Note {
  id: string;
  title: string;
  content: string;
  summary: string;
  type: 'youtube' | 'pdf' | 'text';
  createdAt: Date;
  userId: string;
  folderId?: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
  chat: ChatMessage[];
}

interface Folder {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
}

interface NotesState {
  notes: Note[];
  folders: Folder[];
  currentNote: string | null;
  isProcessing: boolean;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'userId' | 'flashcards' | 'quiz' | 'chat' | 'summary'>) => Promise<void>;
  addFolder: (name: string) => void;
  moveNoteToFolder: (noteId: string, folderId: string) => void;
  updateFlashcard: (noteId: string, flashcardId: string, mastered: boolean) => void;
  addChatMessage: (noteId: string, content: string) => Promise<void>;
  setProcessing: (status: boolean) => void;
  setCurrentNote: (noteId: string | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement real authentication
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  loginWithGoogle: async () => {
    // TODO: Implement real Google authentication
    const mockUser = {
      id: '2',
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=google-user`,
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

export const useNotes = create<NotesState>((set, get) => ({
  notes: [],
  folders: [],
  currentNote: null,
  isProcessing: false,
  
  addNote: async (note) => {
    set({ isProcessing: true });
    
    try {
      // First generate the study guide (which is now stored as the summary)
      const studyGuide = await generateSummary(note.content, note.type);
      
      // Use the study guide to generate flashcards and quiz
      const [flashcards, quiz] = await Promise.all([
        generateFlashcards(studyGuide),
        generateQuiz(studyGuide)
      ]);
      
      const newNote: Note = {
        ...note,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        userId: useAuth.getState().user?.id || 'anonymous',
        summary: studyGuide,
        flashcards: flashcards.map(f => ({ ...f, id: crypto.randomUUID(), mastered: false })),
        quiz: quiz.map(q => ({ ...q, id: crypto.randomUUID() })),
        chat: []
      };
      
      set(state => ({
        notes: [newNote, ...state.notes],
        currentNote: newNote.id
      }));
    } catch (error) {
      console.error('Failed to process note:', error);
      throw error;
    } finally {
      set({ isProcessing: false });
    }
  },
  
  addFolder: (name) => set(state => ({
    folders: [
      ...state.folders,
      {
        id: crypto.randomUUID(),
        name,
        userId: useAuth.getState().user?.id || 'anonymous',
        createdAt: new Date()
      }
    ]
  })),
  
  moveNoteToFolder: (noteId, folderId) => set(state => ({
    notes: state.notes.map(note =>
      note.id === noteId ? { ...note, folderId } : note
    )
  })),
  
  updateFlashcard: (noteId, flashcardId, mastered) => set(state => ({
    notes: state.notes.map(note =>
      note.id === noteId ? {
        ...note,
        flashcards: note.flashcards.map(card =>
          card.id === flashcardId ? { ...card, mastered } : card
        )
      } : note
    )
  })),
  
  addChatMessage: async (noteId, content) => {
    const state = get();
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;
    
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    set(state => ({
      notes: state.notes.map(note =>
        note.id === noteId ? {
          ...note,
          chat: [...note.chat, newMessage]
        } : note
      )
    }));
    
    try {
      const response = await chatWithAI([
        { role: 'user', content: `Study Guide Context:\n\n${note.summary}\n\nQuestion: ${content}` }
      ]);
      
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId ? {
            ...note,
            chat: [...note.chat, assistantMessage]
          } : note
        )
      }));
    } catch (error) {
      console.error('Failed to get AI response:', error);
      throw error;
    }
  },
  
  setProcessing: (status) => set({ isProcessing: status }),
  setCurrentNote: (noteId) => set({ currentNote: noteId })
}));