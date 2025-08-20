// Interface untuk respons, agar kode kita tetap rapi
export interface GraniteResponse {
  success: boolean;
  text: string;
  error?: string;
}

// Fungsi utama yang akan dipanggil oleh AssistantPage
export async function generateText(prompt: string): Promise<GraniteResponse> {
  try {
    // Panggil "Manajer Pribadi" kita di /api/generate
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    // Jika respons dari manajer tidak oke, lempar error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from API route');
    }

    // Kembalikan data yang sukses dari manajer
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Frontend API Error:", error);
    return {
      success: false,
      text: "",
      error: (error as Error).message,
    };
  }
}
