// User Data Types and Utilities for CodeChef Lite

import { Language } from "./analyzer";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  selectedLanguage: Language;
  problemsSolved: number;
  avgAccuracy: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  lastSubmission?: {
    problemId: string;
    accuracy: number;
    status: string;
    timestamp: string;
  };
}

export interface Problem {
  id: "add-two-numbers" | "even-or-odd";
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  inputDescription: string;
  outputDescription: string;
  examples: {
    input: string;
    output: string;
  }[];
  starterCode: {
    Python: string;
    C: string;
    Java: string;
  };
}

// Problem definitions
export const problems: Problem[] = [
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    description:
      "Write a program that takes two numbers as input and prints their sum.",
    difficulty: "Easy",
    inputDescription: "Two integers a and b",
    outputDescription: "Print the sum of a and b",
    examples: [
      { input: "a = 5, b = 3", output: "8" },
      { input: "a = 10, b = 20", output: "30" },
    ],
    starterCode: {
      Python: `# Add Two Numbers - Python
# Take two numbers and print their sum

a = 5
b = 3

# Write your solution below
`,
      C: `// Add Two Numbers - C
// Take two numbers and print their sum

#include <stdio.h>

int main() {
    int a = 5;
    int b = 3;
    
    // Write your solution below
    
    return 0;
}
`,
      Java: `// Add Two Numbers - Java
// Take two numbers and print their sum

public class Solution {
    public static void main(String[] args) {
        int a = 5;
        int b = 3;
        
        // Write your solution below
        
    }
}
`,
    },
  },
  {
    id: "even-or-odd",
    title: "Even or Odd",
    description:
      "Write a program that takes a number as input and determines whether it is even or odd.",
    difficulty: "Easy",
    inputDescription: "A single integer n",
    outputDescription: 'Print "Even" if the number is even, "Odd" if it is odd',
    examples: [
      { input: "n = 4", output: "Even" },
      { input: "n = 7", output: "Odd" },
    ],
    starterCode: {
      Python: `# Even or Odd - Python
# Check if a number is even or odd

n = 4

# Write your solution below
`,
      C: `// Even or Odd - C
// Check if a number is even or odd

#include <stdio.h>

int main() {
    int n = 4;
    
    // Write your solution below
    
    return 0;
}
`,
      Java: `// Even or Odd - Java
// Check if a number is even or odd

public class Solution {
    public static void main(String[] args) {
        int n = 4;
        
        // Write your solution below
        
    }
}
`,
    },
  },
];

// Get problem by ID
export const getProblemById = (id: string): Problem | undefined => {
  return problems.find((p) => p.id === id);
};
