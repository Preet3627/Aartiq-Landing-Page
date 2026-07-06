export interface SearchResult {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  section?: string;
  keywords: string[];
  type: "page" | "section" | "command" | "api" | "guide";
}

export interface SearchIndex {
  pages: SearchResult[];
  lastUpdated: string;
}

export const searchIndex: SearchIndex = {
  lastUpdated: "2026-04-23",
  pages: [
    // CLI Integration
    {
      id: "comet-cli",
      title: "Aartiq CLI",
      description: "Powerful terminal-based browser control and AI querying",
      content: "comet-cli terminal command line interface comet ask search screenshot help npm link sudo native bridge server token authentication ~/.aartiq-token headless control automation",
      url: "/docs/native-api#cli",
      keywords: ["cli", "terminal", "command line", "comet", "ask", "npm link"],
      type: "page"
    },
    // Siri Advanced Intents
    {
      id: "siri-advanced-intents",
      title: "Siri Advanced Intents",
      description: "Finalized zero-setup Siri and Apple Shortcuts integration via AppIntents",
      content: "Siri Advanced Intents AppIntents zero-setup hands-free automation Chat Search Create PDF Navigate Run Command Schedule Task Set Volume Open App Take Screenshot Voice Chat Ask Speak arm64 native Apple Silicon protocol aartiq://",
      url: "/docs/apple-integration#intents",
      keywords: ["Siri", "AppIntents", "Shortcuts", "hands-free", "automation"],
      type: "guide"
    },
    // Getting Started
    {
      id: "getting-started-intro",
      title: "Getting Started",
      description: "Complete installation guide for Aartiq on Windows, macOS, Linux, and Android",
      content: "installation download setup Windows macOS Linux Android API key configuration AI providers Gemini OpenAI Anthropic Claude Groq xAI Ollama Apple Intelligence live model catalogs",
      url: "/docs/getting-started",
      keywords: ["install", "download", "setup", "Windows", "macOS", "Linux", "Android", "API key", "Gemini", "OpenAI", "Anthropic", "Claude", "Groq", "xAI", "Ollama", "Apple Intelligence"],
      type: "page"
    },

    // Keyboard Shortcuts
    {
      id: "keyboard-shortcuts",
      title: "Keyboard Shortcuts",
      description: "Complete list of keyboard shortcuts for Aartiq",
      content: "keyboard shortcuts shortcuts hotkeys key bindings search toggle AI chat sidebar settings navigation tabs close reload refresh find copy paste undo redo zoom in out fullscreen screenshot",
      url: "/docs/keyboard-shortcuts",
      keywords: ["keyboard", "shortcuts", "hotkeys", "key bindings", "⌘K", "Cmd", "Ctrl"],
      type: "page"
    },
    {
      id: "getting-started-download",
      title: "Download Aartiq",
      description: "Download installers for all supported platforms",
      content: "Download Comet.Browser.Setup.exe Windows Aartiq arm64 dmg macOS Apple Silicon Aartiq x64 dmg macOS Intel Comet.Browser.AppImage Linux Comet.Browser.apk Android",
      url: "/docs/getting-started#download",
      section: "Download",
      keywords: ["download", "exe", "dmg", "appimage", "apk"],
      type: "section"
    },
    {
      id: "getting-started-install",
      title: "Install the Application",
      description: "Installation instructions for each platform",
      content: "install Windows macOS Linux Android wizard applications folder",
      url: "/docs/getting-started#install",
      section: "Install",
      keywords: ["install", "installation", "wizard", "applications"],
      type: "section"
    },
    {
      id: "getting-started-setup",
      title: "Initial Setup",
      description: "Configure AI provider and permissions",
      content: "setup configuration API key welcome theme permissions timezone detection live model catalog refresh Apple Intelligence native path macOS",
      url: "/docs/getting-started#setup",
      section: "Setup",
      keywords: ["setup", "configuration", "API key", "permissions", "theme", "model catalog", "Apple Intelligence"],
      type: "section"
    },
    {
      id: "getting-started-mobile",
      title: "Connect Mobile App",
      description: "Control desktop from mobile device",
      content: "mobile app WiFi P2P QR code control notifications automation PDF viewer sync",
      url: "/docs/getting-started#mobile",
      section: "Mobile",
      keywords: ["mobile", "WiFi", "P2P", "QR", "control", "notifications"],
      type: "section"
    },

    // AI Commands
    {
      id: "ai-commands",
      title: "AI Commands Reference",
      description: "Complete list of AI commands for browser automation",
      content: "AI commands reference NAVIGATE SEARCH WEB_SEARCH RELOAD GO_BACK GO_FORWARD READ_PAGE_CONTENT LIST_OPEN_TABS CLICK_ELEMENT FIND_AND_CLICK FILL_FORM CREATE_PDF_JSON CREATE_FILE_JSON SHELL_COMMAND SET_VOLUME SET_BRIGHTNESS OPEN_APP OCR_SCREEN OCR_COORDINATES CLICK_APP_ELEMENT LIST_AUTOMATIONS DELETE_AUTOMATION SCHEDULE_TASK THINK PLAN PLUGIN_COMMAND Apple Intelligence native API macOS native first OCR cross app click",
      url: "/docs/ai-commands",
      keywords: ["AI commands", "NAVIGATE", "SEARCH", "WEB_SEARCH", "RELOAD", "CLICK_ELEMENT", "FIND_AND_CLICK", "SHELL_COMMAND", "CREATE_PDF", "OCR", "SET_VOLUME", "OPEN_APP", "automation", "scheduling", "Apple Intelligence", "native helper"],
      type: "page"
    },
    {
      id: "ai-command-navigate",
      title: "NAVIGATE Command",
      description: "Navigate to a specific URL",
      content: "NAVIGATE url HTTP HTTPS file URL browser navigation",
      url: "/docs/ai-commands#navigation",
      section: "Navigation",
      keywords: ["navigate", "url", "browser", "navigation"],
      type: "command"
    },
    {
      id: "ai-command-shell",
      title: "SHELL_COMMAND",
      description: "Execute terminal commands with safety checks",
      content: "SHELL_COMMAND shell terminal execute command safety permission risk level approval",
      url: "/docs/ai-commands#shell",
      section: "Shell",
      keywords: ["shell", "command", "terminal", "execute", "permission"],
      type: "command"
    },
    {
      id: "ai-command-pdf",
      title: "CREATE_PDF_JSON",
      description: "Generate PDF documents from AI instructions",
      content: "CREATE_PDF_JSON PDF generation document template JSON markdown",
      url: "/docs/ai-commands#pdf",
      section: "PDF",
      keywords: ["PDF", "document", "generate", "template", "JSON"],
      type: "command"
    },
    {
      id: "ai-command-ocr",
      title: "OCR Commands",
      description: "Visual intelligence commands for screen recognition",
      content: "OCR_SCREEN OCR_COORDINATES CLICK_APP_ELEMENT native first OCR screen recognition accessibility text extraction cross app click",
      url: "/docs/ai-commands#ocr",
      section: "Visual Intelligence",
      keywords: ["OCR", "screen", "screenshot", "recognition", "image"],
      type: "command"
    },
    {
      id: "ai-command-scheduling",
      title: "Scheduling Commands",
      description: "Schedule and manage automated tasks",
      content: "SCHEDULE_TASK automation scheduling cron task background service",
      url: "/docs/ai-commands#scheduling",
      section: "Scheduling",
      keywords: ["schedule", "automation", "task", "cron"],
      type: "command"
    },

    // Security
    {
      id: "security",
      title: "Security Model",
      description: "Triple-lock security architecture and privacy features",
      content: "security encryption AES-256-GCM PBKDF2 DOMPurify capability-scoped execution AllowedAction E2EE end-to-end encryption permission levels Visual Sandbox Syntactic Firewall Human-in-the-Loop",
      url: "/docs/security",
      keywords: ["security", "encryption", "AES", "PBKDF2", "DOMPurify", "capability", "E2EE", "permissions", "sandbox", "firewall"],
      type: "page"
    },
    {
      id: "security-visual-sandbox",
      title: "Visual Sandbox",
      description: "Screenshot-based AI perception layer",
      content: "Visual Sandbox screenshot OCR DOM JavaScript injection protection prompt injection",
      url: "/docs/security#visual-sandbox",
      section: "Visual Sandbox",
      keywords: ["sandbox", "screenshot", "OCR", "injection", "protection"],
      type: "section"
    },
    {
      id: "security-syntactic-firewall",
      title: "Syntactic Firewall",
      description: "Command pattern analysis and blocking",
      content: "Syntactic Firewall shell commands patterns blocked monitored rm rf sudo dd fork bomb",
      url: "/docs/security#syntactic-firewall",
      section: "Syntactic Firewall",
      keywords: ["firewall", "shell", "command", "pattern", "blocking"],
      type: "section"
    },
    {
      id: "security-hitl",
      title: "Human-in-the-Loop",
      description: "User approval for critical actions",
      content: "Human-in-the-Loop HITL approval QR code mobile permission low medium high risk",
      url: "/docs/security#hitl",
      section: "Human-in-the-Loop",
      keywords: ["approval", "QR", "mobile", "permission", "risk"],
      type: "section"
    },

    // Automation
    {
      id: "automation",
      title: "Automation Guide",
      description: "Background task scheduling and automation",
      content: "automation scheduling cron background tasks node-cron scheduler task queue retry sleep wake recovery",
      url: "/docs/automation",
      keywords: ["automation", "scheduling", "cron", "tasks", "background", "scheduler"],
      type: "page"
    },
    {
      id: "automation-scheduler",
      title: "Task Scheduler",
      description: "Schedule tasks with cron expressions",
      content: "scheduler cron expression daily hourly weekly monthly schedule task",
      url: "/docs/automation#scheduler",
      section: "Scheduler",
      keywords: ["scheduler", "cron", "schedule", "task"],
      type: "section"
    },
    {
      id: "automation-task-queue",
      title: "Task Queue",
      description: "Priority queue with retry logic",
      content: "task queue priority retry failed error execution",
      url: "/docs/automation#task-queue",
      section: "Task Queue",
      keywords: ["queue", "priority", "retry", "execution"],
      type: "section"
    },
    {
      id: "automation-layer",
      title: "Automation Layer Architecture",
      description: "Cross-platform automation abstraction with native OS support",
      content: "automation layer platform abstraction macOS Windows Linux native first OCR accessibility Vision Windows Media Ocr AT-SPI cross app click",
      url: "/docs/automation#automation-layer",
      section: "Automation Layer",
      keywords: ["automation", "layer", "native", "platform", "macOS", "Windows", "Linux"],
      type: "guide"
    },
    {
      id: "automation-commands",
      title: "Automation Commands",
      description: "List scheduled automation tasks",
      content: "LIST_AUTOMATIONS DELETE_AUTOMATION SCHEDULE_TASK cron automation background service",
      url: "/docs/automation#commands",
      section: "Commands",
      keywords: ["LIST_AUTOMATIONS", "DELETE_AUTOMATION", "SCHEDULE_TASK", "cron"],
      type: "command"
    },

    // Cloud Sync
    {
      id: "cloud-sync",
      title: "Cloud Sync",
      description: "End-to-end encrypted cross-device synchronization",
      content: "cloud sync E2EE encryption WiFi P2P mobile pairing QR code clipboard history tabs",
      url: "/docs/cloud-sync",
      keywords: ["cloud", "sync", "E2EE", "encryption", "WiFi", "P2P", "mobile", "clipboard"],
      type: "page"
    },
    {
      id: "cloud-sync-wifi",
      title: "WiFi P2P Sync",
      description: "Direct device-to-device synchronization",
      content: "WiFi P2P local network UDP WebSocket pairing device discovery",
      url: "/docs/cloud-sync#wifi-p2p",
      section: "WiFi P2P",
      keywords: ["WiFi", "P2P", "local", "network", "UDP", "WebSocket"],
      type: "section"
    },

    // Plugins
    {
      id: "plugins",
      title: "Plugin System",
      description: "Native plugin architecture and development",
      content: "plugins architecture SDK lifecycle load unload enable disable install uninstall command registration event hooks",
      url: "/docs/plugins",
      keywords: ["plugins", "SDK", "architecture", "hooks", "events", "commands"],
      type: "page"
    },
    {
      id: "plugins-sdk",
      title: "Plugin SDK",
      description: "Create plugins using the plugin SDK",
      content: "SDK plugin development JavaScript manifest lifecycle enable disable",
      url: "/docs/plugins#sdk",
      section: "SDK",
      keywords: ["SDK", "development", "manifest", "lifecycle"],
      type: "guide"
    },
    {
      id: "plugins-commands",
      title: "Command Registration",
      description: "Register custom commands in plugins",
      content: "commands register execute plugin command registration",
      url: "/docs/plugins#commands",
      section: "Commands",
      keywords: ["commands", "register", "execute"],
      type: "section"
    },
    {
      id: "plugins-hooks",
      title: "Event Hooks",
      description: "Hook into application events",
      content: "hooks events lifecycle before after on event listener",
      url: "/docs/plugins#hooks",
      section: "Hooks",
      keywords: ["hooks", "events", "listener", "lifecycle"],
      type: "section"
    },
    {
      id: "plugins-api",
      title: "Plugin API Reference",
      description: "Complete plugin API documentation",
      content: "plugin API reference Plugin class methods callAPI emit request readFile writeFile showNotification updateConfig requestPermission",
      url: "/docs/plugins#api",
      section: "API Reference",
      keywords: ["API", "reference", "Plugin", "callAPI", "emit"],
      type: "api"
    },
    {
      id: "plugins-context",
      title: "Command Context",
      description: "Context object for plugin commands",
      content: "CommandContext plugin params logger success error",
      url: "/docs/plugins#context",
      section: "Command Context",
      keywords: ["CommandContext", "context", "params", "logger"],
      type: "api"
    },

    // Native API
    {
      id: "native-api",
      title: "Native API",
      description: "JavaScript APIs for desktop automation",
      content: "native API JavaScript automation robot clipboard screenshot IPC electron main process preload Apple Intelligence Foundation Models Image Playground Writing Tools assistant schemas",
      url: "/docs/native-api",
      keywords: ["API", "JavaScript", "automation", "robot", "clipboard", "screenshot", "IPC", "Electron", "Apple Intelligence", "Foundation Models", "Image Playground", "Writing Tools", "assistant schemas"],
      type: "page"
    },
    {
      id: "native-api-robot",
      title: "Robot Service",
      description: "Desktop automation and control",
      content: "robot service mouse keyboard click type automation external app",
      url: "/docs/native-api#robot",
      section: "Robot",
      keywords: ["robot", "mouse", "keyboard", "click", "automation"],
      type: "api"
    },
    {
      id: "native-api-clipboard",
      title: "Clipboard API",
      description: "Clipboard read and write operations",
      content: "clipboard read write copy paste text image",
      url: "/docs/native-api#clipboard",
      section: "Clipboard",
      keywords: ["clipboard", "copy", "paste", "text"],
      type: "api"
    },
    {
      id: "native-api-apple-intelligence",
      title: "Apple Intelligence Native APIs",
      description: "macOS-only native readiness checks, Foundation Models summaries, and local image generation",
      content: "apple-intelligence-status apple-intelligence-summary apple-intelligence-generate-image Foundation Models Image Playground ImageCreator macOS native Swift helper unsupported disabled model not ready",
      url: "/docs/native-api",
      section: "Apple Intelligence Paths",
      keywords: ["Apple Intelligence", "Foundation Models", "Image Playground", "ImageCreator", "macOS", "Swift", "unsupported", "model not ready"],
      type: "api"
    },
    {
      id: "native-api-apple-advanced-paths",
      title: "Writing Tools and Assistant Schemas",
      description: "Advanced Apple-native integration paths documented for future Comet work",
      content: "Writing Tools assistant schemas App Intents Siri Apple Intelligence native editor integration ImagePlaygroundViewController",
      url: "/docs/native-api",
      section: "Apple Intelligence Paths",
      keywords: ["Writing Tools", "assistant schemas", "App Intents", "Siri", "ImagePlaygroundViewController"],
      type: "guide"
    },

    // Apple Integration
    {
      id: "apple-integration",
      title: "Apple Integration",
      description: "Siri, Apple Intelligence, Shortcuts, Voice Control, and Raycast integration",
      content: "Apple integration Siri Shortcuts URL scheme aartiq:// voice control dictation text-to-speech Raycast Apple Intelligence on-device AI summaries image generation genmoji macOS 15.0 M-series Foundation Models voice chat dictation speech rate",
      url: "/docs/apple-integration",
      keywords: ["Apple", "Siri", "Shortcuts", "Raycast", "voice", "dictation", "speech", "comet-ai URL scheme", "Apple Intelligence", "Foundation Models", "genmoji", "on-device AI"],
      type: "page"
    },
    {
      id: "apple-integration-siri",
      title: "Siri Integration",
      description: "Control Aartiq hands-free using Siri voice commands",
      content: "Siri voice commands Ask Aartiq Search with Aartiq Create PDF Navigate Run Command Schedule Task Set Volume Open App Take Screenshot Voice Chat Ask Speak hands-free voice control",
      url: "/docs/apple-integration#siri",
      section: "Siri Integration",
      keywords: ["Siri", "voice commands", "Ask Aartiq", "hands-free", "voice control"],
      type: "guide"
    },
    {
      id: "apple-integration-shortcuts",
      title: "Apple Shortcuts",
      description: "Use aartiq:// URL scheme in Shortcuts app for automation workflows",
      content: "Apple Shortcuts URL scheme aartiq:// chat search create-pdf navigate run-command schedule volume open-app screenshot voice-chat ask-ai Shortcuts app automation workflow",
      url: "/docs/apple-integration#shortcuts",
      section: "Apple Shortcuts",
      keywords: ["Shortcuts", "URL scheme", "aartiq://", "automation", "workflow"],
      type: "guide"
    },
    {
      id: "apple-integration-voice",
      title: "Voice Control",
      description: "Dictation input and text-to-speech output for hands-free operation",
      content: "Voice control dictation text-to-speech TTS voice input speech output voice selection speech rate Samantha Enhanced Dictation continuous voice cmd+d voice chat mode",
      url: "/docs/apple-integration#voice",
      section: "Voice Control",
      keywords: ["voice", "dictation", "TTS", "text-to-speech", "speech", "Enhanced Dictation"],
      type: "guide"
    },
    {
      id: "apple-integration-raycast",
      title: "Raycast Integration",
      description: "Extend Raycast with Aartiq commands for lightning-fast workflows",
      content: "Raycast extension AI Chat Search Create PDF Screenshot Volume Open App Schedule Task Terminal Raycast command bar /ai command fast workflow",
      url: "/docs/apple-integration#raycast",
      section: "Raycast Integration",
      keywords: ["Raycast", "extension", "command bar", "/ai", "fast workflow"],
      type: "guide"
    },
    {
      id: "windows-integration",
      title: "Windows Integration",
      description: "Windows Shortcuts, Voice Control, PowerShell TTS, and Microsoft Copilot integration",
      content: "Windows integration Shortcuts Voice Control PowerShell TTS Microsoft Copilot aartiq:// URL scheme Windows Shortcuts Power Automate speech recognition voice output Windows 11",
      url: "/docs/windows-integration",
      keywords: ["Windows", "Copilot", "Shortcuts", "Voice", "PowerShell", "TTS", "speech recognition"],
      type: "page"
    },
    {
      id: "windows-integration-shortcuts",
      title: "Windows Shortcuts",
      description: "Use aartiq:// URL scheme in Windows Shortcuts app",
      content: "Windows Shortcuts URL scheme aartiq:// chat search create-pdf navigate run-command schedule volume open-app screenshot copilot voice Windows Shortcuts app automation workflow",
      url: "/docs/windows-integration#shortcuts",
      section: "Windows Shortcuts",
      keywords: ["Windows Shortcuts", "URL scheme", "aartiq://", "automation"],
      type: "guide"
    },
    {
      id: "windows-integration-voice",
      title: "Windows Voice Control",
      description: "PowerShell speech recognition and text-to-speech for hands-free operation",
      content: "Windows voice control PowerShell Speech Recognition System.Speech text-to-speech TTS voice input speech output David Zira voice selection speech rate Windows voice chat mode",
      url: "/docs/windows-integration#voice",
      section: "Voice Control",
      keywords: ["voice", "PowerShell", "TTS", "text-to-speech", "speech recognition", "System.Speech"],
      type: "guide"
    },
    {
      id: "windows-integration-copilot",
      title: "Microsoft Copilot",
      description: "Open and integrate with Microsoft Copilot on Windows",
      content: "Microsoft Copilot Windows integration copilot.microsoft.com com.microsoft.copilot: protocol dual AI workflow companion mode Windows 11 Copilot app",
      url: "/docs/windows-integration#copilot",
      section: "Microsoft Copilot",
      keywords: ["Microsoft Copilot", "Copilot", "Windows", "AI companion", "dual AI"],
      type: "guide"
    },
    {
      id: "linux-integration",
      title: "Linux Integration",
      description: "Native Linux desktop integration with GNOME, KDE, and more",
      content: "Linux integration GNOME KDE desktop environment espeak notify-send xdg-utils shortcuts voice TTS text-to-speech Aartiq Linux native desktop",
      url: "/docs/linux-integration",
      section: "Linux Integration",
      keywords: ["Linux", "GNOME", "KDE", "desktop integration", "voice", "TTS", "espeak"],
      type: "page"
    },
    {
      id: "linux-integration-gnome",
      title: "GNOME Integration",
      description: "Native GNOME shell integration",
      content: "GNOME integration notify-send keybindings app launcher system tray XDG desktop entry Aartiq GNOME 40 41 42",
      url: "/docs/linux-integration#gnome",
      section: "GNOME Desktop",
      keywords: ["GNOME", "notify-send", "desktop entry", "app launcher"],
      type: "guide"
    },
    {
      id: "linux-integration-kde",
      title: "KDE Plasma Integration",
      description: "Native KDE Plasma desktop integration",
      content: "KDE Plasma integration kdialog qdbus KMix system tray KRunner Aartiq KDE Plasma 5",
      url: "/docs/linux-integration#kde",
      section: "KDE Plasma",
      keywords: ["KDE", "Plasma", "kdialog", "qdbus", "KMix"],
      type: "guide"
    },
    {
      id: "linux-integration-voice",
      title: "Voice Control",
      description: "Text-to-speech and voice input on Linux",
      content: "Linux voice control espeak TTS text-to-speech speech recognition voice input Linux STT",
      url: "/docs/linux-integration#voice",
      section: "Voice Control",
      keywords: ["voice", "TTS", "espeak", "speech recognition"],
      type: "guide"
    },

    // API Reference
    {
      id: "api-reference",
      title: "API Reference",
      description: "Complete IPC handlers and preload APIs",
      content: "API reference IPC handlers preload electron browser control shell execution PDF document generation automation mobile sync security vault AI LLM system storage",
      url: "/docs/api-reference",
      keywords: ["API", "IPC", "handlers", "preload", "reference"],
      type: "page"
    },
    {
      id: "api-browser",
      title: "Browser Control API",
      description: "Browser control IPC handlers",
      content: "get-open-tabs navigate-to capture-browser-view-screenshot capture-page-html extract-page-content find-and-click-text",
      url: "/docs/api-reference#browser",
      section: "Browser Control",
      keywords: ["browser", "tabs", "navigate", "screenshot", "HTML", "click"],
      type: "api"
    },
    {
      id: "api-shell",
      title: "Shell Execution API",
      description: "Shell command execution handlers",
      content: "execute-shell-command check-python-available set-volume set-brightness open-external-app open-system-settings",
      url: "/docs/api-reference#shell",
      section: "Shell Execution",
      keywords: ["shell", "command", "execute", "volume", "brightness"],
      type: "api"
    },
    {
      id: "api-automation",
      title: "Automation API",
      description: "Task automation IPC handlers",
      content: "automation get-tasks create-task update-task delete-task toggle-task run-task get-logs get-results",
      url: "/docs/api-reference#automation",
      section: "Automation",
      keywords: ["automation", "tasks", "schedule", "run"],
      type: "api"
    },
    {
      id: "api-ai",
      title: "AI & LLM API",
      description: "AI provider configuration and generation",
      content: "llm get-available-providers llm-get-provider-models set-active-provider configure-provider generate-chat-content ollama list-models apple-intelligence-status apple-intelligence-summary apple-intelligence-generate-image Groq xAI Apple Intelligence",
      url: "/docs/api-reference#ai",
      section: "AI & LLM",
      keywords: ["AI", "LLM", "provider", "Gemini", "OpenAI", "Claude", "Groq", "xAI", "Ollama", "Apple Intelligence", "llm-get-provider-models"],
      type: "api"
    },
    {
      id: "api-ai-provider-catalogs",
      title: "Live Provider Model Catalogs",
      description: "Official model discovery handlers for Gemini, OpenAI, Claude, Groq, and xAI",
      content: "llm-get-provider-models provider model catalog latest models auto latest refresh recommended model",
      url: "/docs/api-reference#ai",
      section: "AI & LLM",
      keywords: ["model catalog", "latest models", "Gemini", "OpenAI", "Claude", "Groq", "xAI"],
      type: "api"
    },
    {
      id: "api-apple-intelligence-status",
      title: "Apple Intelligence Status API",
      description: "Inspect unsupported, disabled, and not-ready Apple runtime states before use",
      content: "apple-intelligence-status summaryAvailable summaryReason imageAvailable imageReason deviceNotEligible appleIntelligenceNotEnabled modelNotReady",
      url: "/docs/api-reference#ai",
      section: "AI & LLM",
      keywords: ["apple-intelligence-status", "summaryAvailable", "imageAvailable", "deviceNotEligible", "modelNotReady"],
      type: "api"
    },

    // Deep Links
    {
      id: "deep-links",
      title: "Deep Links",
      description: "URL scheme support for Aartiq",
      content: "deep links URL scheme comet-browser protocol launch execute command open page",
      url: "/docs/deep-links",
      keywords: ["deep links", "URL scheme", "comet-browser", "protocol", "launch"],
      type: "page"
    },

    // Overview
    {
      id: "overview",
      title: "Overview",
      description: "Architecture overview and feature summary",
      content: "overview architecture features technology stack React Electron Flutter Next.js TypeScript live model catalogs Groq xAI Apple Intelligence native utilities",
      url: "/docs/overview",
      keywords: ["overview", "architecture", "features", "technology", "Groq", "xAI", "Apple Intelligence"],
      type: "page"
    },

    // Components
    {
      id: "components",
      title: "Components",
      description: "React component library",
      content: "components UI React library interface",
      url: "/docs/components",
      keywords: ["components", "UI", "React", "interface"],
      type: "page"
    },

    // Troubleshooting
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Common issues and solutions",
      content: "troubleshooting issues problems solutions errors installation permissions AI sync Apple Intelligence unsupported model not ready live model catalog refresh",
      url: "/docs/troubleshooting",
      keywords: ["troubleshooting", "issues", "problems", "solutions", "errors", "Apple Intelligence", "model catalog"],
      type: "page"
    },
    {
      id: "troubleshooting-apple-intelligence-support",
      title: "Apple Intelligence Unsupported",
      description: "Why Comet shows unsupported, disabled, or unavailable Apple Intelligence UI states",
      content: "Apple Intelligence unsupported disabled unavailable summaryAvailable summaryReason imageAvailable imageReason supported Mac Apple Intelligence settings",
      url: "/docs/troubleshooting",
      section: "AI & Commands",
      keywords: ["Apple Intelligence unsupported", "summaryReason", "imageReason", "supported Mac"],
      type: "section"
    },
    {
      id: "troubleshooting-provider-model-refresh",
      title: "Refresh Live Model Catalogs",
      description: "Fix missing or outdated provider model lists in settings",
      content: "latest model refresh provider model catalog Gemini OpenAI Claude Groq xAI settings AI providers",
      url: "/docs/troubleshooting",
      section: "AI & Commands",
      keywords: ["latest model", "refresh", "provider model catalog", "AI Providers"],
      type: "section"
    },

    // Contributing
    {
      id: "contributing",
      title: "Contributing",
      description: "How to contribute to the project",
      content: "contributing development open source GitHub pull request code standards",
      url: "/docs/contributing",
      keywords: ["contributing", "development", "open source", "GitHub"],
      type: "page"
    },

    // Changelog
    {
      id: "changelog",
      title: "Changelog",
      description: "Version history and release notes",
      content: "changelog releases versions updates history",
      url: "/docs/changelog",
      keywords: ["changelog", "releases", "versions", "updates"],
      type: "page"
    },

    // Extensions
    {
      id: "extensions",
      title: "Extensions",
      description: "Browser extension system",
      content: "extensions browser addons custom functionality",
      url: "/docs/extensions",
      keywords: ["extensions", "browser", "addons"],
      type: "page"
    },

    // Components Documentation
    {
      id: "components",
      title: "Components Reference",
      description: "Complete visual reference of all 120+ components across Desktop, Mobile, and Background Services",
      content: "components reference AIChatSidebar ThinkingPanel SchedulingModal LLMProviderSettings AutomationSettings SyncSettings PDFGenerationPanel TrayManager SchedulerService TaskQueue RobotService DesktopControlPage AutomationPage RemoteSettingsPage PDFViewerPage SyncService AuthService Browser WebviewTab Flutter mobile desktop Electron React",
      url: "/docs/components",
      keywords: ["components", "reference", "React", "Flutter", "desktop", "mobile", "Electron", "AIChatSidebar", "SettingsPanel", "TrayManager", "SchedulerService", "DesktopControlPage", "SyncService", "AutomationPage", "PDFViewerPage"],
      type: "page"
    },
    {
      id: "components-desktop",
      title: "Desktop Components (Electron)",
      description: "63 React components for the Electron desktop browser",
      content: "desktop components Electron React AIChatSidebar ThinkingIndicator SchedulingModal AISetupGuide MermaidDiagram FlowchartDiagram ChartDiagram PermissionSettings LLMProviderSettings AutomationSettings SyncSettings UpdatesSettings ThemeSettings PluginSettings",
      url: "/docs/components#desktop",
      section: "Desktop",
      keywords: ["desktop", "Electron", "React", "AIChatSidebar", "ThinkingPanel"],
      type: "section"
    },
    {
      id: "components-service",
      title: "Background Service Components",
      description: "12 Node.js service files for background automation",
      content: "background service node.js service-main tray-manager scheduler task-queue storage model-selector ollama-manager notifications mobile-notifier sleep-handler ipc-service pdf-sync",
      url: "/docs/components#service",
      section: "Service",
      keywords: ["background", "service", "node", "scheduler", "tray", "notifications"],
      type: "section"
    },

    // Document Generation
    {
      id: "docgen-advanced-engine",
      title: "Advanced Document Generation",
      description: "Generate PDFs, Excel, PowerPoint, and Mermaid diagrams programmatically",
      content: "AdvancedDocumentEngine MermaidToPDFConverter PDF Excel XLSX PPTX Mermaid flowchart sequence diagram class diagram generateDocument chart watermarks tables images",
      url: "/docs/document-generation",
      keywords: ["PDF", "Excel", "XLSX", "PPTX", "Mermaid", "document", "generation", "chart", "watermark", "table"],
      type: "page"
    },

    // Typing Animations
    {
      id: "hooks-typing-animation",
      title: "Typing Animation Hooks",
      description: "Custom React hooks for character-by-character typing animations",
      content: "useTypingAnimation useStreamingParser typing cursor blink pulse glow streaming parser character word fade animation",
      url: "/docs/api-reference",
      section: "Hooks",
      keywords: ["typing", "animation", "cursor", "streaming", "hook", "useEffect"],
      type: "api"
    },

    // Themes
    {
      id: "themes-liquid-glass",
      title: "Liquid Glass Themes",
      description: "9 glass morphism themes with translucent backgrounds",
      content: "liquidGlass graphite crystal obsidian azure rose aurora nebula translucent glass theme gradient preset SwiftUI native panel",
      url: "/docs/native-api",
      section: "Themes",
      keywords: ["theme", "glass", "liquid", "translucent", "SwiftUI", "gradient", "preset"],
      type: "section"
    },

    // Raycast Extension
    {
      id: "extension-raycast",
      title: "Raycast Extension",
      description: "macOS Spotlight alternative integration for Aartiq",
      content: "Raycast extension command chat browse ocr pdf automation settings AppleScript URL scheme",
      url: "/docs/extensions",
      keywords: ["Raycast", "extension", "spotlight", "AppleScript", "command"],
      type: "section"
    },
    {
      id: "components-service",
      title: "Background Service Components",
      description: "12 Node.js service files for background automation",
      content: "background service node.js service-main tray-manager scheduler task-queue storage model-selector ollama-manager notifications mobile-notifier sleep-handler ipc-service pdf-sync",
      url: "/docs/components#service",
      section: "Service",
      keywords: ["background", "service", "node", "scheduler", "tray", "notifications"],
      type: "section"
    },

    // Native Sidebar V2
    {
      id: "native-sidebar-v2",
      title: "Native AI Sidebar V2",
      description: "Thuki-inspired native SwiftUI floating assistant for macOS",
      content: "native sidebar v2 thuki-inspired swiftui floating assistant spotlight-style morphing container command suggestions context quotes auto-scroll typing indicator conversation history multi-provider llm ollama openai anthropic gemini auto-start login items native module electron swift bridge",
      url: "/docs/native-api#sidebar-v2",
      keywords: ["native", "sidebar", "v2", "thuki", "swiftui", "macOS", "spotlight", "morphing", "commands", "llm", "auto-start"],
      type: "page"
    },
    {
      id: "thuki-inspiration",
      title: "Thuki Inspiration",
      description: "Thuki by Logan Nguyen - Apache 2.0 licensed floating AI secretary",
      content: "thuki floating AI secretary macOS apache 2.0 license Logan Nguyen quiet-node morphing container command suggestions conversation history auto-scroll",
      url: "/docs/native-api#thuki",
      keywords: ["thuki", "inspiration", "logan nguyen", "apache", "floating", "secretary"],
      type: "section"
    },
    {
      id: "native-module-structure",
      title: "Native Module Architecture",
      description: "Electron + Swift architecture for native macOS integration",
      content: "native module N-API node-gyp objective-c++ bridge swiftui window electron main process comet-ai-sidebar binding.gyp",
      url: "/docs/native-api#module-structure",
      section: "Module Structure",
      keywords: ["N-API", "node-gyp", "objective-c++", "bridge", "architecture", "module"],
      type: "section"
    },
    {
      id: "sidebar-build-commands",
      title: "Sidebar V2 Build Commands",
      description: "How to build the native Swift module",
      content: "npm install npm run build node-gyp comet-ai-sidebar native module compilation xcode swift",
      url: "/docs/native-api#build",
      section: "Build",
      keywords: ["build", "npm", "install", "compile", "xcode", "swift"],
      type: "section"
    },
    {
      id: "sidebar-api-usage",
      title: "Sidebar V2 API Usage",
      description: "JavaScript API for controlling the native sidebar",
      content: "CometAISidebar showWindow hideWindow toggleWindow configureLLM loadLLMConfig setAutoStart getAutoStart setSidebarVersion getSidebarVersion",
      url: "/docs/native-api#usage",
      section: "Usage",
      keywords: ["API", "showWindow", "hideWindow", "toggleWindow", "configureLLM", "autoStart"],
      type: "section"
    },
    {
      id: "sidebar-version-switching",
      title: "Sidebar Version Switching",
      description: "Switch between V1 (full-featured) and V2 (Thuki-style)",
      content: "sidebar version switch v1 v2 electron thuki macos menu settings toggle",
      url: "/docs/native-api#version-switching",
      section: "Version Switching",
      keywords: ["version", "switch", "toggle", "menu", "settings"],
      type: "section"
    },
    {
      id: "licensing-apache",
      title: "Apache 2.0 Licensing",
      description: "Apache License 2.0 compliance for Thuki integration",
      content: "apache 2.0 license attribution thuki section 4d copyright logan nguyen derivative works",
      url: "/docs/native-api#licensing",
      section: "Licensing",
      keywords: ["license", "apache", "attribution", "copyright", "derivative"],
      type: "section"
    },
    {
      id: "acknowledgments",
      title: "Acknowledgments",
      description: "Third-party licenses and attribution",
      content: "acknowledgments third-party licenses thuki apache 2.0 logan nguyen",
      url: "/acknowledgments",
      keywords: ["acknowledgments", "license", "thuki", "third-party"],
      type: "page"
    }
  ]
};

export function searchDocs(query: string, limit: number = 10): SearchResult[] {
  if (!query || query.length < 2) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  const queryTerms = normalizedQuery.split(/\s+/);
  
  const results: Array<SearchResult & { score: number }> = [];
  
  for (const page of searchIndex.pages) {
    const titleLower = page.title.toLowerCase();
    const contentLower = page.content.toLowerCase();
    const descLower = page.description.toLowerCase();
    const keywordsLower = page.keywords.map(k => k.toLowerCase());
    
    let score = 0;
    
    for (const term of queryTerms) {
      if (titleLower.includes(term)) score += 10;
      if (descLower.includes(term)) score += 5;
      if (contentLower.includes(term)) score += 3;
      if (keywordsLower.some(k => k.includes(term))) score += 7;
      
      for (const keyword of page.keywords) {
        if (keyword.toLowerCase().includes(term)) score += 2;
      }
    }
    
    const queryWords = normalizedQuery.replace(/[^\w\s]/g, '').split(/\s+/);
    for (const word of queryWords) {
      if (word.length >= 3) {
        if (titleLower.includes(word)) score += 5;
        if (keywordsLower.some(k => k.includes(word))) score += 3;
      }
    }
    
    if (score > 0) {
      results.push({ ...page, score });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  
  return results.slice(0, limit).map(({ score, ...result }) => result);
}
