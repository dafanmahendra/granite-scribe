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

// Halaman Asisten AI dengan Prompt yang sudah di-tuning
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

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- PERUBAHAN UTAMA DI SINI ---
  // Fungsi ini sekarang memberikan instruksi yang jauh lebih detail kepada AI.
  const buildAIPrompt = () => {
    return `
Anda adalah seorang konsultan karier dan penulis ahli yang berspesialisasi dalam surat lamaran kerja (cover letter) untuk pasar profesional di Indonesia. Tugas Anda adalah membuat draf surat lamaran yang formal, meyakinkan, dan sangat personal berdasarkan informasi berikut.

**Informasi Kandidat:**
- **Posisi yang Dilamar:** ${formData.jobTitle}
- **Nama Perusahaan:** ${formData.companyName || 'Perusahaan yang dituju'}
- **Tingkat Pengalaman:** ${formData.experienceLevel}
- **Keahlian Utama:** ${formData.mySkills}
- **Latar Belakang Pendidikan:** ${formData.education}
- **Pencapaian Penting:** ${formData.achievements}
- **Alasan Ketertarikan:** ${formData.whyInterested}

**Instruksi Penulisan:**
1.  **Gaya Bahasa:** Gunakan Bahasa Indonesia yang formal, profesional, dan modern. Nada tulisan harus percaya diri namun tetap rendah hati.
2.  **Struktur Naratif:** Jangan hanya mendaftar keahlian. Rangkai sebuah narasi yang menghubungkan keahlian (${formData.mySkills}) dengan kebutuhan spesifik untuk posisi ${formData.jobTitle}.
3.  **Tonjolkan Pencapaian:** Gunakan pencapaian (${formData.achievements}) sebagai bukti nyata dari kemampuan kandidat. Jelaskan secara singkat bagaimana pencapaian tersebut menunjukkan nilai yang bisa dibawa ke perusahaan.
4.  **Personalisasi:** Jika nama perusahaan (${formData.companyName}) disebutkan, personalisasi surat tersebut. Sebutkan alasan ketertarikan (${formData.whyInterested}) untuk menunjukkan bahwa kandidat telah melakukan riset.
5.  **Hindari Kalimat Generik:** Jangan gunakan frasa-frasa klise seperti "Saya adalah seorang pekerja keras". Ganti dengan contoh nyata dari informasi yang diberikan.
6.  **Format:** Hasilkan hanya konten surat lamaran, mulai dari "Dengan hormat," hingga "Hormat saya,".

Tolong hasilkan draf terbaik yang akan membuat manajer perekrutan terkesan.
`;
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
            <p className="text-gray-400">Isi detail di bawah dan biarkan AI meracik surat lamaran terbaikmu.</p>
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
                  Informasi Pekerjaan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-300 mb-2">
                      Posisi yang Dilamar *
                    </label>
                    <Input id="jobTitle" type="text" value={formData.jobTitle} onChange={(e) => updateFormData('jobTitle', e.target.value)} placeholder="Contoh: Frontend Developer" className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" required />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                      Nama Perusahaan
                    </label>
                    <Input id="companyName" type="text" value={formData.companyName} onChange={(e) => updateFormData('companyName', e.target.value)} placeholder="Contoh: PT Teknologi Maju" className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" />
                  </div>
                </div>
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-300 mb-2">
                    Tingkat Pengalaman *
                  </label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white">
                      <SelectValue placeholder="Pilih tingkat pengalamanmu" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
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
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="mr-2 h-5 w-5" />
                  Latar Belakangmu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="mySkills" className="block text-sm font-medium text-gray-300 mb-2">
                    Keahlian & Teknologi Utama *
                  </label>
                  <Textarea id="mySkills" value={formData.mySkills} onChange={(e) => updateFormData('mySkills', e.target.value)} placeholder="Contoh: React, TypeScript, Node.js, Problem Solving, Team Leadership" className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" rows={3} required />
                </div>
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-300 mb-2">
                    Latar Belakang Pendidikan
                  </label>
                  <Input id="education" type="text" value={formData.education} onChange={(e) => updateFormData('education', e.target.value)} placeholder="Contoh: S1 Teknik Informatika" className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" />
                </div>
                <div>
                  <label htmlFor="achievements" className="block text-sm font-medium text-gray-300 mb-2">
                    Pencapaian / Proyek Penting
                  </label>
                  <Textarea id="achievements" value={formData.achievements} onChange={(e) => updateFormData('achievements', e.target.value)} placeholder="Contoh: Memimpin tim 5 orang, membangun platform e-commerce dengan 10k+ pengguna" className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" rows={3} />
                </div>
              </CardContent>
            </Card>

            {/* Motivation Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Motivasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label htmlFor="whyInterested" className="block text-sm font-medium text-gray-300 mb-2">
                    Kenapa kamu tertarik dengan perusahaan/posisi ini?
                  </label>
                  <Textarea id="whyInterested" value={formData.whyInterested} onChange={(e) => updateFormData('whyInterested', e.target.value)} placeholder="Contoh: Saya tertarik dengan pendekatan inovatif perusahaan terhadap teknologi..." className="bg-gray-800 border-gray-600 focus:border-white focus:ring-white text-white" rows={3} />
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
            <Card className="mt-8 bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-white">
                    <FileText className="mr-2 h-5 w-5" />
                    Draf Surat Lamaran
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Copy className="mr-2 h-4 w-4" />
                      Salin
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Download className="mr-2 h-4 w-4" />
                      Unduh
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
