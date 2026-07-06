import { NextResponse } from "next/server";

const docsPages = [
  { slug: "getting-started", title: "Installation Guide", description: "Complete installation instructions for Windows, macOS, Linux, and Android. Includes setup for AI providers (Gemini, OpenAI, Anthropic, Ollama)." },
  { slug: "keyboard-shortcuts", title: "Keyboard Shortcuts", description: "Complete list of keyboard shortcuts for navigation, search, AI chat, tabs, and browser controls." },
  { slug: "overview", title: "Project Overview", description: "Architecture overview, feature summary, and technology stack." },
  { slug: "components", title: "UI Components", description: "React component library and UI documentation." },
  { slug: "changelog", title: "Changelog", description: "Version history and release notes." },
  { slug: "cloud-sync", title: "Cloud Sync", description: "End-to-end encrypted cross-device synchronization, WiFi P2P pairing, and mobile app integration." },
  { slug: "ai-commands", title: "AI Commands Reference", description: "Canonical JSON-first AI command reference including navigation, browser control, OCR, scheduling, automation, and plugin commands." },
  { slug: "security", title: "Security Model", description: "Triple-lock security architecture, E2EE encryption, permission levels, and privacy features." },
  { slug: "automation", title: "Automation Guide", description: "Background task scheduling, cron expressions, task queue management, and sleep/wake recovery." },
  { slug: "native-api", title: "Native API Reference", description: "JavaScript APIs for desktop automation, robot service, clipboard, screenshots, and system integration." },
  { slug: "deep-links", title: "Deep Links Documentation", description: "URL scheme support (comet-browser://) for launching browser, executing commands, and opening specific pages." },
  { slug: "plugins", title: "Plugin System", description: "Native plugin architecture, plugin lifecycle, command registration, event hooks, and plugin SDK." },
  { slug: "extensions", title: "Browser Extensions", description: "Extension system for adding custom functionality." },
  { slug: "api-reference", title: "Full API Reference", description: "Complete IPC handlers, preload APIs, and Electron main process modules." },
  { slug: "troubleshooting", title: "Troubleshooting Guide", description: "Common issues and solutions for installation, permissions, AI integration, and sync." },
  { slug: "contributing", title: "Contributing Guide", description: "How to contribute to the project, coding standards, and development setup." },
];

export async function GET() {
  const content = `# Aartiq Documentation

## Overview

Aartiq is an open-source, privacy-focused AI-integrated browser with native AI orchestration, background scheduling, and hardware-level automation. It supports Windows, macOS, Linux, and Android.

- Website: https://aartiq.vercel.app
- GitHub: https://github.com/Preet3627/Aartiq
- Documentation: https://aartiq.vercel.app/docs
- License: MIT

---

## Documentation Index

${docsPages.map(page => `### ${page.title}
- URL: /docs/${page.slug === "" ? "" : page.slug}
- Description: ${page.description}`).join("\n\n")}

---

## Key Features

1. **AI Agent Control**: Natural language commands for browser automation
2. **Local LLM Support**: Ollama integration for offline AI processing
3. **Shell Command Execution**: Safe shell command execution with permission system
4. **Background Scheduling**: Task scheduling even when browser is closed
5. **Triple-Lock Security**: E2EE, permission levels, and audit logging
6. **Cross-Device Sync**: WiFi P2P and encrypted cloud sync
7. **PDF Generation**: JSON-based PDF template system
8. **Plugin System**: Native plugin architecture for extensibility
9. **OCR Capabilities**: Native-first screen recognition and cross-app element clicking
10. **Open Source**: Full source code available on GitHub

---

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Desktop**: Electron, native Node.js modules
- **Mobile**: Flutter, Dart
- **AI**: Google Gemini, OpenAI GPT, Anthropic Claude, Ollama
- **Security**: AES-256-GCM, RSA-4096, PBKDF2

---

## AI Command Format

Aartiq uses structured JSON commands for reliable parsing:

\`\`\`json
{
  "command": "COMMAND_NAME",
  "params": {
    "key": "value"
  }
}
\`\`\`

Supported commands: NAVIGATE, SEARCH, WEB_SEARCH, RELOAD, GO_BACK, GO_FORWARD, READ_PAGE_CONTENT, LIST_OPEN_TABS, CLICK_ELEMENT, FIND_AND_CLICK, FILL_FORM, CREATE_PDF_JSON, CREATE_FILE_JSON, SHELL_COMMAND, SET_VOLUME, SET_BRIGHTNESS, OPEN_APP, OCR_SCREEN, OCR_COORDINATES, CLICK_APP_ELEMENT, SCHEDULE_TASK, LIST_AUTOMATIONS, DELETE_AUTOMATION, THINK, PLAN, PLUGIN_COMMAND

---

## Contact & Support

- GitHub Issues: https://github.com/Preet3627/Aartiq/issues
- Releases: https://github.com/Preet3627/Aartiq/releases
- License: MIT
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
