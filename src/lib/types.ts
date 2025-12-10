export type Language = {
  id: 'html' | 'css' | 'javascript' | 'python' | 'java' | 'c' | 'cpp' | 'php' | 'xml' | 'go' | 'prompt-engineering' | 'ethical-hacking';
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
