import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  createdAt: Date;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent: string;
  };
}

interface AppState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  notes: [],
  loading: false,
  error: null,
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  removeNote: (id) => set((state) => ({ 
    notes: state.notes.filter((note) => note.id !== id) 
  })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

// Custom hook for notes management
export function useNotes() {
  const store = useStore();
  return {
    notes: store.notes,
    loading: store.loading,
    error: store.error,
    addNote: store.addNote,
    removeNote: store.removeNote,
  };
} 