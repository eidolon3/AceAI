export interface CreateNoteRequest {
  title: string;
  content: string;
  source: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent?: string;
  };
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  source?: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent?: string;
  };
}
