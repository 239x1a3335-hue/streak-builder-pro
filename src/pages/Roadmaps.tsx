// Roadmaps Page for CodeChef Lite
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Flame,
  ArrowLeft,
  Download,
  CheckCircle2,
  Circle,
  BookOpen,
  Code2,
  Database,
  Globe,
  Server,
  Layers,
  Cpu,
  Binary,
  TreePine,
  Network,
  Loader2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subtopics: string[];
}

const dsaRoadmap: RoadmapTopic[] = [
  {
    id: "basics",
    title: "Programming Basics",
    description: "Variables, Data Types, Operators, Control Flow",
    icon: <Code2 className="w-5 h-5" />,
    subtopics: ["Variables & Data Types", "Operators", "Conditional Statements", "Loops", "Functions"],
  },
  {
    id: "arrays",
    title: "Arrays & Strings",
    description: "Linear data structures fundamentals",
    icon: <Binary className="w-5 h-5" />,
    subtopics: ["1D Arrays", "2D Arrays", "String Manipulation", "Two Pointer Technique", "Sliding Window"],
  },
  {
    id: "recursion",
    title: "Recursion & Backtracking",
    description: "Problem-solving with recursive approaches",
    icon: <Layers className="w-5 h-5" />,
    subtopics: ["Recursion Basics", "Tail Recursion", "Backtracking", "N-Queens Problem", "Subset Sum"],
  },
  {
    id: "sorting",
    title: "Sorting & Searching",
    description: "Essential algorithms for data organization",
    icon: <Cpu className="w-5 h-5" />,
    subtopics: ["Bubble Sort", "Merge Sort", "Quick Sort", "Binary Search", "Search in Rotated Array"],
  },
  {
    id: "linkedlist",
    title: "Linked Lists",
    description: "Dynamic linear data structures",
    icon: <Network className="w-5 h-5" />,
    subtopics: ["Singly Linked List", "Doubly Linked List", "Circular Linked List", "Fast & Slow Pointers", "Reverse Linked List"],
  },
  {
    id: "stacks-queues",
    title: "Stacks & Queues",
    description: "LIFO and FIFO data structures",
    icon: <Layers className="w-5 h-5" />,
    subtopics: ["Stack Implementation", "Queue Implementation", "Monotonic Stack", "Priority Queue", "Deque"],
  },
  {
    id: "trees",
    title: "Trees & BST",
    description: "Hierarchical data structures",
    icon: <TreePine className="w-5 h-5" />,
    subtopics: ["Binary Trees", "Tree Traversals", "BST Operations", "AVL Trees", "Segment Trees"],
  },
  {
    id: "graphs",
    title: "Graphs",
    description: "Network and relationship modeling",
    icon: <Network className="w-5 h-5" />,
    subtopics: ["Graph Representation", "BFS & DFS", "Shortest Path Algorithms", "Topological Sort", "Minimum Spanning Tree"],
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    description: "Optimization through memoization",
    icon: <Database className="w-5 h-5" />,
    subtopics: ["1D DP", "2D DP", "LCS & LIS", "Knapsack Problems", "DP on Trees"],
  },
];

const fsdRoadmap: RoadmapTopic[] = [
  {
    id: "html-css",
    title: "HTML & CSS",
    description: "Web fundamentals and styling",
    icon: <Code2 className="w-5 h-5" />,
    subtopics: ["HTML5 Semantics", "CSS Flexbox", "CSS Grid", "Responsive Design", "CSS Animations"],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Core programming for the web",
    icon: <Code2 className="w-5 h-5" />,
    subtopics: ["ES6+ Features", "DOM Manipulation", "Async/Await", "Closures & Scope", "Event Handling"],
  },
  {
    id: "react",
    title: "React.js",
    description: "Modern frontend framework",
    icon: <Layers className="w-5 h-5" />,
    subtopics: ["Components & Props", "State Management", "Hooks", "React Router", "Context API"],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Type-safe JavaScript",
    icon: <Code2 className="w-5 h-5" />,
    subtopics: ["Types & Interfaces", "Generics", "Type Guards", "Utility Types", "Declaration Files"],
  },
  {
    id: "nodejs",
    title: "Node.js",
    description: "Server-side JavaScript runtime",
    icon: <Server className="w-5 h-5" />,
    subtopics: ["Node Basics", "Express.js", "Middleware", "File System", "NPM Packages"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Data persistence and management",
    icon: <Database className="w-5 h-5" />,
    subtopics: ["SQL Basics", "MongoDB", "PostgreSQL", "ORM (Prisma)", "Database Design"],
  },
  {
    id: "api",
    title: "APIs & Authentication",
    description: "Backend communication and security",
    icon: <Globe className="w-5 h-5" />,
    subtopics: ["REST APIs", "GraphQL", "JWT Authentication", "OAuth 2.0", "API Security"],
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    description: "CI/CD and cloud deployment",
    icon: <Server className="w-5 h-5" />,
    subtopics: ["Git & GitHub", "Docker", "CI/CD Pipelines", "Cloud Platforms", "Monitoring"],
  },
];

const Roadmaps = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeRoadmap, setActiveRoadmap] = useState<"dsa" | "fsd">("dsa");
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleDownloadPDF = (type: "dsa" | "fsd") => {
    const roadmap = type === "dsa" ? dsaRoadmap : fsdRoadmap;
    const title = type === "dsa" ? "DSA Roadmap" : "Full Stack Development Roadmap";
    
    // Create PDF content
    let content = `${title}\n${"=".repeat(50)}\n\n`;
    
    roadmap.forEach((topic, index) => {
      content += `${index + 1}. ${topic.title}\n`;
      content += `   ${topic.description}\n`;
      content += `   Subtopics:\n`;
      topic.subtopics.forEach((subtopic) => {
        content += `   • ${subtopic}\n`;
      });
      content += `\n`;
    });
    
    content += `\n${"=".repeat(50)}\nGenerated by CodeChef Lite Platform\n`;
    content += `Developed by BATHALA BALAJI • KONDREDDY VIJAYA`;
    
    // Create and download file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type.toUpperCase()}_Roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentRoadmap = activeRoadmap === "dsa" ? dsaRoadmap : fsdRoadmap;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Flame className="w-5 h-5 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">CodeChef Lite</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Learning Roadmaps
            </h1>
          </div>
          <p className="text-muted-foreground">
            Complete learning paths for DSA and Full Stack Development
          </p>
        </div>

        {/* Roadmap Toggle */}
        <div className="flex justify-center gap-3 mb-8 animate-fade-in">
          <Button
            variant={activeRoadmap === "dsa" ? "default" : "outline"}
            onClick={() => setActiveRoadmap("dsa")}
            className="flex items-center gap-2"
          >
            <Cpu className="w-4 h-4" />
            DSA Roadmap
          </Button>
          <Button
            variant={activeRoadmap === "fsd" ? "default" : "outline"}
            onClick={() => setActiveRoadmap("fsd")}
            className="flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            FSD Roadmap
          </Button>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={() => handleDownloadPDF(activeRoadmap)}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download {activeRoadmap.toUpperCase()} Roadmap
          </Button>
        </div>

        {/* Roadmap Content */}
        <div className="space-y-4">
          {currentRoadmap.map((topic, index) => (
            <Card
              key={topic.id}
              className="bg-card border-border overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                onClick={() => toggleTopic(topic.id)}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="p-2 rounded-lg bg-muted">
                        {topic.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">
                          {topic.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    {expandedTopics.includes(topic.id) ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </div>
              
              {expandedTopics.includes(topic.id) && (
                <CardContent className="pt-0 pb-4 animate-fade-in">
                  <div className="ml-14 pl-4 border-l-2 border-primary/30 space-y-2">
                    {topic.subtopics.map((subtopic, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Circle className="w-3 h-3 text-primary" />
                        <span className="text-foreground">{subtopic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {currentRoadmap.length} topics • {currentRoadmap.reduce((acc, t) => acc + t.subtopics.length, 0)} subtopics
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Developed & Maintained By
          </p>
          <p className="font-medium text-foreground">
            BATHALA BALAJI • KONDREDDY VIJAYA
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © CodeChef Lite Platform
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Roadmaps;
