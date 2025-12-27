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
  },
  C: {
    output: /printf\s*\(/,
    addition: /\+/,
    modulo: /%/,
    conditional: /if\s*\(/,
    input: /scanf\s*\(/,
    variable: /int\s+\w+|float\s+\w+|char\s+\w+/,
    function: /void\s+\w+|int\s+\w+\s*\(/,
    comparison: /==|!=|<=|>=|<|>/,
    main: /int\s+main\s*\(/,
  },
  Java: {
    output: /System\.out\.println\s*\(|System\.out\.print\s*\(/,
    addition: /\+/,
    modulo: /%/,
    conditional: /if\s*\(/,
    input: /Scanner|nextInt|nextLine/,
    variable: /int\s+\w+|String\s+\w+|double\s+\w+/,
    function: /public\s+static|void\s+\w+/,
    comparison: /==|!=|<=|>=|<|>/,
    class: /class\s+\w+/,
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
  if (accuracy >= 85) {
    return `Excellent work! Your ${language} code demonstrates strong understanding of ${topics.slice(0, 2).join(" and ")}. The logic is clean and well-structured. Keep up the great coding practice!`;
  } else if (accuracy >= 60) {
    return `Good attempt! You've correctly implemented the core ${problemType === "addition" ? "addition" : "conditional"} logic. Consider adding proper input handling and ensuring all edge cases are covered. Your understanding of ${topics[0]} is solid.`;
  } else if (accuracy >= 40) {
    return `You're on the right track! The basic structure is there, but some key elements are missing. Focus on implementing the complete ${problemType === "addition" ? "addition operation" : "modulo check for even/odd"}. Review ${language} syntax for output statements.`;
  } else {
    return `Keep practicing! Your code needs more work on the core logic. Make sure to include ${problemType === "addition" ? "the addition operator (+) and print statement" : "the modulo operator (%) and conditional check"}. Don't give up - every expert was once a beginner!`;
  }
};

// Generate next step recommendation
const generateRecommendation = (
  accuracy: number,
  topics: string[],
  problemType: string
): string => {
  if (accuracy >= 85) {
    return problemType === "addition"
      ? "Try the Even or Odd problem next to practice conditional statements!"
      : "Explore more complex problems involving loops and arrays. Consider learning about functions and modular programming.";
  } else if (accuracy >= 60) {
    return `Strengthen your understanding of ${topics[0]}. Try rewriting the solution with different approaches to deepen your knowledge.`;
  } else if (accuracy >= 40) {
    return `Review the basics of ${problemType === "addition" ? "arithmetic operators" : "conditional statements and modulo operator"}. Practice with simpler examples before attempting this problem again.`;
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
  problemId: "add-two-numbers" | "even-or-odd"
): AnalysisResult => {
  // Get problem-specific requirements
  const requirements =
    problemId === "add-two-numbers"
      ? getAddTwoNumbersRequirements(language)
      : getEvenOddRequirements(language);

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
