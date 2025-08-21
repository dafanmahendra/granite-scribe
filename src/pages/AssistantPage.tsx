import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Copy, Download, FileText, User, Briefcase, GraduationCap, History, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { generateText } from '@/lib/ibm-granite';
import { HistorySidebar } from '@/components/HistorySidebar';
import { SavedApplication, loadCoverLetters, saveCoverLetter, deleteCoverLetter } from '@/lib/storage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Halaman Asisten AI dengan Prompt yang sudah di-tuning
const AssistantPage = () => {
  const navigate = useNavigate();
  // Untuk "menandai" area hasil yang mau dijadikan PDF
  const resultCardRef = useRef<HTMLDivElement>(null);
  
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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<SavedApplication[]>([]);

  useEffect(() => {
    setHistory(loadCoverLetters());
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoadFromHistory = (app: SavedApplication) => {
    setFormData({
      jobTitle: app.jobTitle,
      companyName: app.companyName,
      mySkills: app.mySkills,
      experienceLevel: app.experienceLevel,
      education: app.education,
      whyInterested: app.whyInterested,
      achievements: app.achievements,
    });
    setGeneratedLetter(app.generatedLetter);
    setIsHistoryOpen(false); // Close sidebar after loading
    toast({
      title: "Loaded from History",
      description: `Loaded cover letter for ${app.jobTitle}.`,
    });
  };

  const handleDeleteFromHistory = (id: string) => {
    deleteCoverLetter(id);
    setHistory(loadCoverLetters()); // Refresh history state
    toast({
      title: "Deleted from History",
      description: "The saved cover letter has been deleted.",
      variant: "destructive",
    });
  };

  const handleSaveToHistory = () => {
    if (!generatedLetter) {
      toast({
        title: "Cannot Save",
        description: "Please generate a cover letter first.",
        variant: "destructive",
      });
      return;
    }

    const applicationToSave = {
      ...formData,
      generatedLetter,
    };

    saveCoverLetter(applicationToSave);
    setHistory(loadCoverLetters()); // Refresh history
    toast({
      title: "Saved!",
      description: "Your cover letter has been saved to the history.",
    });
  };

  // --- STRATEGI BARU: FEW-SHOT PROMPTING ---
  // Memberikan contoh perfect agar AI meniru gayanya, bukan memberi banyak aturan
  const buildAIPrompt = () => {
    return `
Anda adalah seorang penulis profesional yang ahli dalam membuat surat lamaran kerja formal dalam Bahasa Indonesia.
Tugas Anda adalah menulis surat lamaran baru berdasarkan "DATA KANDIDAT BARU" dengan meniru gaya bahasa dan struktur dari "CONTOH SURAT LAMARAN YANG BAIK".

---
**CONTOH SURAT LAMARAN YANG BAIK:**

Dengan hormat,

Sehubungan dengan informasi yang saya peroleh mengenai lowongan pada posisi Senior Data Analyst di PT Analitika Data Indonesia, dengan ini saya bermaksud untuk mengajukan lamaran.

Sebagai seorang profesional dengan pengalaman lebih dari lima tahun di bidang analisis data, saya memiliki rekam jejak yang terbukti dalam menerjemahkan data kompleks menjadi wawasan bisnis yang strategis. Latar belakang pendidikan saya di bidang Statistika memberikan fondasi kuantitatif yang kuat, yang saya padukan dengan keahlian teknis pada SQL, Python (Pandas, Scikit-learn), dan Tableau.

Pada peran saya sebelumnya di PT Visi Digital, saya berhasil memimpin proyek analisis prediktif yang meningkatkan efisiensi pemasaran sebesar 20%. Pencapaian ini menunjukkan kemampuan saya untuk tidak hanya mengolah data, tetapi juga menggunakannya untuk mendorong hasil bisnis yang nyata.

Saya sangat tertarik untuk bergabung dengan PT Analitika Data Indonesia karena reputasi perusahaan dalam inovasi dan budaya kerja yang berbasis data. Saya yakin keahlian dan semangat saya untuk terus belajar akan menjadi aset berharga bagi tim Anda.

Terima kasih atas waktu dan perhatian Bapak/Ibu. Saya sangat berharap dapat berdiskusi lebih lanjut mengenai bagaimana saya dapat memberikan kontribusi bagi kesuksesan perusahaan.

Hormat saya,
[Nama Kandidat]
---

**DATA KANDIDAT BARU:**
- Posisi yang Dilamar: ${formData.jobTitle}
- Nama Perusahaan: ${formData.companyName || 'Perusahaan yang dituju'}
- Tingkat Pengalaman: ${formData.experienceLevel}
- Keahlian Utama: ${formData.mySkills}
- Latar Belakang Pendidikan: ${formData.education}
- Pencapaian Penting: ${formData.achievements}
- Alasan Ketertarikan: ${formData.whyInterested}

**TUGAS ANDA:**
Sekarang, tuliskan surat lamaran kerja yang baru untuk "DATA KANDIDAT BARU" dengan gaya bahasa, formalitas, dan struktur yang sama persis seperti "CONTOH SURAT LAMARAN YANG BAIK". Hasilkan hanya konten suratnya saja.
`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedLetter('');

    try {
      const prompt = buildAIPrompt();
      const response = await generateText(prompt);
      
      if (response.success && response.text) {
        setGeneratedLetter(response.text);
        toast({
          title: "Berhasil!",
          description: "Surat lamaran berhasil dibuat!",
        });
      } else {
        throw new Error(response.error || 'Gagal membuat surat lamaran');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat surat lamaran. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter);
      toast({
        title: "Tersalin!",
        description: "Surat lamaran berhasil disalin ke clipboard!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Gagal menyalin ke clipboard",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    // 1. Cari elemen yang sudah kita tandai
    const input = resultCardRef.current;
    if (!input) {
      toast({ title: "Error", description: "Tidak dapat menemukan konten untuk diunduh.", variant: "destructive" });
      return;
    }

    toast({ title: "Membuat PDF...", description: "Mohon tunggu sebentar." });

    // 2. Ambil "screenshot" dari elemen tersebut
    html2canvas(input, {
      backgroundColor: '#1a1a1a', // Warna background yang mirip UI
      scale: 2, // Meningkatkan resolusi
    }).then(canvas => {
      // 3. Masukkan screenshot ke dalam file PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Smart filename berdasarkan posisi & company
      const filename = `surat-lamaran-${formData.jobTitle.replace(/\s/g, '-')}-${formData.companyName.replace(/\s/g, '-') || 'perusahaan'}.pdf`;
      pdf.save(filename);
      
      toast({ title: "Berhasil!", description: "PDF berhasil diunduh!" });
    }).catch(error => {
      toast({ title: "Error", description: "Gagal membuat PDF. Silakan coba lagi.", variant: "destructive" });
    });
  };

  const isFormValid = formData.jobTitle && formData.mySkills && formData.experienceLevel;

  return (
    <>
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoad={handleLoadFromHistory}
        onDelete={handleDeleteFromHistory}
      />
      <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white">
        <div className="w-full max-w-4xl relative">
          <div className="absolute -top-4 sm:-top-2 left-0 flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground-subtle hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <div className="absolute -top-4 sm:-top-2 right-0">
            <Button
              variant="ghost"
              onClick={() => setIsHistoryOpen(true)}
              className="text-foreground-subtle hover:text-foreground transition-colors"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </div>

          <div className="bg-black rounded-lg p-8 w-full pt-16">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-light tracking-wider mb-2 uppercase">AI Cover Letter</h1>
            <p className="text-foreground-subtle text-sm sm:text-base">Provide the details below to generate a professional cover letter.</p>
            <Badge variant="outline" className="mt-4 border-border-subtle text-foreground-subtle font-normal">
              Powered by IBM Granite
            </Badge>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sections are now more minimal */}
            <Card className="bg-background-surface border-border-subtle rounded-md">
              <CardHeader>
                <CardTitle className="text-lg font-normal tracking-wide flex items-center text-foreground-muted">
                  <Briefcase className="mr-3 h-4 w-4" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-xs font-light text-foreground-subtle mb-1">
                      Position *
                    </label>
                    <Input id="jobTitle" type="text" value={formData.jobTitle} onChange={(e) => updateFormData('jobTitle', e.target.value)} placeholder="e.g., Frontend Developer" className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground" required />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-light text-foreground-subtle mb-1">
                      Company Name
                    </label>
                    <Input id="companyName" type="text" value={formData.companyName} onChange={(e) => updateFormData('companyName', e.target.value)} placeholder="e.g., Tech Innovations Inc." className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground" />
                  </div>
                </div>
                <div>
                  <label htmlFor="experienceLevel" className="block text-xs font-light text-foreground-subtle mb-1">
                    Experience Level *
                  </label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                    <SelectTrigger className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent className="bg-background-elevated border-border-subtle">
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

            <Card className="bg-background-surface border-border-subtle rounded-md">
              <CardHeader>
                <CardTitle className="text-lg font-normal tracking-wide flex items-center text-foreground-muted">
                  <User className="mr-3 h-4 w-4" />
                  Your Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div>
                  <label htmlFor="mySkills" className="block text-xs font-light text-foreground-subtle mb-1">
                    Key Skills & Technologies *
                  </label>
                  <Textarea id="mySkills" value={formData.mySkills} onChange={(e) => updateFormData('mySkills', e.target.value)} placeholder="e.g., React, TypeScript, Node.js, Problem Solving" className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground" rows={3} required />
                </div>
                <div>
                  <label htmlFor="education" className="block text-xs font-light text-foreground-subtle mb-1">
                    Educational Background
                  </label>
                  <Input id="education" type="text" value={formData.education} onChange={(e) => updateFormData('education', e.target.value)} placeholder="e.g., B.S. in Computer Science" className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground" />
                </div>
                <div>
                  <label htmlFor="achievements" className="block text-xs font-light text-foreground-subtle mb-1">
                    Key Achievements / Projects
                  </label>
                  <Textarea id="achievements" value={formData.achievements} onChange={(e) => updateFormData('achievements', e.target.value)} placeholder="e.g., Led a team of 5, built an e-commerce platform..." className="bg-background border-border-subtle focus:border-foreground focus:ring-foreground text-foreground" rows={3} />
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-light text-base tracking-wider uppercase transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-40" disabled={isLoading || !isFormValid}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-foreground-subtle border-t-primary mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Letter
                </>
              )}
            </Button>
          </form>

          {generatedLetter && (
            <Card className="mt-10 bg-background-surface border-border-subtle rounded-md" ref={resultCardRef}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-normal tracking-wide flex items-center text-foreground-muted">
                    <FileText className="mr-3 h-4 w-4" />
                    Generated Draft
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSaveToHistory} className="border-border-subtle text-foreground-muted hover:bg-background-elevated hover:text-foreground">
                      <Save className="mr-2 h-3 w-3" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-border-subtle text-foreground-muted hover:bg-background-elevated hover:text-foreground">
                      <Copy className="mr-2 h-3 w-3" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} className="border-border-subtle text-foreground-muted hover:bg-background-elevated hover:text-foreground">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-background border border-border-subtle rounded p-4 sm:p-6">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground-muted leading-relaxed">
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
