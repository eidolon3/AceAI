export interface SummaryRequest {
  content: string;
  type: 'text' | 'pdf' | 'youtube' | 'audio';
  options?: {
    length?: 'short' | 'medium' | 'long';
    language?: string;
    format?: 'bullet' | 'paragraph';
  };
}

export interface SummaryResponse {
  summary: string;
  originalLength: number;
  summaryLength: number;
  timestamp: Date;
} 