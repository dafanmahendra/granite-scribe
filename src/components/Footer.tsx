import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background-elevated py-12 px-4 border-t border-border-subtle">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">AI Job Assistant</h3>
          <p className="text-foreground-muted">
            IBM Capstone Project - Supporting SDG #8: Decent Work and Economic Growth
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="#" 
            className="p-3 rounded-full bg-background-surface hover:bg-primary transition-colors duration-300 group"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-foreground-muted group-hover:text-white" />
          </a>
          <a 
            href="#" 
            className="p-3 rounded-full bg-background-surface hover:bg-primary transition-colors duration-300 group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-foreground-muted group-hover:text-white" />
          </a>
          <a 
            href="#" 
            className="p-3 rounded-full bg-background-surface hover:bg-primary transition-colors duration-300 group"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-foreground-muted group-hover:text-white" />
          </a>
        </div>

        <div className="text-center text-foreground-subtle text-sm border-t border-border-subtle pt-8">
          <p>&copy; 2024 AI Job Assistant. Created as part of IBM Capstone Project.</p>
          <p className="mt-2">Developed with ❤️ for a better future of work.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;