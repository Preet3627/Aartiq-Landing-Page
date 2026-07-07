import { NextResponse } from "next/server";

const BASE = 'https://aartiq.vercel.app';

export async function GET() {
  const content = `# Aartiq

> An open-source, AI-native browser with autonomous agent capabilities, local LLM support (Ollama), permission-gated OS automation, background task scheduling, and E2EE cross-device sync. Built with Electron, Next.js, React, TypeScript, and Flutter. MIT-licensed on GitHub.

Aartiq is a privacy-focused browser that integrates AI directly into the browsing experience. It supports multiple AI providers (Gemini, GPT, Claude, Ollama), can execute OS-level automation through a permission-gated system, schedule background tasks, sync data across devices with end-to-end encryption, and generate PDFs/Excel/PPTX documents from JSON templates. Available on Windows, macOS, Linux, and Android.

## Docs

- [Getting Started](https://aartiq.vercel.app/docs/getting-started): Complete installation instructions for all platforms including AI provider setup (Gemini, OpenAI, Anthropic, Ollama)
- [AI Commands Reference](https://aartiq.vercel.app/docs/ai-commands): Canonical JSON-first AI command reference — navigation, browser control, OCR, scheduling, automation, shell, and plugin commands
- [Security Model](https://aartiq.vercel.app/docs/security): Triple-lock security architecture with E2EE encryption, permission levels, and audit logging
- [Automation Guide](https://aartiq.vercel.app/docs/automation): Background task scheduling with cron expressions, task queue management, and sleep/wake recovery
- [Cloud Sync](https://aartiq.vercel.app/docs/cloud-sync): E2EE cross-device synchronization, WiFi P2P pairing, and mobile app integration
- [Plugin System](https://aartiq.vercel.app/docs/plugins): Native plugin architecture with lifecycle management, command registration, event hooks, and SDK
- [Extensions](https://aartiq.vercel.app/docs/extensions): Chrome-compatible extension system loaded via Electron session
- [Native API Reference](https://aartiq.vercel.app/docs/native-api): JavaScript APIs for desktop automation, robot service, clipboard, screenshots, and system integration
- [API Reference](https://aartiq.vercel.app/docs/api-reference): Complete IPC handlers, preload APIs, and Electron main process modules
- [Architecture Overview](https://aartiq.vercel.app/docs/overview): Component architecture, service layer, communication protocols, and directory layout
- [Troubleshooting Guide](https://aartiq.vercel.app/docs/troubleshooting): Common issues and solutions for installation, permissions, AI integration, and sync
- [Keyboard Shortcuts](https://aartiq.vercel.app/docs/keyboard-shortcuts): Complete keyboard shortcut reference
- [UI Components](https://aartiq.vercel.app/docs/components): React component library and UI documentation
- [Changelog](https://aartiq.vercel.app/docs/changelog): Version history and release notes
- [Deep Links](https://aartiq.vercel.app/docs/deep-links): URL scheme support for launching browser, executing commands, and opening specific pages
- [Contributing Guide](https://aartiq.vercel.app/docs/contributing): How to contribute, coding standards, and development setup

## GitHub

- [Source Repository](https://github.com/Preet3627/Aartiq): MIT-licensed full source code
- [Releases](https://github.com/Preet3627/Aartiq/releases): Pre-built binaries for all platforms
- [Issues](https://github.com/Preet3627/Aartiq/issues): Bug reports and feature requests

## Downloads

- [Download Page](https://aartiq.vercel.app/downloads): Pre-built installers for Windows (.exe, .msix), macOS (.dmg, .zip), Linux (.AppImage, .deb), and Android (.apk)
- [Microsoft Store](https://apps.microsoft.com/detail/9N5Z9R9Z9Z9Z): Windows Store distribution
- [Features](https://aartiq.vercel.app/features): Full feature overview and screenshots

## Key Capabilities

- **AI-Native**: Multi-model AI chat sidebar with Gemini, GPT-4, Claude, Ollama support. RAG memory with local vector database and cross-session persistence
- **AI User Preferences**: Auto-learns user preferences (response style, tone, language, behavior) and persists them across sessions via SAVE_PREFERENCE command
- **OS Automation**: Permission-gated shell command execution, app launching, file operations, and screen OCR
- **Background Scheduler**: Cron-based task scheduling that runs even when the browser window is closed
- **Document Generation**: PDF, Excel (.xlsx), PowerPoint (.pptx), and Word (.docx) generation from JSON/JSX templates
- **Cross-Device**: E2EE WiFi sync between desktop and Android devices. Firebase cloud sync with quantum-resistant encryption
- **Security**: Triple-lock permission system (Normal → Elevated → Critical). AES-256-GCM encryption. Sandboxed automation
- **Plugin System**: Node.js-based plugin SDK with command registration, event hooks, and persistent config storage
- **Extensions**: Chrome manifest v3 extension support via Electron session.defaultSession

## Technology Stack

- Desktop: Electron, Chromium, Node.js
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- Mobile: Flutter, Dart, flutter_inappwebview
- AI SDKs: Vercel AI SDK (OpenAI, Anthropic, Google, Groq, xAI)
- Database: Firebase Realtime DB, IndexedDB, electron-store
- Security: AES-256-GCM, RSA-4096, PBKDF2, Web Crypto API
- macOS: SwiftUI, AppIntents, Apple Intelligence frameworks

## About

- **Type**: SoftwareApplication / OpenSourceBrowser
- **License**: MIT
- **Language**: English
- **Founded**: 2024
- **Author**: Preet3627 (https://github.com/Preet3627)
- **Co-author**: Latestinssan (https://github.com/Latestinssan)
- **Last updated**: 2026-07-07

---

For complete page content, see llms-full.txt: ${BASE}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
