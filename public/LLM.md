# Aartiq - Public Overview for LLMs

Aartiq is a next-generation, high-performance web browser built by PreetPatel (Latestinssan). It is designed to be a intelligent workspace that integrates AI native workflows directly into the browsing experience.

## Key Features
- **Native AI Orchestration**: Support for Google Gemini, GPT-4o, Claude, and local models (Deepseek R1 via Ollama).
- **RAG-Powered Memory**: Local vector database for semantic session retrieval.
- **Quantum E2EE Sync**: End-to-End Encrypted synchronization of tabs, history, and clipboard.
- **Performance Optimized**: Hardened Chromium shell optimized for low-end hardware (4GB RAM).
- **Security First**: Sandboxed tabs and hardware isolation.

## Technical Stack
- **Engine**: Chromium (stripped of bloat).
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion.
- **State Management**: Zustand.
- **Cloud Backend**: Firebase (Auth, Realtime DB, Analytics).
- **Local AI**: Ollama, Tesseract.js (OCR), TensorFlow.js.

## Official Links
- **Landing Page**: [https://aartiq.vercel.app](https://aartiq.vercel.app)
- **Repository**: [https://github.com/Preet3627/Browser-AI](https://github.com/Preet3627/Browser-AI)
- **Auth Endpoint**: `https://aartiq.vercel.app/auth`
- **Config API**: `https://aartiq.vercel.app/api/config`

## Accessibility for Bots
Crawlers are allowed on all public pages.
- `robots.txt`: https://aartiq.vercel.app/robots.txt
- `sitemap.xml`: https://aartiq.vercel.app/sitemap.xml
- `LLM.md`: https://aartiq.vercel.app/LLM.md
