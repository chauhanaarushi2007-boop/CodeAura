export type Language = {
  id: 'html' | 'css' | 'javascript' | 'python' | 'java' | 'c' | 'cpp' | 'php' | 'xml' | 'go';
  name: string;
  description: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  imageId: string;
  description: string;
  language: Language['id'];
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
  icon: 'BrainCircuit' | 'Network' | 'Code' | 'BookOpen' | 'School';
};

export type CertificatePlatform = {
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
  logo: string; // URL to the logo
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
};
