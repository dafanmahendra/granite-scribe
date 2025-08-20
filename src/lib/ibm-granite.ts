// Mock IBM Granite AI Integration
// In a real implementation, this would connect to IBM Watson or Granite API

export interface GraniteResponse {
  success: boolean;
  text: string;
  error?: string;
  metadata?: {
    model: string;
    tokens: number;
    processingTime: number;
  };
}

// Mock delay to simulate API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock responses for demonstration
const mockResponses = [
  "I'm IBM Granite AI, a powerful language model designed to assist with various tasks including text generation, analysis, and creative writing. How can I help you today?",
  
  "As an AI assistant, I can help you with a wide range of tasks including:\n\n• Content creation and writing\n• Data analysis and insights\n• Code generation and debugging\n• Research and information gathering\n• Creative brainstorming\n• Technical documentation\n\nWhat specific task would you like assistance with?",
  
  "I understand you're working on your IBM Capstone project. This is an excellent opportunity to showcase your skills in AI integration and full-stack development. The combination of React frontend with AI-powered backend demonstrates modern software engineering practices.\n\nWould you like me to help you brainstorm additional features or discuss the technical architecture?",
  
  "For your capstone project, consider implementing these advanced features:\n\n1. **Conversation Memory**: Allow the AI to reference previous messages in the conversation\n2. **Export Functionality**: Let users save conversations as PDF or text files\n3. **Prompt Templates**: Pre-built prompts for common use cases\n4. **Analytics Dashboard**: Track usage metrics and popular queries\n5. **Multi-language Support**: Expand accessibility to global users\n\nWhich of these interests you most?",
  
  "The Netflix-inspired dark theme you've chosen is excellent for an AI interface. Dark themes reduce eye strain during extended use and create a professional, modern appearance. The red accent color (#E50914) provides strong visual hierarchy and draws attention to important interactive elements.\n\nConsider adding subtle animations and micro-interactions to enhance the user experience further.",
];

// Simulate different response types based on input
const generateContextualResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return mockResponses[0];
  }
  
  if (input.includes('help') || input.includes('what can you do') || input.includes('capabilities')) {
    return mockResponses[1];
  }
  
  if (input.includes('capstone') || input.includes('project') || input.includes('ibm')) {
    return mockResponses[2];
  }
  
  if (input.includes('feature') || input.includes('idea') || input.includes('improve')) {
    return mockResponses[3];
  }
  
  if (input.includes('design') || input.includes('theme') || input.includes('ui') || input.includes('interface')) {
    return mockResponses[4];
  }
  
  // Generate contextual response based on content
  if (input.includes('code') || input.includes('programming')) {
    return `I can help you with coding! Whether you need assistance with React components, Python Flask APIs, database design, or debugging, I'm here to help. What specific coding challenge are you facing?`;
  }
  
  if (input.includes('write') || input.includes('content') || input.includes('blog')) {
    return `I'd be happy to help with content creation! I can assist with:\n\n• Blog posts and articles\n• Technical documentation\n• Marketing copy\n• Academic writing\n• Creative writing\n\nWhat type of content would you like me to help you create?`;
  }
  
  if (input.includes('data') || input.includes('analysis') || input.includes('research')) {
    return `I can assist with data analysis and research tasks! This includes:\n\n• Data interpretation and insights\n• Research methodology guidance\n• Statistical analysis explanation\n• Market research\n• Academic research support\n\nWhat specific area would you like help with?`;
  }
  
  // Default response with some variation
  const defaultResponses = [
    `That's an interesting question! Based on what you've shared, I think there are several ways to approach this. Let me break down some key considerations and potential solutions...`,
    
    `I understand what you're asking about. This is a common challenge that many developers and users face. Here's my perspective on the best approach...`,
    
    `Great question! This touches on some important concepts. Let me provide you with a comprehensive answer that covers the main aspects you should consider...`,
    
    `Thanks for bringing this up! I can definitely help you with this. There are several strategies we could explore, and I'll outline the most effective ones...`,
  ];
  
  const randomDefault = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  return randomDefault + `\n\nRegarding "${userInput}" - could you provide a bit more context about what specific aspect you'd like me to focus on? This will help me give you a more targeted and useful response.`;
};

/**
 * Mock function to simulate IBM Granite AI text generation
 * In a real implementation, this would make an API call to IBM Watson or Granite
 */
export async function generateText(prompt: string): Promise<GraniteResponse> {
  try {
    // Simulate API processing time
    const processingTime = 1000 + Math.random() * 2000; // 1-3 seconds
    await delay(processingTime);
    
    // Simulate occasional API errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error("Rate limit exceeded. Please try again in a moment.");
    }
    
    // Generate response based on input
    const responseText = generateContextualResponse(prompt);
    
    return {
      success: true,
      text: responseText,
      metadata: {
        model: "IBM Granite-13B-Chat",
        tokens: Math.floor(responseText.length / 4), // Rough token estimation
        processingTime: Math.floor(processingTime),
      }
    };
    
  } catch (error) {
    return {
      success: false,
      text: "",
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Mock function to analyze text
 */
export async function analyzeText(text: string): Promise<GraniteResponse> {
  try {
    await delay(800 + Math.random() * 1200);
    
    const wordCount = text.split(/\s+/).length;
    const charCount = text.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    const analysisResult = `**Text Analysis Results:**
    
**Statistics:**
• Word count: ${wordCount}
• Character count: ${charCount}
• Sentences: ${sentences}
• Average words per sentence: ${Math.round(wordCount / sentences)}

**Content Insights:**
• Tone: ${wordCount > 100 ? 'Formal' : 'Conversational'}
• Complexity: ${sentences > 10 ? 'Complex' : 'Simple'}
• Readability: ${wordCount / sentences < 15 ? 'High' : 'Moderate'}

**Suggestions:**
${wordCount < 50 ? '• Consider expanding with more detail' : '• Content length is appropriate'}
${sentences < 3 ? '• Add more supporting sentences' : '• Good sentence variety'}`;

    return {
      success: true,
      text: analysisResult,
      metadata: {
        model: "IBM Granite-Analyzer",
        tokens: Math.floor(analysisResult.length / 4),
        processingTime: 800,
      }
    };
    
  } catch (error) {
    return {
      success: false,
      text: "",
      error: error instanceof Error ? error.message : "Analysis failed",
    };
  }
}

/**
 * Mock function to generate cover letters
 */
export async function generateCoverLetter(position: string, skills: string): Promise<GraniteResponse> {
  try {
    // Simulate API processing time
    const processingTime = 2000 + Math.random() * 1500; // 2-3.5 seconds
    await delay(processingTime);
    
    // Simulate occasional API errors (3% chance)
    if (Math.random() < 0.03) {
      throw new Error("Cover letter generation service temporarily unavailable. Please try again.");
    }
    
    // Generate a professional cover letter template
    const coverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at your esteemed organization. With my comprehensive background and passion for excellence, I am confident that I would be a valuable addition to your team.

Key Qualifications:
${skills.split(',').map((skill, index) => `• ${skill.trim()}`).join('\n')}

Throughout my career, I have consistently demonstrated the ability to deliver exceptional results while maintaining the highest standards of professionalism. My experience has equipped me with both the technical expertise and collaborative mindset necessary to excel in the ${position} role.

I am particularly drawn to this opportunity because it aligns perfectly with my career goals and allows me to contribute meaningfully to your organization's mission. I am excited about the prospect of bringing my unique perspective and proven track record to help drive your team's continued success.

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your organization. Thank you for considering my application, and I look forward to hearing from you soon.

Sincerely,
[Your Name]

---
Generated by AI Job Assistant - Supporting SDG #8: Decent Work and Economic Growth`;

    return {
      success: true,
      text: coverLetter,
      metadata: {
        model: "IBM Granite-CoverLetter",
        tokens: Math.floor(coverLetter.length / 4),
        processingTime: Math.floor(processingTime),
      }
    };
    
  } catch (error) {
    return {
      success: false,
      text: "",
      error: error instanceof Error ? error.message : "Cover letter generation failed",
    };
  }
}

/**
 * Get available models (mock data)
 */
export function getAvailableModels() {
  return [
    {
      id: "granite-13b-chat",
      name: "IBM Granite 13B Chat",
      description: "General purpose conversational AI model",
      maxTokens: 4096,
    },
    {
      id: "granite-7b-instruct",
      name: "IBM Granite 7B Instruct",
      description: "Instruction-following model for specific tasks",
      maxTokens: 2048,
    },
    {
      id: "granite-analyzer",
      name: "IBM Granite Analyzer",
      description: "Specialized model for text analysis and insights",
      maxTokens: 1024,
    }
  ];
}