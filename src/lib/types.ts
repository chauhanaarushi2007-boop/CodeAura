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
