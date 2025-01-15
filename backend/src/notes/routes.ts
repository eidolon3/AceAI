import { Router, Request, Response } from 'express';
import { NoteController } from './controllers/noteController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const noteController = new NoteController();

// Create route handlers
const createNote = async (req: Request, res: Response) => {
  await noteController.createNote(req, res);
};

const getUserNotes = async (req: Request, res: Response) => {
  await noteController.getUserNotes(req, res);
};

const getNoteById = async (req: Request, res: Response) => {
  await noteController.getNoteById(req, res);
};

const updateNote = async (req: Request, res: Response) => {
  await noteController.updateNote(req, res);
};

const deleteNote = async (req: Request, res: Response) => {
  await noteController.deleteNote(req, res);
};

// Apply routes with middleware
router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getUserNotes);
router.get('/:id', authMiddleware, getNoteById);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;

// Force file to be a module
export {};