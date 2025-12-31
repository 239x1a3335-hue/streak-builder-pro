import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, ChevronLeft, ChevronRight, Briefcase, Award, Trophy, GraduationCap, Building } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatarInitials: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Arjun Mehta",
    role: "Software Engineer",
    company: "Google",
    testimonial: "This platform helped me build the foundation I needed. The coding events and peer community accelerated my learning journey significantly.",
    avatarInitials: "AM"
  },
  {
    id: "2",
    name: "Divya Krishnan",
    role: "Product Manager",
    company: "Microsoft",
    testimonial: "The hackathons here taught me more than any classroom. Real-world problem solving with amazing mentors shaped my career.",
    avatarInitials: "DK"
  },
  {
    id: "3",
    name: "Vikram Singh",
    role: "Founder & CEO",
    company: "TechStartup Inc.",
    testimonial: "I met my co-founders during a coding event here. The network and skills I gained were instrumental in starting my own company.",
    avatarInitials: "VS"
  },
  {
    id: "4",
    name: "Neha Agarwal",
    role: "Data Scientist",
    company: "Amazon",
    testimonial: "The AI/ML workshops gave me hands-on experience that set me apart in interviews. Grateful for this amazing platform!",
    avatarInitials: "NA"
  }
];

const achievements = [
  { icon: Briefcase, count: "200+", label: "Internships Secured" },
  { icon: Building, count: "150+", label: "Placements in Top Companies" },
  { icon: Trophy, count: "50+", label: "Hackathon Wins" },
  { icon: Award, count: "30+", label: "National Awards" }
];

const careerPath = [
  { stage: "Student", description: "Learning & Building", icon: GraduationCap },
  { stage: "Intern", description: "Industry Exposure", icon: Briefcase },
  { stage: "Employee / Founder", description: "Career Success", icon: Building }
];

const AlumniSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="alumni" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Alumni Success Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our alumni who have gone on to achieve great things in their careers
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-card border border-border rounded-2xl p-8 sm:p-12">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">
                  {testimonials[currentTestimonial].avatarInitials}
                </span>
              </div>
              
              <p className="text-lg sm:text-xl text-foreground mb-6 italic">
                "{testimonials[currentTestimonial].testimonial}"
              </p>
              
              <h4 className="text-xl font-semibold text-foreground">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-muted-foreground">
                {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setCurrentTestimonial(idx)}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Career Path Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            Career Journey
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {careerPath.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.stage}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {idx < careerPath.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-muted-foreground hidden sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <achievement.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{achievement.count}</div>
              <div className="text-sm text-muted-foreground">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;
