import { v4 as uuidv4 } from 'uuid';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../types';

// Temporary in-memory storage
const notes: Note[] = [];

export class NoteService {
  async createNote(userId: string, data: CreateNoteRequest): Promise<Note> {
    const note: Note = {
      id: uuidv4(),
      userId: userId,  // Use the actual user ID from auth
      title: data.title,
      content: data.content,
      source: data.source,
      tags: data.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    notes.push(note);
    return note;
  }

  async getNoteById(userId: string, id: string): Promise<Note | null> {
    return notes.find(note => note.id === id && note.userId === userId) || null;
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    return notes.filter(note => note.userId === userId);
  }

  async updateNote(userId: string, id: string, updates: UpdateNoteRequest): Promise<Note | null> {
    const index = notes.findIndex(note => note.id === id && note.userId === userId);
    if (index === -1) return null;

    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date()
    };

    return notes[index];
  }

  async deleteNote(userId: string, id: string): Promise<boolean> {
    const index = notes.findIndex(note => note.id === id && note.userId === userId);
    if (index === -1) return false;

    notes.splice(index, 1);
    return true;
  }
}