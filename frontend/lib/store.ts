import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
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
})); 