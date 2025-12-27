// Leaderboard Page for CodeChef Lite
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { database } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flame,
  Trophy,
  Medal,
  ArrowLeft,
  Crown,
  Target,
  TrendingUp,
  Loader2,
  Users,
} from "lucide-react";

interface LeaderboardUser {
  uid: string;
  name: string;
  currentStreak: number;
  bestStreak: number;
  problemsSolved: number;
  avgAccuracy: number;
}

const Leaderboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"streak" | "problems" | "accuracy">("streak");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = ref(database, "users");
        const snapshot = await get(usersRef);
        
        if (snapshot.exists()) {
          const usersData: LeaderboardUser[] = [];
          snapshot.forEach((child) => {
            const userData = child.val() as UserProfile;
            usersData.push({
              uid: child.key || "",
              name: userData.name,
              currentStreak: userData.currentStreak || 0,
              bestStreak: userData.bestStreak || 0,
              problemsSolved: userData.problemsSolved || 0,
              avgAccuracy: userData.avgAccuracy || 0,
            });
          });
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Sort users based on selected criteria
  const sortedUsers = [...users].sort((a, b) => {
    switch (sortBy) {
      case "streak":
        return b.bestStreak - a.bestStreak || b.currentStreak - a.currentStreak;
      case "problems":
        return b.problemsSolved - a.problemsSolved;
      case "accuracy":
        return b.avgAccuracy - a.avgAccuracy;
      default:
        return 0;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50";
      default:
        return "bg-card border-border";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-10 h-10 text-warning" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Leaderboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Top coders ranked by their performance
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-delay-1">
          <Button
            variant={sortBy === "streak" ? "languageActive" : "language"}
            onClick={() => setSortBy("streak")}
            className="flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            Best Streak
          </Button>
          <Button
            variant={sortBy === "problems" ? "languageActive" : "language"}
            onClick={() => setSortBy("problems")}
            className="flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            Problems Solved
          </Button>
          <Button
            variant={sortBy === "accuracy" ? "languageActive" : "language"}
            onClick={() => setSortBy("accuracy")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Accuracy
          </Button>
        </div>

        {/* Leaderboard List */}
        <div className="max-w-2xl mx-auto space-y-3">
          {sortedUsers.length === 0 ? (
            <Card className="bg-card/80">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No users yet. Be the first!</p>
              </CardContent>
            </Card>
          ) : (
            sortedUsers.map((leaderUser, index) => {
              const rank = index + 1;
              const isCurrentUser = leaderUser.uid === user?.uid;

              return (
                <div
                  key={leaderUser.uid}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${getRankBg(rank)} ${
                    isCurrentUser ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      {getRankIcon(rank)}
                    </div>

                    {/* User Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {leaderUser.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 rounded text-xs bg-primary/20 text-primary">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3 text-primary" />
                          {leaderUser.currentStreak} day streak
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-accent" />
                          {leaderUser.problemsSolved} solved
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex-shrink-0 text-right">
                      {sortBy === "streak" && (
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            🏆 {leaderUser.bestStreak}
                          </p>
                          <p className="text-xs text-muted-foreground">best streak</p>
                        </div>
                      )}
                      {sortBy === "problems" && (
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {leaderUser.problemsSolved}
                          </p>
                          <p className="text-xs text-muted-foreground">problems</p>
                        </div>
                      )}
                      {sortBy === "accuracy" && (
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {leaderUser.avgAccuracy}%
                          </p>
                          <p className="text-xs text-muted-foreground">accuracy</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
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

export default Leaderboard;
