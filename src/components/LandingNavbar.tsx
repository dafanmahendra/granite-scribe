import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-bold text-white">Job Assistant</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground-muted hover:text-white transition-colors">
            Features
          </a>
          <a href="#about" className="text-foreground-muted hover:text-white transition-colors">
            About
          </a>
        </div>

        <Button 
          onClick={() => navigate('/assistant')}
          className="bg-primary hover:bg-primary-hover text-white"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default LandingNavbar;