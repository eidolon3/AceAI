import { YoutubeTranscript } from 'youtube-transcript';

export class YouTubeService {
  async getTranscript(url: string) {
    try {
      // Extract video ID from URL
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      // Get transcript
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      
      // Combine all text
      const text = transcript
        .map(item => item.text)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      return { text, videoId };
    } catch (error) {
      throw new Error('Failed to get transcript: ' + error.message);
    }
  }
} 