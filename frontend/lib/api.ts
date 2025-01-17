import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    const response = await api.get('/api/notes');
    return response.data;
  },

  async createNote(data: {
    title: string;
    content: string;
    source: {
      type: 'youtube' | 'pdf' | 'manual';
      originalContent?: string;
    };
  }) {
    const response = await api.post('/api/notes', data);
    return response.data;
  }
};

export default api; 