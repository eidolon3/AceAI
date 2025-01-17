import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< HEAD
// Add auth interceptor
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  async login(email: string, password: string) {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  }
};

export const youtubeApi = {
  async getTranscript(videoUrl: string) {
    const response = await api.post('/api/youtube/transcript', { url: videoUrl });
    return response.data;
  }
};

export const notesApi = {
  async getNotes() {
=======
export const youtubeApi = {
  async getTranscription(url: string) {
    const response = await api.post('/api/youtube/transcribe', { url });
    return response.data;
  },
};

export const notesApi = {
  async getAllNotes() {
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    const response = await api.get('/api/notes');
    return response.data;
  },

<<<<<<< HEAD
=======
  async getNoteById(id: string) {
    const response = await api.get(`/api/notes/${id}`);
    return response.data;
  },

>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
  async createNote(data: {
    title: string;
    content: string;
    source: {
      type: 'youtube' | 'pdf' | 'manual';
<<<<<<< HEAD
      originalContent?: string;
    };
  }) {
    const response = await api.post('/api/notes', data);
    return response.data;
  }
=======
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
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
};

export default api; 