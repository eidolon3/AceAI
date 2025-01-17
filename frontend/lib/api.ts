import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const youtubeApi = {
  async getTranscription(url: string) {
    const response = await api.post('/api/youtube/transcribe', { url });
    return response.data;
  },
};

export const notesApi = {
  async getAllNotes() {
    const response = await api.get('/api/notes');
    return response.data;
  },

  async getNoteById(id: string) {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  },

  async createNote(data: {
    title: string;
    content: string;
    source: {
      type: 'youtube' | 'pdf' | 'manual';
      originalContent: string;
    };
  }) {
    const response = await api.post('/api/notes', {
      ...data,
      userId: 'test-user-id', // Temporary user ID
    });
    return response.data;
  },

  async deleteNote(id: string) {
    await api.delete(`/api/notes/${id}`);
  },
};

export const studyToolsApi = {
  async generateFlashcards(noteId: string) {
    const response = await api.post(`/api/notes/${noteId}/flashcards`);
    return response.data;
  },

  async generateQuiz(noteId: string) {
    const response = await api.post(`/api/notes/${noteId}/quiz`);
    return response.data;
  },
};

export default api; 