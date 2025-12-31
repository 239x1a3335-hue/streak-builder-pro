import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, FolderOpen, LogIn, ChevronRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-pulse">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Empowering Student Developers</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Code. Innovate.
          <span className="block bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Build the Future.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Join our thriving community of student developers. Participate in coding events, 
          showcase your projects, connect with alumni, and accelerate your tech career.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#events">
            <Button size="lg" className="w-full sm:w-auto gap-2 group">
              <Rocket className="w-5 h-5 group-hover:animate-bounce" />
              View Events
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#projects">
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <FolderOpen className="w-5 h-5" />
              Explore Projects
            </Button>
          </a>
          <Link to="/auth">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
              <LogIn className="w-5 h-5" />
              Student Login
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">100+</div>
            <div className="text-sm text-muted-foreground">Projects Built</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary">20+</div>
            <div className="text-sm text-muted-foreground">Partner Colleges</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
