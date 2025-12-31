import { Link } from "react-router-dom";
import { Code, Github, Linkedin, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Events", href: "#events" },
    { name: "Projects", href: "#projects" },
    { name: "Alumni", href: "#alumni" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" }
  ];

  const resourceLinks = [
    { name: "DSA Roadmap", href: "/roadmaps" },
    { name: "FSD Roadmap", href: "/roadmaps" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Practice Problems", href: "/auth" }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CodeChef Lite</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering student developers to code, innovate, and build the future through practice, 
              events, and community collaboration.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => (
                <Button key={idx} variant="ghost" size="icon" className="h-9 w-9" asChild>
                  <a href={social.href} aria-label={social.label}>
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest events and updates.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © {currentYear} CodeChef Lite. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm text-center sm:text-right">
              Built with ❤️ by Bathala Balaji & Kondreddy Vijaya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
