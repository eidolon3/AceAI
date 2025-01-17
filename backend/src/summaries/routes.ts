import { Router } from 'express';
import { SummaryController } from './controllers/summaryController';

const router = Router();
const summaryController = new SummaryController();

router.post('/pdf', summaryController.handlePDFSummary);
router.post('/youtube', summaryController.handleYouTubeSummary);
router.post('/audio', summaryController.handleAudioSummary);

export default router;