import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // Mengimpor Landing Page kita yang keren
import AssistantPage from './AssistantPage'; // Mengimpor halaman Asisten AI yang baru
import NotFound from './NotFound'; // Halaman untuk URL yang tidak ditemukan

// Komponen ini sekarang menjadi "Sutradara" atau "Router" utama aplikasi
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman utama ("/") akan menampilkan LandingPage */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rute untuk "/assistant" akan menampilkan halaman Asisten AI */}
        <Route path="/assistant" element={<AssistantPage />} />

        {/* Rute untuk halaman lain yang tidak ada akan menampilkan halaman 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
