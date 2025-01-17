import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

interface NoteRequest {
  title: string;
  content: string;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent: string;
  };
}

interface NoteResponse {
  success: boolean;
  data?: any;
  error?: string;
  details?: string;
}

interface NoteParams {
  id: string;
}

// Create note
router.post('/', (
  req: Request<{}, NoteResponse, NoteRequest>,
  res: Response<NoteResponse>
) => {
  const handleCreate = async () => {
    try {
      const { title, content, source } = req.body;

      const note = await prisma.note.create({
        data: {
          title,
          content,
          source,
          userId: 'test-user-id', // Temporary user ID for testing
        },
      });

      res.json({
        success: true,
        data: note,
      });
    } catch (error) {
      console.error('Note creation error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create note',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  handleCreate();
});

// Get all notes
router.get('/', (
  _req: Request,
  res: Response<NoteResponse>
) => {
  const handleGetAll = async () => {
    try {
      const notes = await prisma.note.findMany({
        where: {
          userId: 'test-user-id', // Temporary user ID for testing
        },
      });
      res.json({ success: true, data: notes });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch notes' 
      });
    }
  };

  handleGetAll();
});

// Get note by ID
router.get('/:id', (
  req: Request<NoteParams>,
  res: Response<NoteResponse>
) => {
  const handleGetById = async () => {
    try {
      const note = await prisma.note.findUnique({
        where: { id: req.params.id },
      });
      if (!note) {
        return res.status(404).json({ 
          success: false, 
          error: 'Note not found' 
        });
      }
      res.json({ success: true, data: note });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch note' 
      });
    }
  };

  handleGetById();
});

export default router;

// Force file to be a module
export {};