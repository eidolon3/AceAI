export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  source: {
    type: 'pdf' | 'youtube' | 'audio' | 'manual';
    originalContent?: string;
  };
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  source: {
    type: 'pdf' | 'youtube' | 'audio' | 'manual';
    originalContent?: string;
  };
  tags?: string[];
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  tags?: string[];
}
