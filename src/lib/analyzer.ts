// Static Code Analyzer for CodeChef Lite
// Performs static analysis without code execution for security

export type Language = "Python" | "C" | "Java";
export type SubmissionStatus = "Correct" | "Partially Correct" | "Needs Improvement";

export interface AnalysisResult {
  topics: string[];
  accuracy: number;
  feedback: string;
  status: SubmissionStatus;
  recommendation: string;
}

// Language-specific syntax patterns
const syntaxPatterns = {
  Python: {
    output: /print\s*\(/,
    addition: /\+/,
    modulo: /%/,
    conditional: /if\s+/,
    input: /input\s*\(/,
    variable: /\w+\s*=/,
    function: /def\s+\w+/,
    comparison: /==|!=|<=|>=|<|>/,
    loop: /for\s+|while\s+/,
    multiplication: /\*/,
    range: /range\s*\(/,
  },
  C: {
    output: /printf\s*\(/,
    addition: /\+/,
    modulo: /%/,
    conditional: /if\s*\(/,
    input: /scanf\s*\(/,
    variable: /int\s+\w+|float\s+\w+|char\s+\w+|long\s+\w+/,
    function: /void\s+\w+|int\s+\w+\s*\(/,
    comparison: /==|!=|<=|>=|<|>/,
    main: /int\s+main\s*\(/,
    loop: /for\s*\(|while\s*\(/,
    multiplication: /\*/,
  },
  Java: {
    output: /System\.out\.println\s*\(|System\.out\.print\s*\(/,
    addition: /\+/,
    modulo: /%/,
    conditional: /if\s*\(/,
    input: /Scanner|nextInt|nextLine/,
    variable: /int\s+\w+|String\s+\w+|double\s+\w+|long\s+\w+/,
    function: /public\s+static|void\s+\w+/,
    comparison: /==|!=|<=|>=|<|>/,
    class: /class\s+\w+/,
    loop: /for\s*\(|while\s*\(/,
    multiplication: /\*/,
  },
};

// Topic detection based on syntax
const detectTopics = (code: string, language: Language): string[] => {
  const topics: string[] = [];
  const patterns = syntaxPatterns[language];

  if (patterns.output.test(code)) topics.push("Output Operations");
  if (patterns.addition.test(code)) topics.push("Arithmetic Operators");
  if (patterns.modulo.test(code)) topics.push("Modulo Operator");
  if (patterns.conditional.test(code)) topics.push("Conditional Statements");
  if (patterns.input?.test(code)) topics.push("Input Handling");
  if (patterns.variable?.test(code)) topics.push("Variable Declaration");
  if (patterns.comparison?.test(code)) topics.push("Comparison Operators");
  if (patterns.loop?.test(code)) topics.push("Loops");
  if (patterns.multiplication?.test(code)) topics.push("Multiplication");

  return topics.length > 0 ? topics : ["Basic Syntax"];
};

// Problem-specific analysis
interface ProblemRequirements {
  requiredPatterns: RegExp[];
  optionalPatterns: RegExp[];
  problemType: string;
}

const getAddTwoNumbersRequirements = (language: Language): ProblemRequirements => {
  switch (language) {
    case "Python":
      return {
        requiredPatterns: [/print\s*\(/, /\+/],
        optionalPatterns: [/input\s*\(/, /int\s*\(/],
        problemType: "addition",
      };
    case "C":
      return {
        requiredPatterns: [/printf\s*\(/, /\+/],
        optionalPatterns: [/scanf\s*\(/, /int\s+main/],
        problemType: "addition",
      };
    case "Java":
      return {
        requiredPatterns: [/System\.out\.print/, /\+/],
        optionalPatterns: [/Scanner/, /class/],
        problemType: "addition",
      };
  }
};

const getEvenOddRequirements = (language: Language): ProblemRequirements => {
  switch (language) {
    case "Python":
      return {
        requiredPatterns: [/print\s*\(/, /%/, /if\s+/],
        optionalPatterns: [/else/, /==\s*0/],
        problemType: "evenOdd",
      };
    case "C":
      return {
        requiredPatterns: [/printf\s*\(/, /%/, /if\s*\(/],
        optionalPatterns: [/else/, /==\s*0/],
        problemType: "evenOdd",
      };
    case "Java":
      return {
        requiredPatterns: [/System\.out\.print/, /%/, /if\s*\(/],
        optionalPatterns: [/else/, /==\s*0/],
        problemType: "evenOdd",
      };
  }
};

const getFizzBuzzRequirements = (language: Language): ProblemRequirements => {
  switch (language) {
    case "Python":
      return {
        requiredPatterns: [/print\s*\(/, /%/, /if\s+/, /for\s+|while\s+/],
        optionalPatterns: [/elif|else/, /range\s*\(/, /fizz|buzz/i],
        problemType: "fizzbuzz",
      };
    case "C":
      return {
        requiredPatterns: [/printf\s*\(/, /%/, /if\s*\(/, /for\s*\(|while\s*\(/],
        optionalPatterns: [/else/, /fizz|buzz/i],
        problemType: "fizzbuzz",
      };
    case "Java":
      return {
        requiredPatterns: [/System\.out\.print/, /%/, /if\s*\(/, /for\s*\(|while\s*\(/],
        optionalPatterns: [/else/, /fizz|buzz/i],
        problemType: "fizzbuzz",
      };
  }
};

const getFactorialRequirements = (language: Language): ProblemRequirements => {
  switch (language) {
    case "Python":
      return {
        requiredPatterns: [/print\s*\(/, /\*/, /for\s+|while\s+|\w+\s*\(/],
        optionalPatterns: [/range\s*\(/, /def\s+/, /return/],
        problemType: "factorial",
      };
    case "C":
      return {
        requiredPatterns: [/printf\s*\(/, /\*/, /for\s*\(|while\s*\(/],
        optionalPatterns: [/long/, /int\s+\w+\s*\(/],
        problemType: "factorial",
      };
    case "Java":
      return {
        requiredPatterns: [/System\.out\.print/, /\*/, /for\s*\(|while\s*\(/],
        optionalPatterns: [/long/, /static\s+\w+\s+\w+\s*\(/],
        problemType: "factorial",
      };
  }
};

// Calculate accuracy based on pattern matching
const calculateAccuracy = (
  code: string,
  requirements: ProblemRequirements
): number => {
  let score = 0;
  const totalRequired = requirements.requiredPatterns.length;
  const totalOptional = requirements.optionalPatterns.length;

  // Required patterns worth 70% of score
  let requiredMatches = 0;
  for (const pattern of requirements.requiredPatterns) {
    if (pattern.test(code)) requiredMatches++;
  }
  score += (requiredMatches / totalRequired) * 70;

  // Optional patterns worth 30% of score
  let optionalMatches = 0;
  for (const pattern of requirements.optionalPatterns) {
    if (pattern.test(code)) optionalMatches++;
  }
  if (totalOptional > 0) {
    score += (optionalMatches / totalOptional) * 30;
  } else {
    score += 30; // Full score if no optional patterns
  }

  // Bonus for code length (indicates effort)
  const codeLines = code.trim().split("\n").filter(line => line.trim()).length;
  if (codeLines >= 3) score = Math.min(100, score + 5);

  return Math.round(Math.min(100, Math.max(0, score)));
};

// Generate human-like feedback
const generateFeedback = (
  accuracy: number,
  topics: string[],
  language: Language,
  problemType: string
): string => {
  const problemDescriptions: Record<string, string> = {
    addition: "addition",
    evenOdd: "even/odd check",
    fizzbuzz: "FizzBuzz",
    factorial: "factorial calculation",
  };

  const desc = problemDescriptions[problemType] || problemType;

  if (accuracy >= 85) {
    return `Excellent work! Your ${language} code demonstrates strong understanding of ${topics.slice(0, 2).join(" and ")}. The ${desc} logic is clean and well-structured. Keep up the great coding practice!`;
  } else if (accuracy >= 60) {
    return `Good attempt! You've correctly implemented core ${desc} logic. Consider adding proper input handling and ensuring all edge cases are covered. Your understanding of ${topics[0]} is solid.`;
  } else if (accuracy >= 40) {
    return `You're on the right track! The basic structure is there, but some key elements are missing. Focus on implementing the complete ${desc} operation. Review ${language} syntax for loops and conditions.`;
  } else {
    return `Keep practicing! Your code needs more work on the core logic. Make sure to include the essential operators and control structures for ${desc}. Don't give up - every expert was once a beginner!`;
  }
};

// Generate next step recommendation
const generateRecommendation = (
  accuracy: number,
  topics: string[],
  problemType: string
): string => {
  const nextProblems: Record<string, string> = {
    addition: "Try the Even or Odd problem next to practice conditional statements!",
    evenOdd: "Try the FizzBuzz problem to combine loops with conditionals!",
    fizzbuzz: "Try the Factorial problem to practice loops and multiplication!",
    factorial: "Great job! You've completed all problems. Try optimizing your solutions or exploring recursion.",
  };

  if (accuracy >= 85) {
    return nextProblems[problemType] || "Explore more complex problems involving data structures and algorithms.";
  } else if (accuracy >= 60) {
    return `Strengthen your understanding of ${topics[0]}. Try rewriting the solution with different approaches to deepen your knowledge.`;
  } else if (accuracy >= 40) {
    return `Review the basics of ${problemType === "fizzbuzz" ? "loops and conditionals" : problemType === "factorial" ? "loops and multiplication" : "operators and conditions"}. Practice with simpler examples before attempting this problem again.`;
  } else {
    return `Start with basic syntax tutorials for your chosen language. Focus on understanding print statements, variables, and basic operators before solving problems.`;
  }
};

// Determine submission status
const determineStatus = (accuracy: number): SubmissionStatus => {
  if (accuracy >= 75) return "Correct";
  if (accuracy >= 45) return "Partially Correct";
  return "Needs Improvement";
};

// Main analysis function
export const analyzeCode = (
  code: string,
  language: Language,
  problemId: "add-two-numbers" | "even-or-odd" | "fizzbuzz" | "factorial"
): AnalysisResult => {
  // Get problem-specific requirements
  let requirements: ProblemRequirements;
  switch (problemId) {
    case "add-two-numbers":
      requirements = getAddTwoNumbersRequirements(language);
      break;
    case "even-or-odd":
      requirements = getEvenOddRequirements(language);
      break;
    case "fizzbuzz":
      requirements = getFizzBuzzRequirements(language);
      break;
    case "factorial":
      requirements = getFactorialRequirements(language);
      break;
    default:
      requirements = getAddTwoNumbersRequirements(language);
  }

  // Detect topics used in code
  const topics = detectTopics(code, language);

  // Calculate accuracy score
  const accuracy = calculateAccuracy(code, requirements);

  // Determine submission status
  const status = determineStatus(accuracy);

  // Generate feedback
  const feedback = generateFeedback(
    accuracy,
    topics,
    language,
    requirements.problemType
  );

  // Generate recommendation
  const recommendation = generateRecommendation(
    accuracy,
    topics,
    requirements.problemType
  );

  return {
    topics,
    accuracy,
    feedback,
    status,
    recommendation,
  };
};
