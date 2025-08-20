# IBM Granite AI - Capstone Project

A sophisticated web application integrating IBM Granite AI for text generation and analysis, featuring a Netflix-inspired dark theme interface.

## 🎯 Project Overview

This IBM Capstone project demonstrates advanced fullstack development skills with AI integration. The application provides a sleek, professional interface for interacting with IBM's Granite AI model through a chat-like interface with persistent conversation history.

## ✨ Key Features

- **🤖 IBM Granite AI Integration**: Mock implementation ready for real IBM Watson/Granite API
- **🎨 Netflix-Inspired Dark Theme**: Premium dark interface with red accents (#E50914)
- **💬 Real-time Chat Interface**: Intuitive conversation flow with typing indicators
- **📚 Conversation History**: Persistent chat sessions with search and management
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎭 Smooth Animations**: Elegant transitions and micro-interactions
- **💾 Local Storage**: Client-side data persistence for chat history
- **🔍 Search Functionality**: Find specific conversations and messages
- **⚡ Performance Optimized**: Fast loading with efficient state management

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom design system
- **shadcn/ui** components (customized)
- **Lucide React** for icons
- **React Router** for navigation
- **TanStack Query** for state management

### Design System
- **Color Palette**: Netflix-inspired (Black, Dark Gray, Red accents)
- **Typography**: Clean, modern font hierarchy
- **Animations**: Smooth transitions with CSS custom properties
- **Responsive**: Mobile-first approach with breakpoints

### AI Integration (Mock)
- Mock IBM Granite API responses
- Contextual response generation
- Error handling and loading states
- Extensible for real API integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ibm-granite-capstone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                    # Customized shadcn components
│   ├── ChatInterface.tsx      # Main chat component
│   ├── HistorySidebar.tsx     # Conversation history
│   └── Navbar.tsx            # Navigation bar
├── lib/
│   ├── ibm-granite.ts        # Mock AI integration
│   ├── storage.ts            # LocalStorage utilities
│   └── utils.ts              # Helper functions
├── pages/
│   ├── Index.tsx             # Main application page
│   └── NotFound.tsx          # 404 error page
├── hooks/                    # Custom React hooks
├── index.css                 # Design system & global styles
└── main.tsx                  # Application entry point
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--background: 0 0% 0%;           /* Pure black */
--primary: 348 86% 46%;          /* Netflix red #E50914 */
--foreground: 0 0% 100%;         /* Pure white */

/* Surface Colors */
--background-surface: 0 0% 8%;    /* Dark gray */
--background-elevated: 0 0% 12%;  /* Elevated surface */
--card-elevated: 0 0% 12%;        /* Card background */

/* Interactive Elements */
--input: 0 0% 15%;               /* Input background */
--input-border: 0 0% 25%;        /* Input border */
--border: 0 0% 15%;              /* General borders */
```

### Typography
- **Headings**: Bold, high contrast
- **Body**: Clean, readable with proper line height
- **UI Text**: Subtle variations for hierarchy

### Animations
- **Smooth Transitions**: 0.3s cubic-bezier easing
- **Slide Animations**: Subtle entrance effects
- **Glow Effects**: Red accent glows on interactive elements

## 🔌 API Integration

### Current Implementation (Mock)
The application currently uses mock responses that simulate IBM Granite AI behavior:

```typescript
// lib/ibm-granite.ts
export async function generateText(prompt: string): Promise<GraniteResponse>
```

### Real IBM Integration
To connect to actual IBM Watson/Granite:

1. **Install IBM SDK**
   ```bash
   npm install ibm-watson @ibm-cloud/watsonx-ai
   ```

2. **Update Environment Variables**
   ```bash
   # Add to Supabase Edge Function Secrets
   IBM_API_KEY=your_api_key
   IBM_SERVICE_URL=your_service_url
   ```

3. **Replace Mock Functions**
   Update `lib/ibm-granite.ts` with real API calls

## 📊 Features in Detail

### Chat Interface
- **Real-time messaging** with smooth animations
- **Typing indicators** during AI processing
- **Message timestamps** and user identification
- **Auto-scroll** to latest messages
- **Keyboard shortcuts** (Enter to send, Shift+Enter for new line)

### History Management
- **Persistent storage** using localStorage
- **Search functionality** across all conversations
- **Session management** with creation/deletion
- **Automatic cleanup** to prevent storage bloat
- **Export capabilities** for data portability

### Responsive Design
- **Mobile-optimized** sidebar with overlay
- **Adaptive layouts** for different screen sizes
- **Touch-friendly** interface elements
- **Optimized typography** scaling

## 🔒 Privacy & Data

- **Local Storage**: All conversations stored client-side
- **No External Tracking**: Privacy-focused implementation  
- **Data Export**: Users can export their conversation history
- **Clear Data**: Option to reset all stored information

## 🚀 Deployment

### Lovable Platform
1. Visit the [Lovable Project](https://lovable.dev/projects/f347ad5a-18d3-49f4-8e53-5c11c50c4d80)
2. Click Share → Publish
3. Optional: Connect custom domain in Project Settings

### Manual Deployment
```bash
npm run build
# Deploy 'dist' folder to your hosting provider
```

## 🎓 Learning Outcomes

This capstone project demonstrates:

- **Full-stack Development**: React frontend with AI backend integration
- **Modern UI/UX**: Netflix-inspired design with accessibility considerations
- **State Management**: Complex application state with persistent storage
- **API Integration**: Mock implementation ready for production APIs
- **Performance Optimization**: Efficient rendering and data handling
- **Responsive Design**: Mobile-first, cross-device compatibility
- **Code Architecture**: Clean, maintainable, and scalable code structure

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is part of an IBM Capstone program and is intended for educational purposes.

---

**Built with ❤️ for IBM Capstone Program**
