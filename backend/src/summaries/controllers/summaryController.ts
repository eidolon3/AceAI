import { Request, Response } from 'express';
import { SummaryService } from '../services/summaryService';
import { SummaryRequest } from '../types';

const summaryService = new SummaryService();

export class SummaryController {
  async handlePDFSummary(req: Request, res: Response) {
    try {
      const { content, options }: SummaryRequest = req.body;
      const summary = await summaryService.summarizePDF(content, options);
      
      res.json({
        summary,
        originalLength: content.length,
        summaryLength: summary.length,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('PDF summary error:', error);
      res.status(500).json({ error: 'Failed to summarize PDF' });
    }
  }

  async handleYouTubeSummary(req: Request, res: Response) {
    try {
      const { content, options }: SummaryRequest = req.body;
      const summary = await summaryService.summarizeYouTube(content, options);
      
      res.json({
        summary,
        originalLength: content.length,
        summaryLength: summary.length,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('YouTube summary error:', error);
      res.status(500).json({ error: 'Failed to summarize YouTube content' });
    }
  }

  async handleAudioSummary(req: Request, res: Response) {
    try {
      const { content, options }: SummaryRequest = req.body;
      const summary = await summaryService.summarizeAudio(content, options);
      
      res.json({
        summary,
        originalLength: content.length,
        summaryLength: summary.length,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Audio summary error:', error);
      res.status(500).json({ error: 'Failed to summarize audio content' });
    }
  }
}