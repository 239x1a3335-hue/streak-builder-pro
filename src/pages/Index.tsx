// Landing Page for CodeChef Lite
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, Flame, Trophy, Mail, ChevronRight, Users, Zap, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeChef Lite</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/auth">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button size="sm" className="hidden sm:flex">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">Build Your Coding Streak</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Master Coding with
            <span className="block text-primary">Daily Practice & Analysis</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Solve problems in Python, C, and Java. Get instant AI-powered analysis, 
            build streaks, and receive detailed performance reports via email.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Start Coding Free
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose CodeChef Lite?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete coding practice platform with smart features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Language Support</h3>
              <p className="text-muted-foreground">
                Practice in Python, C, and Java. Switch languages anytime from your dashboard.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Code Analysis</h3>
              <p className="text-muted-foreground">
                Get instant feedback with topic detection, accuracy scoring, and improvement tips.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <Flame className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Daily Streaks</h3>
              <p className="text-muted-foreground">
                Build consistency with streak tracking. Solve one problem daily to keep it alive.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Email Reports</h3>
              <p className="text-muted-foreground">
                Receive detailed performance analysis via email after each submission.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Leaderboard</h3>
              <p className="text-muted-foreground">
                Compete with others. Climb the ranks based on streaks, problems, and accuracy.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your growth with detailed stats and submission history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4+</div>
              <div className="text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Free</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Practice</div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with passion by dedicated developers
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-2xl mx-auto">
            {/* Founder 1 */}
            <div className="bg-card border border-border rounded-xl p-6 text-center flex-1 w-full sm:w-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">Bathala Balaji</h3>
              <p className="text-muted-foreground text-sm mb-3">Co-Founder & Developer</p>
              <p className="text-muted-foreground text-sm">
                Passionate about building tools that help students learn coding effectively.
              </p>
            </div>
            {/* Founder 2 */}
            <div className="bg-card border border-border rounded-xl p-6 text-center flex-1 w-full sm:w-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">Kondreddy Vijaya</h3>
              <p className="text-muted-foreground text-sm mb-3">Co-Founder & Developer</p>
              <p className="text-muted-foreground text-sm">
                Focused on creating intuitive user experiences and smart analysis systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join CodeChef Lite today and build your coding skills with daily practice, 
              smart analysis, and streak tracking.
            </p>
            <Link to="/auth?mode=signup">
              <Button size="lg" className="gap-2">
                Create Free Account
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">CodeChef Lite</span>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} CodeChef Lite. Built by Bathala Balaji & Kondreddy Vijaya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
