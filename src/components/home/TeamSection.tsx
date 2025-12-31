import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarInitials: string;
  linkedin?: string;
  github?: string;
  email?: string;
  isLead?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Bathala Balaji",
    role: "Co-Founder & Lead Developer",
    description: "Passionate about building tools that help students learn coding effectively.",
    avatarInitials: "BB",
    linkedin: "#",
    github: "#",
    isLead: true
  },
  {
    id: "2",
    name: "Kondreddy Vijaya",
    role: "Co-Founder & Developer",
    description: "Focused on creating intuitive user experiences and smart analysis systems.",
    avatarInitials: "KV",
    linkedin: "#",
    github: "#",
    isLead: true
  },
  {
    id: "3",
    name: "Ravi Kumar",
    role: "Technical Mentor",
    description: "Guides students through complex DSA problems and system design concepts.",
    avatarInitials: "RK",
    linkedin: "#"
  },
  {
    id: "4",
    name: "Priya Sharma",
    role: "Event Coordinator",
    description: "Organizes hackathons, workshops, and coding competitions for the community.",
    avatarInitials: "PS",
    linkedin: "#",
    email: "#"
  },
  {
    id: "5",
    name: "Amit Patel",
    role: "Community Manager",
    description: "Builds and nurtures our growing community of student developers.",
    avatarInitials: "AP",
    linkedin: "#"
  },
  {
    id: "6",
    name: "Sneha Reddy",
    role: "Content Lead",
    description: "Creates educational content and maintains learning resources.",
    avatarInitials: "SR",
    linkedin: "#",
    github: "#"
  }
];

const TeamSection = () => {
  const leads = teamMembers.filter(m => m.isLead);
  const members = teamMembers.filter(m => !m.isLead);

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind CodeChef Lite working to empower student developers
          </p>
        </div>

        {/* Leadership */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Leadership
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
            {leads.map(member => (
              <div 
                key={member.id} 
                className="bg-card border border-border rounded-xl p-8 text-center flex-1 w-full sm:max-w-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/20">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.avatarInitials}
                  </span>
                </div>
                <Badge className="mb-3">Lead</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                <div className="flex items-center justify-center gap-2">
                  {member.linkedin && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                  {member.github && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="w-4 h-4" />
                    </Button>
                  )}
                  {member.email && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        <div>
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Core Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map(member => (
              <div 
                key={member.id} 
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-bold text-accent-foreground">
                    {member.avatarInitials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-xs mb-4 line-clamp-2">{member.description}</p>
                <div className="flex items-center justify-center gap-2">
                  {member.linkedin && (
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Linkedin className="w-3 h-3" />
                    </Button>
                  )}
                  {member.github && (
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Github className="w-3 h-3" />
                    </Button>
                  )}
                  {member.email && (
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Mail className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
