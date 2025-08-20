const express = require('express');
const cors = require('cors');
const Replicate = require('replicate');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Replicate
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'IBM Granite Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Main endpoint for cover letter generation
app.post('/api/generate-cover-letter', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }

    console.log('🚀 Generating cover letter with IBM Granite...');
    
    // Enhanced prompt engineering for Indonesian cover letters
    const enhancedPrompt = `You are a professional career counselor and expert writer specializing in Indonesian cover letters. Please create a formal, compelling cover letter based on the following information:

${prompt}

Requirements:
- Write in formal Indonesian (Bahasa Indonesia)
- Use professional business letter format
- Make it compelling and tailored to the specific position and company
- Highlight relevant skills and experience effectively
- Keep it concise but impactful (300-500 words)
- Include proper opening and closing
- Make it stand out to hiring managers
- Use respectful and professional tone throughout

Please generate only the cover letter content without additional explanations or meta-commentary.`;

    // Call IBM Granite via Replicate
    const output = await replicate.run(
      process.env.REPLICATE_MODEL || "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: enhancedPrompt,
          max_new_tokens: 1024,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.1,
          system_prompt: "You are a professional Indonesian cover letter writer. Always respond in formal Indonesian language."
        }
      }
    );

    // Process the output
    const resultText = Array.isArray(output) 
      ? output.join("").trim()
      : String(output).trim();

    // Validate the result
    if (!resultText || resultText.length < 50) {
      throw new Error("Generated text is too short or empty");
    }

    const processingTime = Date.now() - startTime;

    console.log(`✅ Cover letter generated successfully in ${processingTime}ms`);

    res.json({
      success: true,
      text: resultText,
      metadata: {
        model: "IBM Granite 3.3-8B Instruct",
        tokens: resultText.split(' ').length,
        processingTime: processingTime
      }
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('❌ Error generating cover letter:', error);
    
    res.status(500).json({
      success: false,
      text: "",
      error: `Failed to generate cover letter: ${error.message}`,
      metadata: {
        model: "IBM Granite 3.3-8B Instruct",
        processingTime: processingTime
      }
    });
  }
});

// Test endpoint for checking IBM Granite connection
app.post('/api/test-granite', async (req, res) => {
  try {
    console.log('🧪 Testing IBM Granite connection...');
    
    const output = await replicate.run(
      process.env.REPLICATE_MODEL || "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt: "Halo, ini adalah test koneksi ke IBM Granite. Tolong respon dalam bahasa Indonesia.",
          max_new_tokens: 100,
          temperature: 0.5
        }
      }
    );

    const resultText = Array.isArray(output) 
      ? output.join("").trim()
      : String(output).trim();

    res.json({
      success: true,
      message: "IBM Granite connection successful!",
      response: resultText
    });

  } catch (error) {
    console.error('❌ IBM Granite connection test failed:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 IBM Granite Backend running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Cover letter API: http://localhost:${PORT}/api/generate-cover-letter`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test-granite`);
});

module.exports = app;
