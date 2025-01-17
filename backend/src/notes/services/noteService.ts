import { v4 as uuidv4 } from 'uuid';
import { database } from '../../config/database';
import { CreateNoteRequest, UpdateNoteRequest } from '../types';
import type { Note } from '../../config/database';

export class NoteService {
  async createNote(userId: string, data: CreateNoteRequest): Promise<Note> {
    const note: Note = {
      id: uuidv4(),
      userId,
      title: data.title,
      content: data.content,
      source: data.source,
      createdAt: new Date().toISOString()
    };

    await database.createNote(note);
    return note;
  }

  async getNoteById(userId: string, id: string): Promise<Note | null> {
    const note = await database.getNoteById(id);
    return note && note.userId === userId ? note : null;
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    const notes = await database.getNotes();
    return notes.filter(note => note.userId === userId);
  }

  async updateNote(userId: string, id: string, updates: UpdateNoteRequest): Promise<Note | null> {
    const note = await database.getNoteById(id);
    if (!note || note.userId !== userId) return null;

    const updatedNote: Note = {
      ...note,
      ...updates,
    };

    await database.updateNote(id, updatedNote);
    return updatedNote;
  }

  async deleteNote(userId: string, id: string): Promise<boolean> {
    const note = await database.getNoteById(id);
    if (!note || note.userId !== userId) return false;

    await database.deleteNote(id);
    return true;
  }
}