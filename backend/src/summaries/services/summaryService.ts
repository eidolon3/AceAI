import OpenAI from 'openai';
import { SummaryRequest } from '../types';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Verify API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key is missing!');
  process.exit(1);
}

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '' // Provide empty string as fallback to satisfy TypeScript
});

export class SummaryService {
  async summarizePDF(content: string, options?: SummaryRequest['options']): Promise<string> {
    try {
      const format = options?.format === 'bullet' ? 'bullet points' : 'paragraphs';
      const prompt = `Summarize this PDF content in ${format}. Focus on key points and main ideas:\n\n${content}`;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content || 'No summary generated';
    } catch (error) {
      console.error('PDF summary error:', error);
      throw new Error('Failed to summarize PDF');
    }
  }

  async summarizeYouTube(transcript: string, options?: SummaryRequest['options']): Promise<string> {
    try {
      const format = options?.format === 'bullet' ? 'bullet points' : 'paragraphs';
      const prompt = `Summarize this YouTube video transcript in ${format}. Highlight key concepts and main takeaways:\n\n${transcript}`;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content || 'No summary generated';
    } catch (error) {
      console.error('YouTube summary error:', error);
      throw new Error('Failed to summarize YouTube content');
    }
  }

  async summarizeAudio(transcript: string, options?: SummaryRequest['options']): Promise<string> {
    try {
      const format = options?.format === 'bullet' ? 'bullet points' : 'paragraphs';
      const prompt = `Summarize this audio transcript in ${format}. Focus on main points and key information:\n\n${transcript}`;
      
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      return completion.choices[0].message.content || 'No summary generated';
    } catch (error) {
      console.error('Audio summary error:', error);
      throw new Error('Failed to summarize audio content');
    }
  }
}