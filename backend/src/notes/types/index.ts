<<<<<<< HEAD
=======
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

>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
export interface CreateNoteRequest {
  title: string;
  content: string;
  source: {
<<<<<<< HEAD
    type: 'youtube' | 'pdf' | 'manual';
    originalContent?: string;
  };
=======
    type: 'pdf' | 'youtube' | 'audio' | 'manual';
    originalContent?: string;
  };
  tags?: string[];
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
<<<<<<< HEAD
  source?: {
    type: 'youtube' | 'pdf' | 'manual';
    originalContent?: string;
  };
=======
  tags?: string[];
>>>>>>> 68fc71fe460cb801080dbceba32a57732dacea6c
}
