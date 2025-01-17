import { Router, Request, Response } from 'express';
import { YoutubeTranscript } from 'youtube-transcript';
import { OpenAI } from 'openai';

const router = Router();

// Check if OpenAI API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface TranscribeRequest {
  url: string;
}

interface TranscribeResponse {
  success: boolean;
  data?: {
    transcript: string;
    summary: string;
    videoId: string;
  };
  error?: string;
  details?: string;
}

router.post('/transcribe', (
  req: Request<{}, TranscribeResponse, TranscribeRequest>,
  res: Response<TranscribeResponse>
) => {
  console.log('Received transcribe request:', req.body);
  
  const handleTranscribe = async () => {
    try {
      const { url } = req.body;
      console.log('Processing URL:', url);

      if (!url) {
        console.log('No URL provided');
        return res.status(400).json({ 
          success: false, 
          error: 'URL is required' 
        });
      }

      const videoId = extractVideoId(url);
      console.log('Extracted video ID:', videoId);
      
      if (!videoId) {
        console.log('Invalid YouTube URL:', url);
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid YouTube URL' 
        });
      }

      console.log('Fetching transcript for video:', videoId);
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      const fullText = transcript.map(part => part.text).join(' ');
      console.log('Transcript length:', fullText.length);

      console.log('Generating summary...');
      const summary = await generateSummary(fullText);
      console.log('Summary generated, length:', summary.length);

      return res.json({
        success: true,
        data: {
          transcript: fullText,
          summary,
          videoId,
        }
      });

    } catch (error) {
      console.error('Detailed error:', error);
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      return res.status(500).json({ 
        success: false,
        error: 'Failed to process YouTube video',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  handleTranscribe().catch(error => {
    console.error('Unhandled promise rejection:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  });
});

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

async function generateSummary(text: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: "Create a detailed, well-structured summary of this video transcript. Include main points, key concepts, and important details. Use markdown formatting for better readability."
      },
      {
        role: "user",
        content: text
      }
    ],
    temperature: 0.3,
    max_tokens: 2000
  });

  return completion.choices[0]?.message?.content || 'Failed to generate summary';
}

export default router; 