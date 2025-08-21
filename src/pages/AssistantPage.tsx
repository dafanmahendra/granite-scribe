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
      <main className="min-h-screen bg-black flex items-center justify-center p-4 text-white relative">
        <div className="w-full max-w-4xl">
          <div className="absolute top-8 left-8 flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground-muted hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </div>
          <div className="absolute top-8 right-8">
            <Button
              variant="ghost"
              onClick={() => setIsHistoryOpen(true)}
              className="text-foreground-muted hover:text-foreground"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
          </div>

          <div className="bg-black rounded-2xl shadow-xl p-8 border border-gray-800 w-full pt-16">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-light tracking-wider mb-2 uppercase">AI Cover Letter</h1>
              <p className="text-foreground-subtle text-sm sm:text-base">Provide the details below to generate a professional cover letter.</p>
              <Badge variant="outline" className="mt-4 border-border-subtle text-foreground-subtle font-normal">
                Powered by IBM Granite
              </Badge>
            </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal & Job Info Section */}
            <Card className="bg-card border-border-subtle hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Informasi Pekerjaan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-foreground-muted mb-2">
                      Posisi yang Dilamar *
                    </label>
                    <Input id="jobTitle" type="text" value={formData.jobTitle} onChange={(e) => updateFormData('jobTitle', e.target.value)} placeholder="Contoh: Frontend Developer" className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" required />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-foreground-muted mb-2">
                      Nama Perusahaan
                    </label>
                    <Input id="companyName" type="text" value={formData.companyName} onChange={(e) => updateFormData('companyName', e.target.value)} placeholder="Contoh: PT Teknologi Maju" className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" />
                  </div>
                </div>
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-foreground-muted mb-2">
                    Tingkat Pengalaman *
                  </label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                    <SelectTrigger className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground">
                      <SelectValue placeholder="Pilih tingkat pengalamanmu" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="fresh-graduate">Fresh Graduate</SelectItem>
                      <SelectItem value="1-3-years">1-3 Tahun Pengalaman</SelectItem>
                      <SelectItem value="3-5-years">3-5 Tahun Pengalaman</SelectItem>
                      <SelectItem value="5-plus-years">5+ Tahun Pengalaman</SelectItem>
                      <SelectItem value="senior">Profesional Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Background Section */}
            <Card className="bg-card border-border-subtle hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <User className="mr-2 h-5 w-5" />
                  Latar Belakangmu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="mySkills" className="block text-sm font-medium text-foreground-muted mb-2">
                    Keahlian & Teknologi Utama *
                  </label>
                  <Textarea id="mySkills" value={formData.mySkills} onChange={(e) => updateFormData('mySkills', e.target.value)} placeholder="Contoh: React, TypeScript, Node.js, Problem Solving, Team Leadership" className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" rows={3} required />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-foreground-muted mb-2">
                    Latar Belakang Pendidikan
                  </label>
                  <Input id="education" type="text" value={formData.education} onChange={(e) => updateFormData('education', e.target.value)} placeholder="Contoh: S1 Teknik Informatika" className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" />
                </div>
                <div>
                  <label htmlFor="achievements" className="block text-sm font-medium text-foreground-muted mb-2">
                    Pencapaian / Proyek Penting
                  </label>
                  <Textarea id="achievements" value={formData.achievements} onChange={(e) => updateFormData('achievements', e.target.value)} placeholder="Contoh: Memimpin tim 5 orang, membangun platform e-commerce dengan 10k+ pengguna" className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" rows={3} />
                </div>
              </CardContent>
            </Card>

            {/* Motivation Section */}
            <Card className="bg-card border-border-subtle hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Motivasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label htmlFor="whyInterested" className="block text-sm font-medium text-foreground-muted mb-2">
                    Kenapa kamu tertarik dengan perusahaan/posisi ini?
                  </label>
                  <Textarea id="whyInterested" value={formData.whyInterested} onChange={(e) => updateFormData('whyInterested', e.target.value)} placeholder="Contoh: Saya tertarik dengan pendekatan inovatif perusahaan terhadap teknologi..." className="bg-input border-input-border focus:border-input-focus focus:ring-input-focus text-foreground" rows={3} />
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" size="lg" className="w-full bg-white hover:bg-gray-200 text-black font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50" disabled={isLoading || !isFormValid}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-600 border-t-black mr-2"></div>
                  Sedang Meracik...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Buat Surat Lamaran
                </>
              )}
            </Button>
          </form>

          {generatedLetter && (
            <Card className="mt-8 bg-card border-border-subtle hover:border-border transition-all duration-300 shadow-lg hover:shadow-xl" ref={resultCardRef}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-foreground">
                    <FileText className="mr-2 h-5 w-5" />
                    Draf Surat Lamaran
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSaveToHistory} className="border-border text-foreground-muted hover:bg-background-elevated">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-border text-foreground-muted hover:bg-background-elevated">
                      <Copy className="mr-2 h-4 w-4" />
                      Salin
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} className="border-border text-foreground-muted hover:bg-background-elevated">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-background-surface border border-border-subtle rounded-lg p-6">
                  <pre className="whitespace-pre-wrap font-sans text-foreground-muted leading-relaxed">
                    {generatedLetter}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
    </>
  );
};

export default AssistantPage;
