// Interface untuk respons, agar kode kita tetap rapi
export interface GraniteResponse {
  success: boolean;
  text: string;
  error?: string;
}

// Real IBM Granite API integration via Vercel Edge Function
export async function generateText(prompt: string): Promise<GraniteResponse> {
  try {
    console.log("Calling IBM Granite API via Vercel Edge Function...");
    
    // Detect if we're in local development
    const isLocal = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' ||
                   window.location.port === '8080' ||
                   !window.location.hostname.includes('vercel.app');
    
    if (isLocal) {
      // Local development fallback - simulate API response
      console.log("Local development detected - using simulated response");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      return {
        success: true,
        text: `[SIMULASI LOCAL DEV]

Dengan hormat,

Saya tertarik untuk mengajukan lamaran kerja untuk posisi ${prompt.includes('Posisi yang Dilamar:') ? prompt.split('Posisi yang Dilamar:')[1]?.split('\n')[0]?.trim() || 'yang tersedia' : 'yang tersedia'} di perusahaan Anda. 

Dengan latar belakang pendidikan dan pengalaman yang saya miliki, saya yakin dapat memberikan kontribusi yang berarti bagi perusahaan. Keahlian yang saya kuasai telah terbukti melalui berbagai pencapaian yang telah saya raih selama berkarier.

Saya sangat antusias untuk dapat bergabung dengan tim dan berkontribusi dalam mencapai tujuan perusahaan. Terlampir adalah CV saya untuk pertimbangan lebih lanjut.

Terima kasih atas waktu dan perhatian yang diberikan. Saya berharap dapat segera mendapat kesempatan untuk berdiskusi lebih lanjut mengenai bagaimana saya dapat berkontribusi bagi perusahaan.

Hormat saya,
[Nama Anda]

[CATATAN: Ini adalah respons simulasi untuk development lokal. Deploy ke Vercel untuk menggunakan IBM Granite API yang sesungguhnya.]`,
      };
    }
    
    // Call our Vercel Edge Function at /api/generate (production only)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse successful response
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("IBM Granite API Error:", error);
    return {
      success: false,
      text: "",
      error: `Failed to generate cover letter: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
