import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, History } from "lucide-react";

interface NavbarProps {
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
}

const Navbar = ({ onToggleHistory, isHistoryOpen }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background-surface/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-glow">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">IBM Granite AI</h1>
              <p className="text-xs text-foreground-subtle">Capstone Project</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleHistory}
              className="border-input-border hover:border-primary hover:bg-primary/5"
            >
              <History className="h-4 w-4 mr-2" />
              {isHistoryOpen ? "Hide History" : "Show History"}
            </Button>
            <div className="text-sm text-foreground-muted">
              Ready to generate
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background-surface">
          <div className="px-4 py-2 space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onToggleHistory();
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start border-input-border hover:border-primary hover:bg-primary/5"
            >
              <History className="h-4 w-4 mr-2" />
              {isHistoryOpen ? "Hide History" : "Show History"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;