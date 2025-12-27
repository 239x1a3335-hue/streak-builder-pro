// Authentication Page for CodeChef Lite
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Code2, Trophy, Zap, AlertCircle, Loader2 } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp, logIn, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (isLogin) {
      const result = await logIn(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        navigate("/dashboard");
      }
    } else {
      if (!name.trim()) {
        setError("Please enter your name");
        setIsLoading(false);
        return;
      }
      const result = await signUp(email, password, name);
      if (result.error) {
        setError(result.error);
      } else {
        navigate("/dashboard");
      }
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="flex items-center gap-3 mb-12 animate-fade-in">
            <div className="p-3 rounded-xl bg-primary/20 streak-fire">
              <Flame className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">CodeChef Lite</h1>
              <p className="text-muted-foreground">Multi-Language Learning Platform</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4 animate-fade-in-delay-1">
              <div className="p-2 rounded-lg bg-accent/20">
                <Code2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Multi-Language Support</h3>
                <p className="text-muted-foreground text-sm">
                  Practice in Python, C, and Java with dynamic code analysis
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in-delay-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Daily Streak Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  Build consistent coding habits with streak rewards
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in-delay-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Trophy className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Smart Code Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Get instant feedback and personalized recommendations
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 p-6 rounded-xl glass-panel animate-fade-in-delay-3">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Quick Start</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Sign up now and receive a personalized welcome email. Start your coding journey today!
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/50">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="p-2 rounded-lg bg-primary/20">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeChef Lite</span>
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Sign up to start your coding journey"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : (
                  <>{isLogin ? "Sign In" : "Create Account"}</>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
