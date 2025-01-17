import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Debug log
console.log('YouTube router loaded');

router.post('/transcribe', async (req, res) => {
  console.log('Received transcribe request');

  try {
    const { url } = req.body;

    if (!url) {
      console.log('No URL provided');
      return res.status(400).json({ error: 'URL is required' });
    }

    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.log('Invalid YouTube URL:', url);
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    console.log('Processing video ID:', videoId);

    // Get transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map(part => part.text).join(' ');

    console.log('Transcript length:', fullText.length);

    // Generate summary using OpenAI
    const summary = await generateSummary(fullText);

    console.log('Summary generated successfully');

    res.json({
      success: true,
      data: {
        transcript: fullText,
        summary,
        videoId,
      }
    });

  } catch (error) {
    console.error('YouTube processing error:', error);
    res.status(500).json({ 
      error: 'Failed to process YouTube video',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
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