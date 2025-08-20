import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import LandingNavbar from "@/components/LandingNavbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <Hero />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Landing;