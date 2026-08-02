# Aartiq - Public Overview for LLMs

Aartiq is an open-source Electron browser with a built-in AI assistant, developed by PreetPatel (Latestinssan). It integrates AI workflows directly into the browsing experience.

## Key Features
- **Native AI Orchestration**: Support for Google Gemini, GPT-4o, Claude, and local models (Deepseek R1 via Ollama).
- **RAG-Powered Memory**: Local vector database for semantic session retrieval.
- **E2EE Sync**: End-to-End Encrypted synchronization of tabs, history, and clipboard via AES-256-GCM.
- **Performance Optimized**: Electron-based with configurable GPU flags for lower-spec hardware (4GB RAM).
- **Security First**: Sandboxed tabs and hardware isolation.

## Technical Stack
- **Engine**: Chromium (via Electron).
- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion.
- **State Management**: Zustand.
- **Cloud Backend**: Firebase (Auth, Realtime DB, Analytics).
- **Local AI**: Ollama, Tesseract.js (OCR), TensorFlow.js.

## Official Links
- **Landing Page**: [https://aartiq.ponsrischool.in](https://aartiq.ponsrischool.in)
- **Repository**: [https://github.com/Preet3627/Browser-AI](https://github.com/Preet3627/Browser-AI)
- **Auth Endpoint**: `https://aartiq.ponsrischool.in/auth`
- **Config API**: `https://aartiq.ponsrischool.in/api/config`

## Accessibility for Bots
Crawlers are allowed on all public pages.
- `robots.txt`: https://aartiq.ponsrischool.in/robots.txt
- `sitemap.xml`: https://aartiq.ponsrischool.in/sitemap.xml
- `LLM.md`: https://aartiq.ponsrischool.in/LLM.md
