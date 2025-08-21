# Granite Scribe - AI Cover Letter Generator

Professional Indonesian cover letter generator powered by IBM Granite AI with modern UI and real-time economic data integration.

## 🎯 Project Overview

AI-powered cover letter generator that creates professional Indonesian job applications. Features few-shot prompting, real-time economic data from World Bank API, and PDF export functionality.

## Key Features

- **🤖 IBM Granite AI Integration**: Few-shot prompting for natural Indonesian cover letters
- **🎨 Modern Dark UI**: Clean interface with F1-inspired branding
- **� Real-time Economic Data**: Indonesia GDP & unemployment data from World Bank API
- **� PDF Export**: Download cover letters as formatted PDF documents
- **💾 History Management**: Save, load, and manage multiple cover letter drafts
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🇮� Indonesian Language**: Professional formal Indonesian business writing
- **⚡ Fast Performance**: Optimized loading and smooth interactions

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** icons
- **React Router** for navigation

### Features

- **IBM Granite AI** for text generation
- **World Bank API** for economic data
- **html2canvas + jsPDF** for PDF export
- **LocalStorage** for data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/dafanmahendra/granite-scribe.git
   cd granite-scribe
   npm install
   ```

2. **Start development**

   ```bash
   npm run dev
   ```

3. **Open browser**
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
│   ├── ui/                    # shadcn UI components
│   ├── ChatInterface.tsx      # Main cover letter form
│   ├── HistorySidebar.tsx     # Draft history management
│   ├── Benefits.tsx           # SDG benefits display
│   └── Hero.tsx              # Landing page hero
├── lib/
│   ├── ibm-granite.ts        # IBM Granite AI integration
│   ├── storage.ts            # LocalStorage utilities
│   └── utils.ts              # Helper functions
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── Landing.tsx           # Main landing page
│   ├── Assistant.tsx         # Cover letter generator
│   └── NotFound.tsx          # 404 page
└── main.tsx                  # App entry point
```

## 🎨 Design

Dark theme with F1-inspired favicon. Clean, professional interface optimized for Indonesian business use.

## 🔌 AI Integration

Uses IBM Granite AI with few-shot prompting strategy:

- Professional Indonesian cover letter examples
- Context-aware responses
- Natural business language generation

For real IBM integration, update `lib/ibm-granite.ts` with your API credentials.

## 📊 Features

### Cover Letter Generator

- Form-based input for job details and personal information
- AI-powered content generation in formal Indonesian
- Real-time preview of generated content
- Professional business writing standards

### Economic Data Integration

- Live Indonesia economic indicators
- GDP growth rate from World Bank API
- Unemployment statistics
- Supports SDG #8: Decent Work and Economic Growth

### History & Export

- Save multiple cover letter drafts
- Load previous applications
- Export to PDF with professional formatting
- Local storage for privacy

## 🚀 Deployment

Live at: https://granite-scribe.vercel.app

Deploy your own:

```bash
npm run build
# Deploy 'dist' folder to Vercel, Netlify, or any static host
```

## 🎓 About

IBM Capstone project demonstrating:

- AI integration with professional prompting
- Real-time data from external APIs
- Indonesian business writing standards
- Modern React development practices
- PDF generation and export features

---

**Built for IBM Capstone Program - Supporting SDG #8: Decent Work and Economic Growth**
