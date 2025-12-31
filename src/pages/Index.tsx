// Landing Page for CodeChef Lite - Complete Home Page
import Navbar from "@/components/home/Navbar";
import HeroSection from "@/components/home/HeroSection";
import EventsSection from "@/components/home/EventsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import AlumniSection from "@/components/home/AlumniSection";
import TeamSection from "@/components/home/TeamSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <EventsSection />
      <ProjectsSection />
      <AlumniSection />
      <TeamSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
