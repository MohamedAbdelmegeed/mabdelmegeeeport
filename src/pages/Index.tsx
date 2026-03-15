import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <footer className="py-8 px-6 border-t border-border text-center">
        <p className="font-heading text-xs text-muted-foreground">
          © {new Date().getFullYear()} Your Name. Built with passion.
        </p>
      </footer>
    </div>
  );
};

export default Index;
