import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Users, TrendingUp } from 'lucide-react';

// Komponen untuk Strip Aksen Gradasi - Monokrom
const AccentStrip = () => (
  <div className="h-1 w-full bg-gradient-to-r from-white via-gray-500 to-black" />
);

// --- PERUBAHAN UTAMA ---
// Hero Section sekarang menggunakan gambar latar blueprint yang elegan.
const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/assistant');
  };

  // URL Gambar Latar dari Pexels (Gratis untuk digunakan)
  const backgroundImageUrl = 'https://images.pexels.com/photos/3184431/pexels-photo-3184431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section 
      className="text-center py-32 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImageUrl})`
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <Badge variant="secondary" className="mb-6 bg-gray-800 text-gray-300 border-gray-700">
          SDG #8 Initiative
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          Dapatkan Pekerjaan Impianmu
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto text-gray-300 leading-relaxed">
          <span className="block mb-4">
            <strong className="text-white">Sustainable Development Goals (SDGs)</strong> adalah 17 tujuan global PBB untuk menciptakan dunia yang lebih baik pada tahun 2030.
          </span>
          <span className="block mb-4">
            Kami berkomitmen pada <strong className="text-white bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">SDG #8: Decent Work and Economic Growth</strong> - memastikan setiap orang memiliki akses ke pekerjaan yang layak dan produktif.
          </span>
          <span className="block">
            Dengan alat bantu AI untuk membuat surat lamaran kerja yang profesional, kami membantu menciptakan peluang kerja yang setara dan mendorong pertumbuhan ekonomi yang inklusif.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleGetStarted}
            size="lg"
            className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-8 text-lg transition-all duration-300 transform hover:scale-105"
          >
            Mulai Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-white text-white hover:bg-white hover:text-black"
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </section>
  );
};

// SDG Info Section dengan tema monokrom
const SdgInfo = () => {
  const features = [
    { icon: Target, title: "Surat Lamaran Profesional", description: "AI kami akan membantumu membuat draf surat lamaran yang menarik perhatian HRD." },
    { icon: Users, title: "Meningkatkan Kepercayaan Diri", description: "Dengan persiapan matang, kamu akan lebih percaya diri saat melamar kerja." },
    { icon: TrendingUp, title: "Mendukung Ekonomi", description: "Setiap orang yang mendapat pekerjaan layak turut berkontribusi pada pertumbuhan ekonomi." }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Misi Kami: SDG #8
          </h2>
          <p className="text-md md:text-lg max-w-3xl mx-auto text-gray-400 leading-relaxed">
            Kami percaya semua orang berhak mendapatkan pekerjaan yang layak. Aplikasi ini adalah langkah kecil kami untuk membantu para pencari kerja bersaing secara adil.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-black border-gray-800 hover:border-white transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white transition-colors">
                  <feature.icon className="h-6 w-6 text-white group-hover:text-black" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Navbar dengan tema monokrom
const LandingNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black/80 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">AI</span>
          </div>
          <span className="text-xl font-bold text-white">Granite Scribe</span>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/assistant')}
          className="text-white hover:bg-gray-800 hover:text-white"
        >
          Launch App
        </Button>
      </div>
    </nav>
  );
};

// Footer dengan tema monokrom
const LandingFooter = () => (
  <footer className="bg-black border-t border-gray-800">
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <p className="text-gray-500 mb-2">
          &copy; 2025 Granite Scribe
        </p>
        <p className="text-sm text-gray-600">
          Supporting UN Sustainable Development Goal #8: Decent Work and Economic Growth
        </p>
      </div>
    </div>
  </footer>
);

// Komponen utama LandingPage
const LandingPage = () => {
  return (
    <main className="min-h-screen bg-black">
      <AccentStrip />
      <LandingNavbar />
      <HeroSection />
      <SdgInfo />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
