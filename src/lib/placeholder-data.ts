
import type { Language, Book, WebsiteReference, BookCategory } from './types';

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
  { id: 'csharp', name: 'C#', description: 'A modern, object-oriented, and type-safe programming language.'},
  { id: 'rust', name: 'Rust', description: 'A language empowered to create reliable and efficient software.'},
  { id: 'ruby', name: 'Ruby', description: 'A dynamic, open source programming language with a focus on simplicity and productivity.'},
  { id: 'swift', name: 'Swift', description: 'A powerful and intuitive programming language for iOS, iPadOS, macOS, tvOS, and watchOS.'},
];

export const bookCategories: BookCategory[] = [
  {
    id: 'python',
    title: 'Python',
    imageHint: 'abstract python code',
    books: [
      { id: 'automate-boring-stuff', title: 'Automate the Boring Stuff with Python', author: 'Al Sweigart', description: 'Beginner-friendly with practical projects.', url: 'https://automatetheboringstuff.com/' },
      { id: 'python-crash-course', title: 'Python Crash Course', author: 'Eric Matthes', description: 'Clean introduction + hands-on exercises.', url: 'https://www.amazon.com/Python-Crash-Course-3rd-Edition/dp/1718502702' },
      { id: 'fluent-python', title: 'Fluent Python', author: 'Luciano Ramalho', description: 'Advanced: idiomatic and effective Python.', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/' },
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    imageHint: 'abstract javascript code',
    books: [
      { id: 'eloquent-js', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', description: 'Excellent for both basic and advanced concepts.', url: 'https://eloquentjavascript.net/' },
      { id: 'ydkjs', title: 'You Don’t Know JS (Series)', author: 'Kyle Simpson', description: 'Deep dive into JavaScript mechanics.', url: 'https://github.com/getify/You-Dont-Know-JS' },
      { id: 'js-good-parts', title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', description: 'Focus on core language strengths.', url: 'https://www.oreilly.com/library/view/javascript-the-good/9780596517748/' },
    ],
  },
  {
    id: 'java',
    title: 'Java',
    imageHint: 'abstract java code',
    books: [
      { id: 'head-first-java', title: 'Head First Java', author: 'Kathy Sierra & Bert Bates', description: 'Engaging, conceptual learning.', url: 'https://www.oreilly.com/library/view/head-first-java/0596009208/' },
      { id: 'effective-java', title: 'Effective Java', author: 'Joshua Bloch', description: 'Must-read for real-world best practices.', url: 'https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997' },
      { id: 'java-beginners-guide', title: 'Java: A Beginner’s Guide', author: 'Herbert Schildt', description: 'Clear introduction.', url: 'https://www.amazon.com/Java-Beginners-Guide-Eighth-8th/dp/1260440214' },
    ],
  },
  {
    id: 'c',
    title: 'C',
    imageHint: 'abstract c code',
    books: [
      { id: 'c-programming-language', title: 'The C Programming Language', author: 'Brian W. Kernighan & Dennis M. Ritchie', description: 'Classic and authoritative.', url: 'https://www.amazon.com/Programming-Language-2nd-Brian-Kernighan/dp/0131103628' },
      { id: 'c-modern-approach', title: 'C Programming: A Modern Approach', author: 'K. N. King', description: 'Thorough and clear.', url: 'https://www.amazon.com/C-Programming-Modern-Approach-2nd/dp/0393979504' },
    ],
  },
  {
    id: 'cpp',
    title: 'C++',
    imageHint: 'abstract c++ code',
    books: [
      { id: 'cpp-primer', title: 'C++ Primer', author: 'Stanley B. Lippman, Josée Lajoie & Barbara E. Moo', description: 'Best for learning modern C++ (C++11 onward).', url: 'https://www.amazon.com/Primer-5th-Stanley-B-Lippman/dp/0321714113' },
      { id: 'effective-modern-cpp', title: 'Effective Modern C++', author: 'Scott Meyers', description: 'Deep dive into modern idioms.', url: 'https://www.oreilly.com/library/view/effective-modern-c/9781491908419/' },
    ],
  },
  {
    id: 'csharp',
    title: 'C#',
    imageHint: 'abstract csharp code',
    books: [
      { id: 'csharp-in-depth', title: 'C# in Depth', author: 'Jon Skeet', description: 'Great for understanding how C# works internally.', url: 'https://www.manning.com/books/c-sharp-in-depth-fourth-edition' },
      { id: 'head-first-csharp', title: 'Head First C#', author: 'Andrew Stellman & Jennifer Greene', description: 'Practical and engaging.', url: 'https://www.oreilly.com/library/view/head-first-c/9781449343507/' },
    ],
  },
  {
    id: 'go',
    title: 'Go (Golang)',
    imageHint: 'abstract go language code',
    books: [
      { id: 'go-programming-language', title: 'The Go Programming Language', author: 'Alan A. A. Donovan & Brian W. Kernighan', description: 'Definitive and readable.', url: 'https://www.gopl.io/' },
    ],
  },
  {
    id: 'rust',
    title: 'Rust',
    imageHint: 'abstract rust code',
    books: [
      { id: 'rust-programming-language', title: 'The Rust Programming Language', author: 'Steve Klabnik & Carol Nichols', description: 'The “Rust Book” — best for systems learning.', url: 'https://doc.rust-lang.org/book/' },
    ],
  },
  {
    id: 'ruby',
    title: 'Ruby',
    imageHint: 'abstract ruby code',
    books: [
      { id: 'well-grounded-rubyist', title: 'The Well-Grounded Rubyist', author: 'David A. Black', description: 'Clear explanation of Ruby idioms.', url: 'https://www.manning.com/books/the-well-grounded-rubyist-third-edition' },
      { id: 'programming-ruby', title: 'Programming Ruby', author: 'Dave Thomas', description: 'Comprehensive reference.', url: 'https://pragprog.com/titles/ruby5/programming-ruby-3-3-5th-edition/' },
    ],
  },
  {
    id: 'swift',
    title: 'Swift',
    imageHint: 'abstract swift code',
    books: [
      { id: 'swift-programming-bignerd', title: 'Swift Programming: The Big Nerd Ranch Guide', author: 'Matthew Mathias & John Gallagher', description: 'Practical approach to iOS/macOS dev.', url: 'https://www.bignerdranch.com/books/swift-programming-the-big-nerd-ranch-guide/' },
    ],
  },
  {
    id: 'ethical-hacking',
    title: 'Ethical Hacking',
    imageHint: 'ethical hacking cybersecurity',
    books: [
      { id: 'web-app-hackers-handbook', title: 'The Web Application Hacker’s Handbook', author: 'Dafydd Stuttard & Marcus Pinto', description: 'Deep exploration of web security and hacking techniques.', url: 'https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472' },
      { id: 'hacking-art-of-exploitation', title: 'Hacking: The Art of Exploitation', author: 'Jon Erickson', description: 'Great mix of theory & hands-on hacking.', url: 'https://nostarch.com/hacking2.htm' },
      { id: 'pen-testing-intro', title: 'Penetration Testing: A Hands-On Introduction to Hacking', author: 'Georgia Weidman', description: 'Beginner → intermediate practical guide.', url: 'https://nostarch.com/pentesting' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    imageHint: 'digital security cyber',
    books: [
      { id: 'cybersecurity-cyberwar', title: 'Cybersecurity and Cyberwar', author: 'P.W. Singer & Allan Friedman', description: 'Important strategic overview.', url: 'https://www.amazon.com/Cybersecurity-Cyberwar-What-Everyone-Needs/dp/0199918096' },
      { id: 'security-plus-guide', title: 'Security+ (SY0-601) Guide', author: 'Darril Gibson', description: 'Strong foundation for general cybersecurity concepts.', url: 'https://www.amazon.com/CompTIA-Security-Get-Certified-Ahead/dp/B08WH422S3' },
      { id: 'practical-malware-analysis', title: 'Practical Malware Analysis', author: 'Michael Sikorski & Andrew Honig', description: 'Learn malware techniques and reverse engineering.', url: 'https://nostarch.com/malware' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    imageHint: 'artificial intelligence brain',
    books: [
      { id: 'ai-modern-approach', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', description: 'The gold standard textbook for AI.', url: 'http://aima.cs.berkeley.edu/' },
      { id: 'ai-superpowers', title: 'AI Superpowers', author: 'Kai-Fu Lee', description: 'Industry and philosophical view (not technical).', url: 'https://www.amazon.com/AI-Superpowers-China-Silicon-Valley/dp/132854639X' },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    imageHint: 'machine learning data',
    books: [
      { id: 'hands-on-ml', title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', author: 'Aurélien Géron', description: 'Practical and project-oriented.', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/' },
      { id: 'pattern-recognition-ml', title: 'Pattern Recognition and Machine Learning', author: 'Christopher Bishop', description: 'Theoretical foundation.', url: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/' },
      { id: 'deep-learning', title: 'Deep Learning', author: 'Ian Goodfellow, Yoshua Bengio & Aaron Courville', description: 'Canonical deep learning reference.', url: 'https://www.deeplearningbook.org/' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science / Data Analysis',
    imageHint: 'data science graphs',
    books: [
      { id: 'data-science-from-scratch', title: 'Data Science from Scratch', author: 'Joel Grus', description: 'Build intuition starting from basics.', url: 'https://www.oreilly.com/library/view/data-science-from/9781492041122/' },
      { id: 'python-for-data-analysis', title: 'Python for Data Analysis', author: 'Wes McKinney', description: 'Great practical guide using pandas & NumPy.', url: 'https://wesmckinney.com/book/' },
    ],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering & Practices',
    imageHint: 'software engineering architecture',
    books: [
      { id: 'clean-code', title: 'Clean Code', author: 'Robert C. Martin (Uncle Bob)', description: 'Must-read for writing maintainable code.', url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882' },
      { id: 'pragmatic-programmer', title: 'The Pragmatic Programmer', author: 'Andrew Hunt & Dave Thomas', description: 'Best practices and mindset.', url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/' },
    ],
  },
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
