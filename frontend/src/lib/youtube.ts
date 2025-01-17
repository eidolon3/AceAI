interface VideoInfo {
  title: string;
  transcript: string;
}

export async function getVideoInfo(url: string): Promise<VideoInfo> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  
  if (!apiKey) {
    throw new Error('YouTube API key not found. Please add VITE_YOUTUBE_API_KEY to your .env file');
  }

  try {
    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Get video details using YouTube Data API
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );
    
    if (!videoResponse.ok) {
      const errorData = await videoResponse.json().catch(() => ({}));
      if (errorData.error?.message) {
        throw new Error(`YouTube API error: ${errorData.error.message}`);
      }
      throw new Error(`Failed to fetch video data (HTTP ${videoResponse.status})`);
    }
    
    const videoData = await videoResponse.json();

    if (!videoData.items?.length) {
      throw new Error('Video not found or is private');
    }

    const { title, description = '', tags = [] } = videoData.items[0].snippet;
    const duration = videoData.items[0].contentDetails.duration;

    // Combine metadata into a structured format for better processing
    const transcript = `
Title: ${title}

Duration: ${formatDuration(duration)}

Description:
${description}

Tags: ${tags.join(', ')}
    `.trim();

    return {
      title,
      transcript
    };
  } catch (error) {
    console.error('Failed to get video info:', error);
    if (error instanceof Error) {
      throw error; // Preserve the original error message
    }
    throw new Error('Failed to process YouTube video. Please try again.');
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function formatDuration(duration: string): string {
  // Convert ISO 8601 duration to human readable format
  // Example: PT1H2M10S -> 1 hour 2 minutes 10 seconds
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return 'Unknown duration';

  const [, hours, minutes, seconds] = matches;
  const parts = [];

  if (hours) parts.push(`${hours} hour${hours === '1' ? '' : 's'}`);
  if (minutes) parts.push(`${minutes} minute${minutes === '1' ? '' : 's'}`);
  if (seconds) parts.push(`${seconds} second${seconds === '1' ? '' : 's'}`);

  return parts.join(' ') || 'Unknown duration';
}