import type { Language } from './types';

type TutorialContent = {
  overview: string;
  keyConcepts: { title: string; description: string }[];
  example: { code: string; explanation: string };
  resources: {
    officialDocs: string;
    links: { title:string; url: string; type: 'video' | 'article' | 'interactive' }[];
  };
};

export const tutorialData: Record<Language['id'], TutorialContent> = {
  html: {
    overview: 'HTML (HyperText Markup Language) is the backbone of the web. It structures content using elements like headings, paragraphs, images, and links, which are the building blocks of all websites.',
    keyConcepts: [
      { title: 'Elements & Tags', description: 'HTML uses tags (e.g., `<p>`) to create elements. Most tags come in pairs: an opening tag and a closing tag (e.g., `</p>`).' },
      { title: 'Attributes', description: 'Attributes like `href` in `<a href="...">` or `src` in `<img src="...">` provide additional information about elements.' },
      { title: 'Document Structure', description: 'A standard HTML document includes `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>` sections to define its structure and metadata.' },
      { title: 'Semantics', description: 'Using tags like `<header>`, `<footer>`, `<article>`, and `<nav>` gives meaning to your content, which is important for accessibility and SEO.' },
    ],
    example: {
      code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph.</p>
</body>
</html>`,
      explanation: 'This is a basic HTML document structure. It defines the page title, a main heading, and a paragraph of text.',
    },
    resources: {
      officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      links: [
        { title: 'HTML Full Course', url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE', type: 'video' },
        { title: 'W3Schools HTML Tutorial', url: 'https://www.w3schools.com/html/', type: 'interactive' },
        { title: 'freeCodeCamp - HTML', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', type: 'interactive' },
      ],
    },
  },
  css: {
    overview: 'CSS (Cascading Style Sheets) is the language used to style the visual presentation of a web page. It controls colors, fonts, layout, and spacing, bringing a design to life.',
    keyConcepts: [
      { title: 'Selectors', description: 'Selectors (e.g., `h1`, `.class`, `#id`) target HTML elements to apply styles to them.' },
      { title: 'Properties & Values', description: 'CSS rules consist of properties (e.g., `color`) and values (e.g., `blue`) that define the style.' },
      { title: 'The Box Model', description: 'Every HTML element is a rectangular box, with content, padding, border, and margin. Understanding this is key to layout.' },
      { title: 'Flexbox & Grid', description: 'Modern CSS layout systems that provide powerful and flexible ways to arrange elements on a page.' },
    ],
    example: {
      code: `body {
  font-family: sans-serif;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}`,
      explanation: 'This CSS code sets a background color and default font for the page, and then styles all `<h1>` headings to be dark grey and centered.',
    },
    resources: {
      officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      links: [
        { title: 'CSS Full Course', url: 'https://www.youtube.com/watch?v=v1e1-R0p4-w', type: 'video' },
        { title: 'CSS-Tricks', url: 'https://css-tricks.com/', type: 'article' },
        { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', type: 'interactive' },
      ],
    },
  },
  javascript: {
    overview: "JavaScript is a versatile programming language that brings interactivity to websites. It runs in the browser and can manipulate a page's content, handle events, and communicate with servers.",
    keyConcepts: [
      { title: 'Variables & Data Types', description: 'Store data using variables (`let`, `const`) with types like strings, numbers, booleans, and objects.' },
      { title: 'Functions', description: 'Reusable blocks of code that perform a specific task.' },
      { title: 'DOM Manipulation', description: 'The Document Object Model (DOM) is a tree-like representation of the page. JavaScript can add, remove, and change HTML elements and styles.' },
      { title: 'Asynchronous Programming', description: 'Handle operations like fetching data from a server without blocking the main thread, using Promises and `async/await`.' },
    ],
    example: {
      code: `document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.onclick = () => alert('Hello, CodeAura!');
  document.body.appendChild(button);
});`,
      explanation: "This script waits for the page to load, then creates a button. When clicked, the button shows an alert message.",
    },
    resources: {
      officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      links: [
        { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'interactive' },
        { title: 'freeCodeCamp - JS Algorithms & Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/', type: 'interactive' },
        { title: 'JavaScript Full Course', url: 'https://www.youtube.com/watch?v=jS4aFq5-91M', type: 'video' },
      ],
    },
  },
  python: {
    overview: 'Python is a high-level, interpreted programming language known for its simple, readable syntax. It is widely used in web development, data science, automation, and artificial intelligence.',
    keyConcepts: [
      { title: 'Readable Syntax', description: 'Python uses whitespace indentation, rather than curly braces or keywords, to delimit blocks, making code clean and easy to read.' },
      { title: 'Data Structures', description: 'Built-in data structures like lists, tuples, dictionaries, and sets are powerful and easy to use.' },
      { title: 'Extensive Standard Library', description: 'Python comes with a large library of modules for tasks ranging from working with strings to handling network protocols.' },
      { title: 'Dynamic Typing', description: "You don't need to declare a variable's type. The type is inferred at runtime." },
    ],
    example: {
      code: `def greet(name):
  return f"Hello, {name}!"

print(greet("CodeAura"))`,
      explanation: 'This code defines a function `greet` that takes a name and returns a greeting string. It then calls the function and prints the result.',
    },
    resources: {
      officialDocs: 'https://docs.python.org/3/',
      links: [
        { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', type: 'article' },
        { title: 'Python Full Course', url: 'https://www.youtube.com/watch?v=eWRfhZUzrAc', type: 'video' },
        { title: 'Real Python', url: 'https://realpython.com/', type: 'interactive' },
      ],
    },
  },
  java: {
    overview: 'Java is a class-based, object-oriented programming language designed to be portable and run on any platform with a Java Virtual Machine (JVM). It is widely used for enterprise-level applications, Android apps, and large systems.',
    keyConcepts: [
      { title: 'Object-Oriented', description: 'Everything in Java is an object. It follows principles of encapsulation, inheritance, and polymorphism.' },
      { title: 'Statically Typed', description: 'All variables must be declared with a data type before they can be used, which helps catch errors early.' },
      { title: 'Platform Independent', description: 'Java code is compiled into bytecode that can run on any device with a JVM ("Write Once, Run Anywhere").' },
      { title: 'Garbage Collection', description: 'Java automatically manages memory, freeing up objects that are no longer in use.' },
    ],
    example: {
      code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, CodeAura!");
    }
}`,
      explanation: 'This is the classic "Hello, World!" program in Java. The `main` method is the entry point of the program, and `System.out.println` prints text to the console.',
    },
    resources: {
      officialDocs: 'https://docs.oracle.com/en/java/',
      links: [
        { title: 'Baeldung - Java Tutorials', url: 'https://www.baeldung.com/java-tutorial', type: 'article' },
        { title: 'Java Full Course', url: 'https://www.youtube.com/watch?v=A74TOX803D0', type: 'video' },
        { title: 'Codecademy - Learn Java', url: 'https://www.codecademy.com/learn/learn-java', type: 'interactive' },
      ],
    },
  },
  go: {
    overview: 'Go, also known as Golang, is a statically typed, compiled language designed at Google. It is known for its simplicity, efficiency, and strong support for concurrent programming.',
    keyConcepts: [
      { title: 'Concurrency', description: 'Go makes it easy to write concurrent programs using goroutines (lightweight threads) and channels (for communication between goroutines).' },
      { title: 'Simplicity', description: 'Go has a small, simple syntax with a limited number of keywords, making it easy to learn and read.' },
      { title: 'Compiled Language', description: 'Go code is compiled to a single binary, which is fast and easy to deploy.' },
      { title: 'Static Typing', description: 'Variables are statically typed, which helps catch errors at compile time.' },
    ],
    example: {
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, CodeAura!")
}`,
      explanation: 'A basic "Hello, World!" program in Go. The `main` function in the `main` package is the entry point.',
    },
    resources: {
      officialDocs: 'https://go.dev/doc/',
      links: [
        { title: 'A Tour of Go', url: 'https://go.dev/tour/', type: 'interactive' },
        { title: 'Go by Example', url: 'https://gobyexample.com/', type: 'article' },
        { title: 'Go Full Course', url: 'https://www.youtube.com/watch?v=un6ZyFkqFKo', type: 'video' },
      ],
    },
  },
  c: {
    overview: 'C is a powerful, general-purpose programming language. It is one of the oldest and most widely used languages, known for its performance and for providing low-level access to memory.',
    keyConcepts: [
      { title: 'Pointers', description: 'C allows direct memory manipulation through pointers, which are variables that store memory addresses.' },
      { title: 'Manual Memory Management', description: 'Developers are responsible for manually allocating and deallocating memory using functions like `malloc()` and `free()`.' },
      { title: 'Performance', description: 'As a compiled language with low-level capabilities, C is extremely fast and efficient.' },
      { title: 'Procedural Language', description: 'C follows a procedural programming paradigm, organizing code into functions.' },
    ],
    example: {
      code: `#include <stdio.h>

int main() {
    printf("Hello, CodeAura!\\n");
    return 0;
}`,
      explanation: 'The standard "Hello, World!" in C. The `#include <stdio.h>` line includes the standard input/output library.',
    },
    resources: {
      officialDocs: 'https://devdocs.io/c/',
      links: [
        { title: 'Learn C', url: 'https://www.learn-c.org/', type: 'interactive' },
        { title: 'C Programming Full Course', url: 'https://www.youtube.com/watch?v=KJgsSAhyvas', type: 'video' },
        { title: 'GeeksforGeeks C Tutorial', url: 'https://www.geeksforgeeks.org/c-programming-language/', type: 'article' },
      ],
    },
  },
  cpp: {
    overview: 'C++ is a high-level, general-purpose programming language created as an extension of C. It introduces object-oriented features and is widely used for game development, high-performance computing, and system software.',
    keyConcepts: [
      { title: 'Object-Oriented', description: 'C++ supports classes, inheritance, polymorphism, and encapsulation.' },
      { title: 'Standard Template Library (STL)', description: 'A rich library of template classes and functions for common data structures and algorithms.' },
      { title: 'RAII (Resource Acquisition Is Initialization)', description: 'A core C++ idiom that manages resource lifetime (like memory or file handles) through object lifetime.' },
      { title: 'Performance', description: 'Like C, C++ offers high performance and low-level memory control.' },
    ],
    example: {
      code: `#include <iostream>

int main() {
    std::cout << "Hello, CodeAura!" << std::endl;
    return 0;
}`,
      explanation: 'The "Hello, World!" program in C++, using the iostream library for console output.',
    },
    resources: {
      officialDocs: 'https://isocpp.org/',
      links: [
        { title: 'Learn C++', url: 'https://www.learncpp.com/', type: 'article' },
        { title: 'C++ Full Course', url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y', type: 'video' },
        { title: 'GeeksforGeeks C++ Tutorial', url: 'https://www.geeksforgeeks.org/c-plus-plus/', type: 'article' },
      ],
    },
  },
  php: {
    overview: 'PHP is a popular general-purpose scripting language that is especially suited to web development. It can be embedded directly into HTML and is known for its simplicity and large community.',
    keyConcepts: [
      { title: 'Server-Side Scripting', description: 'PHP code is executed on the server, generating HTML which is then sent to the client.' },
      { title: 'Weak Typing', description: 'You do not have to declare the data type of a variable in advance; PHP converts types automatically as needed.' },
      { title: 'Database Integration', description: 'PHP has excellent support for connecting to and interacting with databases, especially MySQL.' },
      { title: 'Frameworks', description: 'Powerful frameworks like Laravel and Symfony provide structure and help build complex applications quickly.' },
    ],
    example: {
      code: `<!DOCTYPE html>
<html>
<head>
  <title>PHP Test</title>
</head>
<body>
  <?php echo "<h1>Hello, CodeAura!</h1>"; ?>
</body>
</html>`,
      explanation: 'This shows PHP code embedded within an HTML document. The server will process the `<?php ... ?>` block and replace it with its output.',
    },
    resources: {
      officialDocs: 'https://www.php.net/manual/en/',
      links: [
        { title: 'PHP The Right Way', url: 'https://phptherightway.com/', type: 'article' },
        { title: 'PHP Full Course', url: 'https://www.youtube.com/watch?v=zZ6vybT1HQs', type: 'video' },
        { title: 'W3Schools PHP Tutorial', url: 'https://www.w3schools.com/php/', type: 'interactive' },
      ],
    },
  },
  xml: {
    overview: 'XML (eXtensible Markup Language) is a markup language designed to store and transport data. Unlike HTML, XML tags are not predefined; you must define your own tags, making it flexible and self-describing.',
    keyConcepts: [
      { title: 'Self-Descriptive', description: 'XML uses human-readable tags that describe the data they contain.' },
      { title: 'Data Transport', description: 'XML is a common format for sharing data between different systems and applications.' },
      { title: 'Tree Structure', description: 'An XML document has a hierarchical structure with a single root element and nested child elements.' },
      { title: 'Strict Syntax', description: 'XML documents must be well-formed, with proper tag nesting, closing tags, and a single root element.' },
    ],
    example: {
      code: `<note>
  <to>Reader</to>
  <from>CodeAura</from>
  <heading>Reminder</heading>
  <body>Hello, CodeAura!</body>
</note>`,
      explanation: 'This is a simple XML document representing a note, with custom tags like `<to>`, `<from>`, and `<body>` to structure the data.',
    },
    resources: {
      officialDocs: 'https://www.w3.org/XML/',
      links: [
        { title: 'XML Tutorial - W3Schools', url: 'https://www.w3schools.com/xml/', type: 'interactive' },
        { title: 'MDN - XML introduction', url: 'https://developer.mozilla.org/en-US/docs/Web/XML/XML_introduction', type: 'article' },
        { title: 'XML Full Course', url: 'https://www.youtube.com/watch?v=djT_t-Ue2xs', type: 'video' },
      ],
    },
  },
};
