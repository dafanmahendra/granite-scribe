import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generateCoverLetter } from "@/lib/ibm-granite";
import { toast } from "@/hooks/use-toast";

const Assistant = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!position.trim() || !skills.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both the position and your key skills.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await generateCoverLetter(position, skills);
      if (result.success) {
        setCoverLetter(result.text);
        toast({
          title: "Success!",
          description: "Your cover letter has been generated successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to generate cover letter.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border-subtle bg-background-surface">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="text-foreground-muted hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Cover Letter Generator</h1>
              <p className="text-foreground-muted">Create professional cover letters in seconds</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="bg-card-elevated border-border-subtle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <FileText className="w-5 h-5 text-primary" />
                <span>Job Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  Position Applied For
                </label>
                <Input
                  placeholder="e.g. Senior Software Engineer, Marketing Manager..."
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-input border-input-border text-white placeholder:text-foreground-subtle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground-muted mb-2">
                  Your Key Skills
                </label>
                <Textarea
                  placeholder="List your relevant skills, experiences, and qualifications..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  rows={8}
                  className="bg-input border-input-border text-white placeholder:text-foreground-subtle resize-none"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={isLoading || !position.trim() || !skills.trim()}
                className="w-full bg-primary hover:bg-primary-hover text-white shadow-glow"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="bg-card-elevated border-border-subtle">
            <CardHeader>
              <CardTitle className="text-white">Generated Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              {coverLetter ? (
                <div className="space-y-4">
                  <div className="bg-background-surface p-6 rounded-lg border border-border-subtle">
                    <pre className="whitespace-pre-wrap text-foreground-muted text-sm leading-relaxed font-sans">
                      {coverLetter}
                    </pre>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigator.clipboard.writeText(coverLetter)}
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-foreground-subtle mx-auto mb-4" />
                  <p className="text-foreground-muted">
                    Fill in the form and click "Generate Cover Letter" to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Assistant;