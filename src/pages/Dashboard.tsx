// Dashboard Page for CodeChef Lite
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Language } from "@/lib/analyzer";
import { problems } from "@/lib/types";
import { getStreakStatus, formatStreakDisplay } from "@/lib/streak";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flame,
  Trophy,
  Code2,
  LogOut,
  Target,
  TrendingUp,
  ChevronRight,
  Loader2,
  Info,
} from "lucide-react";

const languages: Language[] = ["Python", "C", "Java"];

const languageIcons: Record<Language, string> = {
  Python: "🐍",
  C: "⚡",
  Java: "☕",
};

const Dashboard = () => {
  const { user, userProfile, loading, logOut, updateLanguage } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await logOut();
    navigate("/auth");
  };

  const handleLanguageChange = async (language: Language) => {
    await updateLanguage(language);
  };

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const streakStatus = getStreakStatus(userProfile.lastActiveDate);
  const isStreakActive = streakStatus === "active";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Flame className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">CodeChef Lite</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
              <span className="text-sm text-muted-foreground">Welcome,</span>
              <span className="font-medium text-foreground">{userProfile.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {userProfile.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your coding journey and maintain your streak
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Current Streak */}
          <Card
            className={`metric-card ${
              isStreakActive ? "streak-active" : "streak-broken"
            } animate-fade-in`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    isStreakActive ? "bg-primary/20 streak-fire" : "bg-muted"
                  }`}
                >
                  <Flame
                    className={`w-6 h-6 ${
                      isStreakActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="relative group">
                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  <div className="absolute right-0 top-6 w-48 p-2 bg-popover border border-border rounded-lg text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    Solve at least one problem daily to maintain streak
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-foreground">
                🔥 {formatStreakDisplay(userProfile.currentStreak)}
              </p>
              {!isStreakActive && streakStatus === "at-risk" && (
                <p className="text-xs text-warning mt-2">Solve a problem today!</p>
              )}
            </CardContent>
          </Card>

          {/* Best Streak */}
          <Card className="metric-card animate-fade-in-delay-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-warning/20">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Best Streak</p>
              <p className="text-3xl font-bold text-foreground">
                🏆 {formatStreakDisplay(userProfile.bestStreak)}
              </p>
            </CardContent>
          </Card>

          {/* Problems Solved */}
          <Card className="metric-card animate-fade-in-delay-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-accent/20">
                  <Target className="w-6 h-6 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Problems Solved</p>
              <p className="text-3xl font-bold text-foreground">
                {userProfile.problemsSolved}
              </p>
            </CardContent>
          </Card>

          {/* Average Accuracy */}
          <Card className="metric-card animate-fade-in-delay-3">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-success/20">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Avg Accuracy</p>
              <p className="text-3xl font-bold text-foreground">
                {userProfile.avgAccuracy}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Language Selection */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Select Language
          </h2>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={userProfile.selectedLanguage === lang ? "languageActive" : "language"}
                size="lg"
                onClick={() => handleLanguageChange(lang)}
                className="flex items-center gap-2"
              >
                <span className="text-xl">{languageIcons[lang]}</span>
                <span>{lang}</span>
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Currently practicing:{" "}
            <span className="language-badge">
              {languageIcons[userProfile.selectedLanguage]} {userProfile.selectedLanguage}
            </span>
          </p>
        </div>

        {/* Problems Section */}
        <div className="animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Practice Problems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <div
                key={problem.id}
                onClick={() => navigate(`/problem/${problem.id}`)}
                className={`problem-card animate-fade-in-delay-${index + 1}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-success/20 text-success">
                        {problem.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {problem.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </div>
            ))}
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
            © CodeChef Lite Platform
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
