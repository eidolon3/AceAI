import { Router } from 'express';
import { NoteService } from './services/noteService';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const noteService = new NoteService();

// All routes require authentication
router.use(authenticateToken);

router.post('/', async (req, res) => {
  try {
    const note = await noteService.createNote(req.user!.userId, req.body);
    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

router.get('/', async (req, res) => {
  try {
    const notes = await noteService.getUserNotes(req.user!.userId);
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Failed to get notes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.user!.userId, req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Failed to get note' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const note = await noteService.updateNote(req.user!.userId, req.params.id, req.body);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const success = await noteService.deleteNote(req.user!.userId, req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

export default router;