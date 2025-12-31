import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Github, Star, User, GraduationCap } from "lucide-react";

interface Project {
  id: string;
  title: string;
  studentName: string;
  collegeName: string;
  description: string;
  techStack: string[];
  stars: number;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

const projectsData: Project[] = [
  {
    id: "1",
    title: "Smart Campus App",
    studentName: "Rahul Sharma",
    collegeName: "IIT Delhi",
    description: "A comprehensive campus management app with attendance tracking, event notifications, and resource booking.",
    techStack: ["React Native", "Firebase", "Node.js"],
    stars: 45,
    featured: true,
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "2",
    title: "AI Resume Builder",
    studentName: "Priya Patel",
    collegeName: "NIT Trichy",
    description: "AI-powered resume builder that generates professional resumes based on user input and job descriptions.",
    techStack: ["Next.js", "OpenAI", "Tailwind CSS"],
    stars: 38,
    featured: true,
    githubUrl: "#"
  },
  {
    id: "3",
    title: "CodeCollab IDE",
    studentName: "Amit Kumar",
    collegeName: "BITS Pilani",
    description: "Real-time collaborative code editor with syntax highlighting, live preview, and video chat integration.",
    techStack: ["React", "Socket.io", "Monaco Editor"],
    stars: 52,
    featured: true,
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "4",
    title: "Expense Tracker",
    studentName: "Sneha Reddy",
    collegeName: "VIT Vellore",
    description: "Personal finance management app with budget tracking, expense categorization, and visual analytics.",
    techStack: ["Flutter", "SQLite", "Charts"],
    stars: 28,
    featured: false,
    githubUrl: "#"
  },
  {
    id: "5",
    title: "Study Buddy",
    studentName: "Karthik Menon",
    collegeName: "IIT Madras",
    description: "Peer-to-peer study platform connecting students for group studies and doubt clearing sessions.",
    techStack: ["Vue.js", "Supabase", "WebRTC"],
    stars: 33,
    featured: false,
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: "6",
    title: "Health Monitor",
    studentName: "Ananya Gupta",
    collegeName: "IIIT Hyderabad",
    description: "IoT-based health monitoring system with real-time vitals tracking and emergency alerts.",
    techStack: ["Python", "Arduino", "React"],
    stars: 41,
    featured: true,
    githubUrl: "#"
  }
];

const colleges = [...new Set(projectsData.map(p => p.collegeName))];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
    {project.featured && (
      <Badge className="mb-3 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
        <Star className="w-3 h-3 mr-1 fill-current" />
        Featured
      </Badge>
    )}
    
    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
      {project.title}
    </h3>
    
    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <User className="w-4 h-4" />
        <span>{project.studentName}</span>
      </div>
      <div className="flex items-center gap-1">
        <GraduationCap className="w-4 h-4" />
        <span>{project.collegeName}</span>
      </div>
    </div>
    
    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {project.techStack.map((tech, idx) => (
        <Badge key={idx} variant="secondary" className="text-xs">
          {tech}
        </Badge>
      ))}
    </div>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Star className="w-4 h-4 text-yellow-500" />
        <span>{project.stars}</span>
      </div>
      <div className="flex gap-2">
        {project.githubUrl && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Github className="w-4 h-4" />
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const [selectedCollege, setSelectedCollege] = useState<string>("all");

  const filteredProjects = selectedCollege === "all" 
    ? projectsData 
    : projectsData.filter(p => p.collegeName === selectedCollege);

  const featuredProjects = projectsData.filter(p => p.featured);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Student Projects Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover innovative projects built by talented students from various colleges
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Top Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Filter by College */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold text-foreground">
              Projects by College Students
            </h3>
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by college" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {colleges.map(college => (
                  <SelectItem key={college} value={college}>{college}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="gap-2">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
