import { v4 as uuidv4 } from 'uuid';
<<<<<<< HEAD
import { database } from '../../config/database';
import { CreateNoteRequest, UpdateNoteRequest } from '../types';
import type { Note } from '../../config/database';
=======
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../types';

// Temporary in-memory storage
const notes: Note[] = [];
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c

export class NoteService {
  async createNote(userId: string, data: CreateNoteRequest): Promise<Note> {
    const note: Note = {
      id: uuidv4(),
<<<<<<< HEAD
      userId,
      title: data.title,
      content: data.content,
      source: data.source,
      createdAt: new Date().toISOString()
    };

    await database.createNote(note);
=======
      userId: userId,  // Use the actual user ID from auth
      title: data.title,
      content: data.content,
      source: data.source,
      tags: data.tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    notes.push(note);
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    return note;
  }

  async getNoteById(userId: string, id: string): Promise<Note | null> {
<<<<<<< HEAD
    const note = await database.getNoteById(id);
    return note && note.userId === userId ? note : null;
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    const notes = await database.getNotes();
=======
    return notes.find(note => note.id === id && note.userId === userId) || null;
  }

  async getUserNotes(userId: string): Promise<Note[]> {
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    return notes.filter(note => note.userId === userId);
  }

  async updateNote(userId: string, id: string, updates: UpdateNoteRequest): Promise<Note | null> {
<<<<<<< HEAD
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
=======
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
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
    return true;
  }
}