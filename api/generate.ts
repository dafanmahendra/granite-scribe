// Ini adalah "Manajer Pribadi" kita.
// Dia akan berjalan di server, bukan di browser.

import Replicate from "replicate";

// Konfigurasi untuk Vercel Edge Function
export const config = {
  runtime: 'edge',
};

// Fungsi utama yang akan menerima permintaan dari aplikasi kita
export default async function handler(req: Request) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    // Ambil prompt dari data yang dikirim oleh frontend
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), { status: 400 });
    }

    // Inisialisasi Replicate dengan API key dari server environment
    // Perhatikan kita pakai process.env, bukan import.meta.env
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Panggil model IBM Granite
    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 1024,
          temperature: 0.7,
        }
      }
    );

    const resultText = (output as string[]).join("");

    // Kirim hasilnya kembali ke frontend
    return new Response(JSON.stringify({ success: true, text: resultText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Backend Replicate API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
