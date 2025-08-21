import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Users, TrendingUp, BarChart3, Globe, Loader2 } from 'lucide-react';

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
  const backgroundImageUrl = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

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

// SDG Data Section dengan data real-time dari World Bank API
const SdgDataSection = () => {
  const [economicData, setEconomicData] = useState({
    gdpGrowth: null,
    unemploymentRate: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Fetch data dari World Bank API untuk Indonesia
    const fetchEconomicData = async () => {
      try {
        setEconomicData(prev => ({ ...prev, loading: true, error: null }));
        
        // GDP Growth Rate - Indonesia (NY.GDP.MKTP.KD.ZG)
        const gdpResponse = await fetch(
          'https://api.worldbank.org/v2/country/ID/indicator/NY.GDP.MKTP.KD.ZG?format=json&date=2022:2023&per_page=5'
        );
        
        // Unemployment Rate - Indonesia (SL.UEM.TOTL.ZS)  
        const unemploymentResponse = await fetch(
          'https://api.worldbank.org/v2/country/ID/indicator/SL.UEM.TOTL.ZS?format=json&date=2022:2023&per_page=5'
        );

        if (!gdpResponse.ok || !unemploymentResponse.ok) {
          throw new Error('Failed to fetch economic data');
        }

        const gdpData = await gdpResponse.json();
        const unemploymentData = await unemploymentResponse.json();

        // Extract latest available data
        const latestGdp = gdpData[1]?.find(item => item.value !== null)?.value;
        const latestUnemployment = unemploymentData[1]?.find(item => item.value !== null)?.value;

        setEconomicData({
          gdpGrowth: latestGdp ? parseFloat(latestGdp).toFixed(2) : null,
          unemploymentRate: latestUnemployment ? parseFloat(latestUnemployment).toFixed(1) : null,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching economic data:', error);
        setEconomicData(prev => ({
          ...prev,
          loading: false,
          error: 'Gagal memuat data ekonomi'
        }));
      }
    };

    fetchEconomicData();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-900/30 text-blue-300 border-blue-800">
            Data Real-time
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Kondisi Ekonomi Indonesia Saat Ini
          </h2>
          <p className="text-md md:text-lg max-w-3xl mx-auto text-gray-400 leading-relaxed">
            Data terkini dari World Bank yang menunjukkan progress Indonesia dalam mencapai SDG #8: 
            Decent Work and Economic Growth
          </p>
        </div>

        {economicData.loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <span className="ml-3 text-white">Memuat data ekonomi...</span>
          </div>
        ) : economicData.error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{economicData.error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-800/50 hover:border-green-600/50 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 bg-green-800/30 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  Pertumbuhan GDP
                </CardTitle>
                <p className="text-sm text-gray-400">Indonesia (Tahunan)</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {economicData.gdpGrowth ? `${economicData.gdpGrowth}%` : 'N/A'}
                </div>
                <p className="text-sm text-gray-300">
                  Pertumbuhan ekonomi menunjukkan kemampuan negara menciptakan lapangan kerja baru
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-800/50 hover:border-blue-600/50 transition-all duration-300">
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-16 h-16 bg-blue-800/30 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-xl font-bold text-white">
                  Tingkat Pengangguran
                </CardTitle>
                <p className="text-sm text-gray-400">Indonesia (% dari total angkatan kerja)</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {economicData.unemploymentRate ? `${economicData.unemploymentRate}%` : 'N/A'}
                </div>
                <p className="text-sm text-gray-300">
                  Target SDG #8 adalah mencapai full employment dan decent work untuk semua
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-900/50 rounded-full px-4 py-2">
            <Globe className="h-4 w-4" />
            Data bersumber dari World Bank Open Data API
          </div>
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
      <SdgDataSection />
      <LandingFooter />
    </main>
  );
};

export default LandingPage;
