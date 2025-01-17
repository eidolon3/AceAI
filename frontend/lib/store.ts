import { create } from 'zustand';
<<<<<<< HEAD
import { authApi, notesApi } from './api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await authApi.login(email, password);
      localStorage.setItem('token', token);
      set({ user, token, loading: false });
    } catch (error) {
      set({ error: 'Login failed', loading: false });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
=======
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c

interface Note {
  id: string;
  title: string;
  content: string;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
<<<<<<< HEAD
    originalContent?: string;
  };
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => Promise<void>;
  fetchNotes: () => Promise<void>;
}

export const useNotes = create<NotesState>((set) => ({
  notes: [],
  loading: false,
  error: null,
  addNote: async (noteData) => {
    set({ loading: true, error: null });
    try {
      const note = await notesApi.createNote(noteData);
      set(state => ({ 
        notes: [note, ...state.notes],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create note', loading: false });
      throw error;
    }
  },
  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const notes = await notesApi.getNotes();
      set({ notes, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notes', loading: false });
      throw error;
    }
  },
=======
    originalContent: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface NotesStore {
  notes: Note[];
  loading: boolean;
  error: string | null;
  addNote: (note: Note) => void;
  setNotes: (notes: Note[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotes = create<NotesStore>((set) => ({
  notes: [],
  loading: false,
  error: null,
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  setNotes: (notes) => set({ notes }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
})); 