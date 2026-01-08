

export type Language = {
  id: 'html' | 'css' | 'javascript' | 'python' | 'java' | 'c' | 'cpp' | 'php' | 'xml' | 'go' | 'csharp' | 'rust' | 'ruby' | 'swift';
  name: string;
  description: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  url: string;
};

export type BookCategory = {
  id: string;
  title: string;
  imageHint: string;
  books: Book[];
};


export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
}

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type WebsiteReference = {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: 'Brain' | 'Network' | 'Code' | 'BookOpen' | 'School';
};

export type CertificatePlatform = {
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
};

export type Feedback = {
  id: string;
  name: string;
  message: string;
  rating: number;
  sentiment?: 'Positive' | 'Negative' | 'Neutral';
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export type Review = {
    id: string;
    name: string;
    message: string;
    rating: number;
    sentiment?: 'Positive' | 'Negative' | 'Neutral';
    createdAt: {
      seconds: number;
      nanoseconds: number;
    };
  };
