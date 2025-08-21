import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Target, Users, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="text-center py-24 sm:py-32 lg:py-40 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider uppercase text-foreground mb-4">
          AI Cover Letter
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground-subtle mb-8 font-light">
          Generate professional, AI-powered cover letters in seconds.
          Clean, minimal, and effective.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/assistant')}
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-light py-3 px-8 text-base tracking-wider uppercase transition-all duration-200 transform hover:scale-[1.01]"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-border-subtle text-foreground-muted hover:bg-background-surface hover:text-foreground"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Target, title: "Professional Tone", description: "Our AI is tuned to generate formal, professional cover letters suitable for any industry." },
    { icon: Users, title: "Increase Confidence", description: "A well-prepared letter boosts your confidence and makes a great first impression." },
    { icon: TrendingUp, title: "Improve Efficiency", description: "Save time and effort, allowing you to apply for more jobs and focus on interviews." }
  ];

  return (
    <section id="features" className="py-20 bg-background-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase text-foreground mb-3">
            Why Use Our Generator?
          </h2>
          <p className="text-md md:text-lg max-w-3xl mx-auto text-foreground-subtle font-light">
            We believe everyone deserves a fair chance. Our tool is a small step towards leveling the playing field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background-surface p-8 text-center"
            >
              <div className="mx-auto w-10 h-10 bg-background-elevated rounded-sm flex items-center justify-center mb-5">
                <feature.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-xl font-normal tracking-wide text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground-subtle font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4 sticky top-0 z-50 border-b border-border-subtle">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
           <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">AI</span>
          </div>
          <span className="text-lg font-light tracking-wide text-foreground">Cover Letter</span>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/assistant')}
          className="text-foreground-muted hover:bg-background-surface hover:text-foreground"
        >
          Launch App
        </Button>
      </div>
    </nav>
  );
};

const LandingFooter = () => (
  <footer className="bg-black border-t border-border-subtle">
    <div className="container mx-auto px-4 py-6">
      <div className="text-center">
        <p className="text-foreground-subtle text-sm font-light">
          &copy; 2025 AI Cover Letter. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-black">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
