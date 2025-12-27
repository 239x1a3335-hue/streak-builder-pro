// Problem Page for CodeChef Lite
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, update, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { getProblemById } from "@/lib/types";
import { analyzeCode, AnalysisResult } from "@/lib/analyzer";
import { calculateUpdatedStreak, getTodayDate } from "@/lib/streak";
import { sendSubmissionEmail } from "@/lib/emailjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flame,
  ArrowLeft,
  Play,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  FileCode,
  BookOpen,
  Zap,
  Send,
} from "lucide-react";

const Problem = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const { user, userProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const problem = problemId ? getProblemById(problemId) : undefined;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  // Set starter code when problem or language changes
  useEffect(() => {
    if (problem && userProfile) {
      setCode(problem.starterCode[userProfile.selectedLanguage]);
      setResult(null);
      setShowResult(false);
    }
  }, [problem, userProfile?.selectedLanguage]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Problem Not Found</h1>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!code.trim() || !user || !userProfile) return;

    setIsSubmitting(true);
    setShowResult(false);

    try {
      // Analyze the code
      const analysisResult = analyzeCode(
        code,
        userProfile.selectedLanguage,
        problem.id as "add-two-numbers" | "even-or-odd"
      );
      setResult(analysisResult);

      // Update streak
      const updatedStreak = calculateUpdatedStreak(
        userProfile.currentStreak,
        userProfile.bestStreak,
        userProfile.lastActiveDate
      );

      // Calculate new average accuracy
      const newProblemsSolved = userProfile.problemsSolved + 1;
      const totalAccuracy =
        userProfile.avgAccuracy * userProfile.problemsSolved + analysisResult.accuracy;
      const newAvgAccuracy = Math.round(totalAccuracy / newProblemsSolved);

      // Update user profile in database
      const userRef = ref(database, `users/${user.uid}`);
      await update(userRef, {
        problemsSolved: newProblemsSolved,
        avgAccuracy: newAvgAccuracy,
        currentStreak: updatedStreak.currentStreak,
        bestStreak: updatedStreak.bestStreak,
        lastActiveDate: getTodayDate(),
        lastSubmission: {
          problemId: problem.id,
          accuracy: analysisResult.accuracy,
          status: analysisResult.status,
          timestamp: new Date().toISOString(),
        },
      });

      // Send submission analysis email
      await sendSubmissionEmail({
        name: userProfile.name,
        email: userProfile.email,
        problem: problem.title,
        language: userProfile.selectedLanguage,
        status: analysisResult.status,
        topics: analysisResult.topics.join(", "),
        accuracy: `${analysisResult.accuracy}%`,
        currentStreak: updatedStreak.currentStreak,
        bestStreak: updatedStreak.bestStreak,
        feedback: analysisResult.feedback,
        recommendation: analysisResult.recommendation,
      });

      // Refresh user profile
      await refreshProfile();

      setShowResult(true);
    } catch (error) {
      console.error("Error submitting code:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Correct":
        return <CheckCircle className="w-6 h-6 text-success" />;
      case "Partially Correct":
        return <AlertCircle className="w-6 h-6 text-warning" />;
      default:
        return <XCircle className="w-6 h-6 text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Correct":
        return "border-success bg-success/10";
      case "Partially Correct":
        return "border-warning bg-warning/10";
      default:
        return "border-destructive bg-destructive/10";
    }
  };

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

          <div className="flex items-center gap-2">
            <span className="language-badge">
              {userProfile.selectedLanguage}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
                  {problem.difficulty}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {problem.title}
              </h1>
            </div>

            <Card className="bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Problem Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{problem.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Input</h4>
                    <p className="text-sm text-muted-foreground">{problem.inputDescription}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Output</h4>
                    <p className="text-sm text-muted-foreground">{problem.outputDescription}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-accent" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {problem.examples.map((example, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/50 font-mono text-sm"
                    >
                      <div className="text-muted-foreground">
                        <span className="text-primary">Input:</span> {example.input}
                      </div>
                      <div className="text-muted-foreground">
                        <span className="text-success">Output:</span> {example.output}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor */}
          <div className="space-y-6 animate-fade-in-delay-1">
            <Card className="bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Code Editor
                  <span className="ml-auto language-badge text-xs">
                    {userProfile.selectedLanguage}
                  </span>
                </CardTitle>
                <CardDescription>
                  Write your solution in {userProfile.selectedLanguage}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="code-editor-container">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-80 p-4 bg-transparent text-foreground font-mono text-sm resize-none focus:outline-none"
                    placeholder={`Write your ${userProfile.selectedLanguage} code here...`}
                    spellCheck={false}
                  />
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !code.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Solution
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Result */}
            {showResult && result && (
              <Card
                className={`animate-fade-in border-2 ${getStatusColor(result.status)}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <span>{result.status}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                      <p className="text-2xl font-bold text-foreground">
                        {result.accuracy}%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Topics</p>
                      <div className="flex flex-wrap gap-1">
                        {result.topics.slice(0, 3).map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-xs bg-accent/20 text-accent"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Feedback</h4>
                    <p className="text-sm text-muted-foreground">{result.feedback}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <h4 className="font-medium text-primary mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Next Step
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {result.recommendation}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    📧 Analysis report sent to your email
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
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
            © CodeChef Lite Analysis Engine
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Problem;
