import { Request, Response } from 'express';
import { NoteService } from '../services/noteService';
import { CreateNoteRequest, UpdateNoteRequest } from '../types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      }
    }
  }
}

const noteService = new NoteService();

export class NoteController {
  async createNote(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;  // Get ID from authenticated user
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const noteData: CreateNoteRequest = req.body;
      const note = await noteService.createNote(userId, noteData);
      res.status(201).json(note);
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ error: 'Failed to create note' });
    }
  }

  async getNoteById(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { id } = req.params;
      const note = await noteService.getNoteById(userId, id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.json(note);
    } catch (error) {
      console.error('Get note error:', error);
      res.status(500).json({ error: 'Failed to get note' });
    }
  }

  async getUserNotes(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const notes = await noteService.getUserNotes(userId);
      res.json(notes);
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ error: 'Failed to get notes' });
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { id } = req.params;
      const updates: UpdateNoteRequest = req.body;
      
      const note = await noteService.updateNote(userId, id, updates);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.json(note);
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ error: 'Failed to update note' });
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const { id } = req.params;
      
      const success = await noteService.deleteNote(userId, id);
      if (!success) {
        return res.status(404).json({ error: 'Note not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Delete note error:', error);
      res.status(500).json({ error: 'Failed to delete note' });
    }
  }
}