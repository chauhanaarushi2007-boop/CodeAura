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
        id: 'clean-code',
        title: 'Clean Code',
        author: 'Robert C. Martin',
        imageId: 'book-clean-code',
        description: 'A handbook of agile software craftsmanship that teaches the principles and practices of writing clean, maintainable code.',
        language: 'java',
    },
    {
        id: 'pragmatic-programmer',
        title: 'The Pragmatic Programmer',
        author: 'David Thomas, Andrew Hunt',
        imageId: 'book-pragmatic',
        description: 'This classic examines the core of software development, from personal responsibility to architectural techniques, to write better software.',
        language: 'python',
    },
    {
        id: 'sicp',
        title: 'Structure and Interpretation of Computer Programs (SICP)',
        author: 'Harold Abelson, Gerald Jay Sussman',
        imageId: 'book-sicp',
        description: 'A foundational text in computer science that teaches fundamental principles of programming, including recursion, abstraction, and modularity.',
        language: 'javascript',
    },
    {
        id: 'effective-java',
        title: 'Effective Java',
        author: 'Joshua Bloch',
        imageId: 'book-java',
        description: 'A must-read for every Java developer, this book offers 78 indispensable programmer\'s rules of thumb for writing better, more robust code.',
        language: 'java',
    },
    {
        id: 'design-patterns-gof',
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
        imageId: 'book-gof',
        description: 'The seminal "Gang of Four" book that introduces 23 fundamental design patterns for creating flexible and reusable object-oriented software.',
        language: 'cpp',
    },
    {
        id: 'c-programming-language',
        title: 'The C Programming Language',
        author: 'Brian W. Kernighan, Dennis M. Ritchie',
        imageId: 'book-c',
        description: 'The definitive book on the C language, written by its creators. A concise and classic text for learning C.',
        language: 'c',
    },
    {
        id: 'eloquent-js',
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        imageId: 'book-js',
        description: 'A modern introduction to programming, diving deep into the JavaScript language, from basics to advanced topics like Node.js.',
        language: 'javascript',
    },
    {
        id: 'fluent-python',
        title: 'Fluent Python',
        author: 'Luciano Ramalho',
        imageId: 'book-python',
        description: 'An in-depth guide for intermediate to advanced Python programmers on how to write effective, idiomatic Python code by leveraging its best features.',
        language: 'python',
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
