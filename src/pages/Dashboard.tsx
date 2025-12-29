// Dashboard Page for CodeChef Lite
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Language } from "@/lib/analyzer";
import { problems } from "@/lib/types";
import { getStreakStatus, formatStreakDisplay } from "@/lib/streak";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  Users,
  FileText,
  User,
  Menu,
  X,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const languages: Language[] = ["Python", "C", "Java"];

const languageIcons: Record<Language, string> = {
  Python: "🐍",
  C: "⚡",
  Java: "☕",
};

type NavSection = "problems" | "submissions" | "profile";

const Dashboard = () => {
  const { user, userProfile, loading, logOut, updateLanguage } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<NavSection>("problems");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navItems = [
    { id: "problems" as NavSection, label: "Problems", icon: Code2 },
    { id: "submissions" as NavSection, label: "Submissions", icon: FileText },
    { id: "profile" as NavSection, label: "Profile", icon: User },
  ];

  const handleNavClick = (section: NavSection) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  // Render Problems Section
  const renderProblems = () => (
    <div className="animate-fade-in">
      {/* Language Selection */}
      <div className="mb-8">
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

      {/* Problems List */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Practice Problems
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <div
              key={problem.id}
              onClick={() => navigate(`/problem/${problem.id}`)}
              className="problem-card cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      problem.difficulty === "Easy" 
                        ? "bg-success/20 text-success" 
                        : problem.difficulty === "Medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-destructive/20 text-destructive"
                    }`}>
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
    </div>
  );

  // Render Submissions Section
  const renderSubmissions = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Your Submissions
      </h2>
      
      {userProfile.lastSubmission ? (
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {userProfile.lastSubmission.status === "Passed" ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                  <div>
                    <h3 className="font-semibold text-foreground capitalize">
                      {userProfile.lastSubmission.problemId.replace(/-/g, " ")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(userProfile.lastSubmission.timestamp).toLocaleDateString()} at{" "}
                      {new Date(userProfile.lastSubmission.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    userProfile.lastSubmission.status === "Passed"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}>
                    {userProfile.lastSubmission.status}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accuracy: {userProfile.lastSubmission.accuracy}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>More submission history coming soon!</p>
            <p className="text-sm">Keep solving problems to track your progress.</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Submissions Yet</h3>
          <p className="text-muted-foreground mb-6">
            Start solving problems to see your submission history here.
          </p>
          <Button onClick={() => setActiveSection("problems")}>
            <Code2 className="w-4 h-4 mr-2" />
            Browse Problems
          </Button>
        </div>
      )}
    </div>
  );

  // Render Profile Section
  const renderProfile = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Your Profile
      </h2>
      
      {/* Profile Info */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">
                {userProfile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-foreground">{userProfile.name}</h3>
              <p className="text-muted-foreground">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <span className="language-badge">
                  {languageIcons[userProfile.selectedLanguage]} {userProfile.selectedLanguage}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Streak */}
        <Card className={`metric-card ${isStreakActive ? "streak-active" : "streak-broken"}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${isStreakActive ? "bg-primary/20 streak-fire" : "bg-muted"}`}>
                <Flame className={`w-6 h-6 ${isStreakActive ? "text-primary" : "text-muted-foreground"}`} />
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
        <Card className="metric-card">
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
        <Card className="metric-card">
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
        <Card className="metric-card">
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
    </div>
  );

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

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/leaderboard")}
              className="sm:hidden"
            >
              <Users className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/leaderboard")}
              className="hidden sm:flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Leaderboard
            </Button>
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
              <span className="text-sm text-muted-foreground">Welcome,</span>
              <span className="font-medium text-foreground">{userProfile.name}</span>
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-73px)] bg-card/50 border-r border-border p-4">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Stats in Sidebar */}
          <div className="mt-auto pt-6 border-t border-border">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  Streak
                </span>
                <span className="font-medium text-foreground">{userProfile.currentStreak} days</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-accent" />
                  Solved
                </span>
                <span className="font-medium text-foreground">{userProfile.problemsSolved}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  Accuracy
                </span>
                <span className="font-medium text-foreground">{userProfile.avgAccuracy}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, {userProfile.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Continue your coding journey and maintain your streak
            </p>
          </div>

          {/* Dynamic Content */}
          {activeSection === "problems" && renderProblems()}
          {activeSection === "submissions" && renderSubmissions()}
          {activeSection === "profile" && renderProfile()}

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
    </div>
  );
};

export default Dashboard;
