export const quizzes = [
  {
    id: "html-css-basics",
    title: "HTML & CSS Basics",
    description: "Test your basic frontend knowledge covering HTML elements, CSS properties, and web fundamentals.",
    difficulty: "Easy",
    durationMinutes: 10,
    passingPercentage: 40,
    marksPerQuestion: 1,
    negativeMarking: true,
    negativeMarks: 0.25,
    perQuestionTime: null,
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Tool Multi Language",
          "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language",
        explanation:
          "HTML stands for Hyper Text Markup Language. It is the standard markup language used to create and structure content on web pages."
      },
      {
        id: "q2",
        type: "multi-select",
        question: "Which of the following are CSS frameworks?",
        options: ["Tailwind CSS", "Bootstrap", "React", "Laravel"],
        correctAnswers: ["Tailwind CSS", "Bootstrap"],
        explanation:
          "Tailwind CSS and Bootstrap are CSS frameworks. React is a JavaScript library for building UIs and Laravel is a PHP backend framework."
      },
      {
        id: "q3",
        type: "short-answer",
        question: "Which HTML tag is used to create a hyperlink?",
        correctAnswer: "a",
        acceptedAnswers: ["a", "<a>", "anchor"],
        explanation:
          "The anchor tag <a> is used to create hyperlinks in HTML. Example: <a href='https://example.com'>Link</a>"
      },
      {
        id: "q4",
        type: "mcq",
        question: "Which CSS property is used to change the text color of an element?",
        options: ["font-color", "text-color", "color", "foreground-color"],
        correctAnswer: "color",
        explanation:
          "The 'color' property in CSS is used to set the text color of an element. For example: color: red;"
      },
      {
        id: "q5",
        type: "multi-select",
        question: "Which of the following are valid CSS display values?",
        options: ["flex", "grid", "table", "stack"],
        correctAnswers: ["flex", "grid", "table"],
        explanation:
          "flex, grid, and table are valid CSS display values. 'stack' is not a standard CSS display value."
      },
      {
        id: "q6",
        type: "mcq",
        question: "What does the 'box-sizing: border-box' property do?",
        options: [
          "Includes padding and border in the element's total width and height",
          "Adds a border around every box element",
          "Makes the element's box invisible",
          "Only applies to inline elements"
        ],
        correctAnswer:
          "Includes padding and border in the element's total width and height",
        explanation:
          "box-sizing: border-box makes the width and height properties include padding and border, making layout calculations much easier."
      },
      {
        id: "q7",
        type: "short-answer",
        question: "What CSS property is used to make text bold?",
        correctAnswer: "font-weight",
        acceptedAnswers: ["font-weight", "font-weight: bold"],
        explanation:
          "The font-weight property is used to set the weight (boldness) of the font. Common values include 'bold', 'normal', or numeric values like 700."
      },
      {
        id: "q8",
        type: "mcq",
        question: "Which HTML element is used to define the largest heading?",
        options: ["<head>", "<h6>", "<h1>", "<heading>"],
        correctAnswer: "<h1>",
        explanation:
          "<h1> defines the largest and most important heading. HTML headings go from <h1> (largest) to <h6> (smallest)."
      },
      {
        id: "q9",
        type: "multi-select",
        question: "Which of the following are semantic HTML5 elements?",
        options: ["<article>", "<div>", "<nav>", "<span>"],
        correctAnswers: ["<article>", "<nav>"],
        explanation:
          "<article> and <nav> are semantic HTML5 elements that describe their content. <div> and <span> are generic containers with no semantic meaning."
      },
      {
        id: "q10",
        type: "mcq",
        question: "What is the correct CSS syntax to select an element with id 'header'?",
        options: [".header", "#header", "header", "*header"],
        correctAnswer: "#header",
        explanation:
          "In CSS, the # symbol is used to select an element by its id. So #header selects the element with id='header'."
      }
    ]
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Challenge yourself with core JavaScript concepts including variables, functions, arrays, and DOM manipulation.",
    difficulty: "Medium",
    durationMinutes: 15,
    passingPercentage: 50,
    marksPerQuestion: 2,
    negativeMarking: true,
    negativeMarks: 0.5,
    perQuestionTime: null,
    questions: [
      {
        id: "js1",
        type: "mcq",
        question: "Which keyword declares a block-scoped variable in JavaScript?",
        options: ["var", "let", "function", "define"],
        correctAnswer: "let",
        explanation:
          "'let' declares a block-scoped variable. 'var' is function-scoped, 'function' declares a function, and 'define' is not a JavaScript keyword."
      },
      {
        id: "js2",
        type: "multi-select",
        question: "Which of the following are JavaScript data types?",
        options: ["String", "Boolean", "Float", "Symbol"],
        correctAnswers: ["String", "Boolean", "Symbol"],
        explanation:
          "String, Boolean, and Symbol are JavaScript primitive types. JavaScript uses 'Number' for all numeric values (there is no separate Float type)."
      },
      {
        id: "js3",
        type: "short-answer",
        question: "What method is used to add an element to the end of an array?",
        correctAnswer: "push",
        acceptedAnswers: ["push", ".push()", "push()"],
        explanation:
          "The push() method adds one or more elements to the end of an array and returns the new length of the array."
      },
      {
        id: "js4",
        type: "mcq",
        question: "What does '===' operator do in JavaScript?",
        options: [
          "Assigns a value",
          "Compares value only",
          "Compares both value and type",
          "Logical AND"
        ],
        correctAnswer: "Compares both value and type",
        explanation:
          "The strict equality operator (===) checks both value and type without type coercion. For example, 5 === '5' is false."
      },
      {
        id: "js5",
        type: "mcq",
        question: "What is the output of: typeof null?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctAnswer: "'object'",
        explanation:
          "typeof null returns 'object' — this is a well-known bug in JavaScript that has existed since the first version and was never fixed for backward compatibility."
      },
      {
        id: "js6",
        type: "multi-select",
        question: "Which array methods do NOT mutate the original array?",
        options: ["map()", "splice()", "filter()", "sort()"],
        correctAnswers: ["map()", "filter()"],
        explanation:
          "map() and filter() return new arrays without modifying the original. splice() and sort() both mutate the original array in place."
      },
      {
        id: "js7",
        type: "short-answer",
        question: "What keyword is used to define an async function in JavaScript?",
        correctAnswer: "async",
        acceptedAnswers: ["async", "async function", "async/await"],
        explanation:
          "The 'async' keyword is placed before a function declaration to make it return a Promise. It's used with 'await' to handle asynchronous operations."
      },
      {
        id: "js8",
        type: "mcq",
        question: "Which method converts a JSON string to a JavaScript object?",
        options: [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.toObject()",
          "JSON.convert()"
        ],
        correctAnswer: "JSON.parse()",
        explanation:
          "JSON.parse() parses a JSON string and constructs the JavaScript value or object described by the string."
      },
      {
        id: "js9",
        type: "mcq",
        question: "What is a closure in JavaScript?",
        options: [
          "A function that closes the browser",
          "A function that has access to its outer scope even after the outer function returns",
          "A method to close a database connection",
          "A way to terminate a loop"
        ],
        correctAnswer:
          "A function that has access to its outer scope even after the outer function returns",
        explanation:
          "A closure is a function that retains access to variables from its lexical scope even when the function is executed outside that scope."
      },
      {
        id: "js10",
        type: "short-answer",
        question: "What DOM method is used to select an element by its ID?",
        correctAnswer: "getElementById",
        acceptedAnswers: [
          "getElementById",
          "document.getElementById",
          "document.getElementById()"
        ],
        explanation:
          "document.getElementById() returns the element with the specified ID attribute. It is one of the most commonly used DOM selection methods."
      }
    ]
  },
  {
    id: "react-essentials",
    title: "React Essentials",
    description: "Test your understanding of React core concepts: components, hooks, state management, and the virtual DOM.",
    difficulty: "Hard",
    durationMinutes: 12,
    passingPercentage: 60,
    marksPerQuestion: 3,
    negativeMarking: false,
    negativeMarks: 0,
    perQuestionTime: null,
    questions: [
      {
        id: "r1",
        type: "mcq",
        question: "What hook is used to manage state in a functional React component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: "useState",
        explanation:
          "useState is the primary hook for adding state to functional components. It returns a state variable and a setter function."
      },
      {
        id: "r2",
        type: "multi-select",
        question: "Which of the following are valid React hooks?",
        options: ["useFetch", "useEffect", "useRef", "useDOM"],
        correctAnswers: ["useEffect", "useRef"],
        explanation:
          "useEffect and useRef are built-in React hooks. useFetch and useDOM are not part of React's API (though custom hooks with these names could be created)."
      },
      {
        id: "r3",
        type: "short-answer",
        question: "What is the file extension for React components using JSX?",
        correctAnswer: "jsx",
        acceptedAnswers: ["jsx", ".jsx", "tsx", ".tsx"],
        explanation:
          "React components using JSX typically use the .jsx (or .tsx for TypeScript) file extension to indicate they contain JSX syntax."
      },
      {
        id: "r4",
        type: "mcq",
        question: "What does the Virtual DOM do in React?",
        options: [
          "Replaces the browser's DOM entirely",
          "Creates a lightweight copy of the real DOM to optimize updates",
          "Removes all DOM elements",
          "Directly manipulates the CSS styles"
        ],
        correctAnswer:
          "Creates a lightweight copy of the real DOM to optimize updates",
        explanation:
          "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to compute minimal changes and batch updates for better performance."
      },
      {
        id: "r5",
        type: "mcq",
        question: "How do you pass data from a parent component to a child in React?",
        options: [
          "Using global variables",
          "Using props",
          "Using localStorage",
          "Using CSS classes"
        ],
        correctAnswer: "Using props",
        explanation:
          "Props (short for properties) are the mechanism for passing data from parent to child components in React. They are read-only and flow downward."
      },
      {
        id: "r6",
        type: "multi-select",
        question: "Which statements about useEffect are correct?",
        options: [
          "It runs after every render by default",
          "It can return a cleanup function",
          "It replaces all lifecycle methods",
          "It can only be called once per component"
        ],
        correctAnswers: [
          "It runs after every render by default",
          "It can return a cleanup function"
        ],
        explanation:
          "useEffect runs after every render by default and can return a cleanup function. It can be called multiple times and doesn't replace all lifecycle methods."
      },
      {
        id: "r7",
        type: "short-answer",
        question:
          "What React hook is used to access a DOM element directly?",
        correctAnswer: "useRef",
        acceptedAnswers: ["useRef", "useRef()"],
        explanation:
          "useRef returns a mutable ref object whose .current property can hold a reference to a DOM element or any mutable value that persists across renders."
      },
      {
        id: "r8",
        type: "mcq",
        question: "What is JSX?",
        options: [
          "A JavaScript database",
          "A syntax extension that allows writing HTML-like code in JavaScript",
          "A new programming language",
          "A CSS preprocessor"
        ],
        correctAnswer:
          "A syntax extension that allows writing HTML-like code in JavaScript",
        explanation:
          "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. It gets compiled to React.createElement() calls."
      }
    ]
  }
];
