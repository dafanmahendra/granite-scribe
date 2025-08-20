import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Copy, Download, FileText, User, Briefcase, GraduationCap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateText } from '@/lib/ibm-granite';

// Komponen untuk Strip Aksen Gradasi - Monokrom
const AccentStrip = () => (
  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-white via-gray-500 to-black" />
);

// Enhanced AI Assistant Page with comprehensive form
const AssistantPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    mySkills: '',
    experienceLevel: '',
    education: '',
    whyInterested: '',
    achievements: ''
  });
  
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const buildAIPrompt = () => {
    return `Create a professional cover letter in Indonesian with the following details:
    
Position: ${formData.jobTitle}
Company: ${formData.companyName || 'the company'}
Skills: ${formData.mySkills}
Experience Level: ${formData.experienceLevel}
Education: ${formData.education}
Interest Reason: ${formData.whyInterested}
Key Achievements: ${formData.achievements}

Please create a formal, professional cover letter that highlights the candidate's skills and experience relevant to the position. Make it compelling and tailored to the job requirements.`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedLetter('');

    try {
      const prompt = buildAIPrompt();
      const response = await generateText(prompt);
      
      if (response.success) {
        setGeneratedLetter(response.text);
        toast({
          title: "Success!",
          description: "Cover letter generated successfully!",
        });
      } else {
        throw new Error(response.error || 'Failed to generate cover letter');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
      // Fallback to example for now
      const exampleResult = `Dengan hormat,

Saya menulis surat ini untuk menyatakan minat saya yang besar untuk bergabung dengan ${formData.companyName || 'perusahaan Anda'} sebagai ${formData.jobTitle}.

Dengan pengalaman ${formData.experienceLevel} dan keahlian di bidang ${formData.mySkills}, saya yakin dapat memberikan kontribusi yang signifikan bagi tim. Latar belakang pendidikan saya dalam ${formData.education} telah membekali saya dengan fondasi yang kuat.

${formData.whyInterested ? `Saya tertarik dengan perusahaan ini karena ${formData.whyInterested}.` : ''}

${formData.achievements ? `Beberapa pencapaian yang saya banggakan: ${formData.achievements}.` : ''}

Saya sangat antusias untuk dapat berdiskusi lebih lanjut tentang bagaimana kontribusi saya dapat mendukung visi dan misi perusahaan.

Terima kasih atas waktu dan perhatiannya.

Hormat saya,
[Nama Anda]`;
      setGeneratedLetter(exampleResult);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      toast({
        title: "Copied!",
        description: "Cover letter copied to clipboard!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const isFormValid = formData.jobTitle && formData.mySkills && formData.experienceLevel;

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 text-white relative">
      <AccentStrip />
      <div className="w-full max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')} 
          className="absolute top-8 left-8 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Button>

        <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">AI Cover Letter Generator</h1>
            <p className="text-gray-400">Fill in the details below and let AI craft your perfect cover letter</p>
            <Badge variant="secondary" className="mt-2 bg-gray-800 text-gray-300">
              Powered by IBM Granite
            </Badge>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal & Job Info Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
                      Position Applied For *
                    </label>
                    <Input
                      id="jobTitle"
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => updateFormData('jobTitle', e.target.value)}
                      placeholder="e.g., Frontend Developer"
                      className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      placeholder="e.g., Tech Corp Indonesia"
                      className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-300 mb-2">
                    Experience Level *
                  </label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="fresh-graduate">Fresh Graduate</SelectItem>
                      <SelectItem value="1-3-years">1-3 Years Experience</SelectItem>
                      <SelectItem value="3-5-years">3-5 Years Experience</SelectItem>
                      <SelectItem value="5-plus-years">5+ Years Experience</SelectItem>
                      <SelectItem value="senior">Senior Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Background Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="mr-2 h-5 w-5" />
                  Your Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="mySkills" className="block text-sm font-medium text-gray-300 mb-2">
                    Key Skills & Technologies *
                  </label>
                  <Textarea
                    id="mySkills"
                    value={formData.mySkills}
                    onChange={(e) => updateFormData('mySkills', e.target.value)}
                    placeholder="e.g., React, TypeScript, Node.js, Problem Solving, Team Leadership"
                    className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-2">
                    Education Background
                  </label>
                  <Input
                    id="education"
                    type="text"
                    value={formData.education}
                    onChange={(e) => updateFormData('education', e.target.value)}
                    placeholder="e.g., Computer Science, Informatics Engineering"
                    className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="achievements" className="block text-sm font-medium text-gray-300 mb-2">
                    Key Achievements / Projects
                  </label>
                  <Textarea
                    id="achievements"
                    value={formData.achievements}
                    onChange={(e) => updateFormData('achievements', e.target.value)}
                    placeholder="e.g., Led a team of 5 developers, Built an e-commerce platform with 10k+ users"
                    className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Motivation Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Motivation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label htmlFor="whyInterested" className="block text-sm font-medium text-gray-300 mb-2">
                    Why are you interested in this company/position?
                  </label>
                  <Textarea
                    id="whyInterested"
                    value={formData.whyInterested}
                    onChange={(e) => updateFormData('whyInterested', e.target.value)}
                    placeholder="e.g., I'm excited about the company's innovative approach to technology and its impact on society"
                    className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Button
              type="submit"
              size="lg"
              className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-600 border-t-black mr-2"></div>
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </form>

          {generatedLetter && (
            <Card className="mt-8 bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white">
                    <FileText className="mr-2 h-5 w-5" />
                    Generated Cover Letter
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap font-sans text-gray-300 leading-relaxed">
                    {generatedLetter}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
};

export default AssistantPage;
