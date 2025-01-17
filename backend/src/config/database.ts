import { QuickDB } from 'quick.db';

const db = new QuickDB();

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent?: string;
  };
  userId: string;
  summary?: string;
  createdAt: string;
}

export const database = {
  // Users
  async getUsers(): Promise<User[]> {
    return await db.get('users') || [];
  },

  async getUserById(id: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find((user: User) => user.id === id);
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.getUsers();
    return users.find((user: User) => user.email === email);
  },

  async createUser(user: User): Promise<User> {
    const users = await this.getUsers();
    users.push(user);
    await db.set('users', users);
    return user;
  },

  // Notes
  async getNotes(): Promise<Note[]> {
    return await db.get('notes') || [];
  },

  async getNoteById(id: string): Promise<Note | undefined> {
    const notes = await this.getNotes();
    return notes.find((note: Note) => note.id === id);
  },

  async createNote(note: Note): Promise<Note> {
    const notes = await this.getNotes();
    notes.push(note);
    await db.set('notes', notes);
    return note;
  },

  async updateNote(id: string, updates: Partial<Note>): Promise<Note | null> {
    const notes = await this.getNotes();
    const index = notes.findIndex((note: Note) => note.id === id);
    if (index !== -1) {
      notes[index] = { ...notes[index], ...updates };
      await db.set('notes', notes);
      return notes[index];
    }
    return null;
  },

  async deleteNote(id: string): Promise<void> {
    const notes = await this.getNotes();
    const filtered = notes.filter((note: Note) => note.id !== id);
    await db.set('notes', filtered);
  }
};

export default database; 