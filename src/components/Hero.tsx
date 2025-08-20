import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-hero">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-foreground-muted bg-clip-text text-transparent animate-fade-in">
          AI Job Assistant
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground-muted mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Empowering decent work opportunities through AI-powered cover letter generation.
          <br />
          <span className="text-primary font-semibold">Supporting SDG #8: Decent Work and Economic Growth</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            size="lg" 
            onClick={() => navigate('/assistant')}
            className="text-lg px-8 py-4 shadow-glow hover:shadow-elevated transition-all duration-300"
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-foreground-subtle animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Create professional cover letters in seconds
        </div>
      </div>
    </section>
  );
};

export default Hero;