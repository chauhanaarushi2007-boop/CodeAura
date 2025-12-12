import type { Language, Book, Quiz, WebsiteReference } from './types';

export const languages: Language[] = [
  { id: 'html', name: 'HTML', description: 'The standard markup language for creating web pages.' },
  { id: 'css', name: 'CSS', description: 'The language for describing the presentation of Web pages.' },
  { id: 'javascript', name: 'JavaScript', description: 'A programming language that makes web pages interactive.' },
  { id: 'python', name: 'Python', description: 'A high-level, general-purpose programming language.' },
  { id: 'java', name: 'Java', description: 'A class-based, object-oriented programming language.' },
  { id: 'go', name: 'Go', description: 'A statically typed, compiled programming language designed at Google.'},
  { id: 'c', name: 'C', description: 'A general-purpose, procedural computer programming language.' },
  { id: 'cpp', name: 'C++', description: 'A high-level, general-purpose programming language created as an extension of C.' },
  { id: 'php', name: 'PHP', description: 'A general-purpose scripting language especially suited to web development.' },
  { id: 'xml', name: 'XML', description: 'A markup language that defines a set of rules for encoding documents.' },
];

export const books: Book[] = [
    {
        id: 'eloquent-js',
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        imageId: 'book-js',
        description: 'A modern introduction to programming, focusing on JavaScript.',
        language: 'javascript',
    },
    {
        id: 'python-crash-course',
        title: 'Python Crash Course',
        author: 'Eric Matthes',
        imageId: 'book-python',
        description: "A fast-paced, thorough introduction to Python that will have you writing programs in no time.",
        language: 'python',
    },
    {
        id: 'deep-learning-python',
        title: 'Deep Learning with Python',
        author: 'François Chollet',
        imageId: 'book-ai-1',
        description: "A hands-on guide to deep learning with the Keras library, written by its creator.",
        language: 'python',
    },
    {
        id: 'head-first-java',
        title: 'Head First Java',
        author: 'Kathy Sierra & Bert Bates',
        imageId: 'book-java',
        description: 'A brain-friendly guide to learning the Java language.',
        language: 'java',
    },
    {
        id: 'hands-on-ml',
        title: 'Hands-On Machine Learning',
        author: 'Aurélien Géron',
        imageId: 'book-ai-2',
        description: 'A practical guide to machine learning using Scikit-Learn, Keras, and TensorFlow.',
        language: 'python',
    },
    {
        id: 'cpp-primer',
        title: 'C++ Primer',
        author: 'Stanley B. Lippman',
        imageId: 'book-cpp',
        description: 'A comprehensive and authoritative introduction to C++.',
        language: 'cpp',
    },
    {
        id: 'html-css-dd',
        title: 'HTML and CSS: Design and Build Websites',
        author: 'Jon Duckett',
        imageId: 'book-html-css',
        description: 'A visually rich introduction to HTML and CSS, perfect for beginners.',
        language: 'html',
    },
    {
        id: 'php-mysql-dd',
        title: 'PHP and MySQL: Server-side Web Development',
        author: 'Jon Duckett',
        imageId: 'book-php',
        description: 'Learn PHP and MySQL to create dynamic, database-driven websites.',
        language: 'php',
    }
];

export const websites: WebsiteReference[] = [
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/',
    description: 'A comprehensive resource for programming, algorithms, data structures, and computer science subjects.',
    icon: 'BrainCircuit',
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/',
    description: 'The largest online community for developers to learn, share their knowledge, and build their careers.',
    icon: 'Network',
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/',
    description: 'A non-profit organization that consists of an interactive learning web platform and online community.',
    icon: 'Code',
  },
  {
    id: 'mdn-web-docs',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org/',
    description: 'A valuable resource for developers, maintained by Mozilla, providing in-depth documentation for web technologies.',
    icon: 'BookOpen',
  },
  {
    id: 'w3schools',
    name: 'W3Schools',
    url: 'https://www.w3schools.com/',
    description: 'A popular web developers site, with tutorials and references on web development languages.',
    icon: 'School',
  },
];

export { quizData } from './quiz-data';
