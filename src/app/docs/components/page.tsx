"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  Shield, 
  Zap, 
  Globe,
  Terminal,
  Smartphone,
  FileText,
  Layers,
  Cloud,
  Wifi,
  Bell,
  Calendar,
  Monitor,
  Command,
  Lock,
  Eye,
  MousePointer,
  Search,
  Code2,
  Database,
  Settings,
  Share2,
  Printer,
  Volume2,
  HardDrive,
  Cpu,
  Activity,
  ArrowRight,
  Link2,
  LayoutGrid,
  Package,
  Puzzle,
  Server,
  Key,
  Keyboard,
  Brush,
  Plug,
  MonitorSmartphone,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Timer,
  Workflow,
  Download,
  Upload,
  Send,
  History,
  Moon,
  Sun,
  Github,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Box,
  FolderTree,
  GitBranch,
  Layers3,
  AppWindow,
  Settings2,
  Users,
  Webhook,
  RefreshCw,
  Apple,
  type LucideIcon
} from "lucide-react";

interface ComponentEntry {
  name: string;
  lines?: number;
  description: string;
  path?: string;
  tags?: string[];
}

interface CategorySection {
  title: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  iconColor: string;
  components: ComponentEntry[];
  description?: string;
}

const desktopCategories: CategorySection[] = [
  {
    title: "AI & Chat",
    icon: Bot,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
    description: "AI chat, command processing, conversation management",
    components: [
      { name: "AIChatSidebar", lines: 7519, description: "Main chat interface with real-time streaming, thinking indicators, command execution, and scheduling.", tags: ["React", "AI", "Main"] },
      { name: "AIUtils", lines: 952, description: "Utility functions for PDF generation, image handling, command formatting, and secure storage.", tags: ["React", "Utils"] },
      { name: "AIConstants", lines: 382, description: "AI instructions, commands, capabilities, language maps, and system prompts.", tags: ["React", "Config"] },
      { name: "SchedulingModal", lines: 516, description: "Modal for scheduling AI tasks with cron builder, model selection, and notification options.", tags: ["React", "AI"] },
      { name: "AISetupGuide", lines: 1023, description: "Interactive wizard for configuring AI providers and API keys with validation.", tags: ["React", "Setup"] },
      { name: "SchedulingIntentDetector", lines: 376, description: "Natural language scheduling detection with cron expression extraction.", tags: ["React", "AI"] },
      { name: "SecureDOMReader", lines: 363, description: "Secure DOM reading with XSS prevention and structured data extraction.", tags: ["React"] },
      { name: "DOMSearchDisplay", lines: 389, description: "Visual DOM search results with element highlighting and metadata.", tags: ["React"] },
      { name: "AICommandQueue.tsx", lines: 481, description: "Queue management for AI commands with priority and retry logic.", tags: ["React", "AI"] },
      { name: "RobustParsers", lines: 225, description: "Robust JSON/shell output parsing with regex fallbacks for AI responses.", tags: ["React"] },
      { name: "ClickPermissionModal", lines: 602, description: "Permission dialog for click actions with risk assessment.", tags: ["React"] },
      { name: "CollapsibleOCRMessage", lines: 159, description: "Expandable OCR results display with raw text view and confidence scores.", tags: ["React", "OCR"] },
      { name: "AIAssistOverlay.tsx", lines: 282, description: "Floating AI assistant overlay for contextual help.", tags: ["React", "AI"] },
      { name: "FlowchartDiagram", lines: 257, description: "Interactive flowchart rendering with zoom, pan, and node editing.", tags: ["React"] },
      { name: "ThinkingPanel", lines: 152, description: "Animated thinking state display with chain-of-thought visualization.", tags: ["React"] },
      { name: "ChartDiagram", lines: 147, description: "Chart rendering component supporting bar, line, pie, and scatter charts.", tags: ["React"] },
      { name: "MermaidDiagram", lines: 129, description: "Mermaid diagram renderer with live preview and error handling.", tags: ["React"] },
      { name: "ConversationHistoryPanel", lines: 113, description: "Sidebar panel for browsing past conversations with search.", tags: ["React"] },
      { name: "ThinkingIndicator.tsx", lines: 184, description: "Animated thinking indicator for loading states.", tags: ["React"] },
      { name: "MessageActions", lines: 41, description: "Action buttons for messages (copy, edit, delete, share).", tags: ["React"] },
      { name: "AIChatSidebar/types.ts", lines: 162, description: "TypeScript types for AI chat sidebar components.", tags: ["React", "Types"] },
      { name: "AIChatSidebar/helpers.ts", lines: 37, description: "Helper utilities for AI chat sidebar.", tags: ["React", "Utils"] },
      { name: "AICommandOutput.ts", lines: 218, description: "AI command output rendering and formatting.", tags: ["React", "AI"] },
    ]
  },
  {
    title: "Settings & Configuration",
    icon: Settings,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    description: "Settings panels: LLM, automation, sync, permissions, plugins",
    components: [
      { name: "SettingsPanel", lines: 1196, description: "Main settings container with all configuration sections and theme support.", tags: ["React", "Main"] },
      { name: "LLMProviderSettings", lines: 1153, description: "AI model provider configuration (Gemini, Claude, GPT, Ollama, Groq).", tags: ["React", "AI"] },
      { name: "AutomationSettings", lines: 965, description: "Automation & scheduling settings with task management and permissions.", tags: ["React"] },
      { name: "SyncSettings", lines: 706, description: "WiFi/P2P sync configuration for mobile pairing with QR codes.", tags: ["React"] },
      { name: "UpdatesSettings", lines: 540, description: "Auto-update configuration and version info with changelog.", tags: ["React"] },
      { name: "PermissionSettings", lines: 1109, description: "Command permission management by risk level (LOW/MEDIUM/HIGH/CRITICAL).", tags: ["React", "Security"] },
      { name: "PluginSettings", lines: 422, description: "Plugin management UI with install/enable/disable from marketplace.", tags: ["React"] },
      { name: "McpSettings", lines: 617, description: "Model Context Protocol settings for external tools and services.", tags: ["React"] },
      { name: "ProxyFirewallManager", lines: 374, description: "Advanced proxy & firewall rules management with presets.", tags: ["React"] },
      { name: "ThemeSettings", lines: 266, description: "Visual theme configuration with custom gradients and presets.", tags: ["React"] },
      { name: "ExtensionSettings", lines: 187, description: "Browser extension settings with enable/disable toggles.", tags: ["React"] },
      { name: "StartupSetupUI", lines: 960, description: "First-run setup wizard with feature tour and preferences.", tags: ["React"] },
      { name: "ApiKeysSettings", lines: 105, description: "API key configuration UI with secure storage indicators.", tags: ["React"] },
      { name: "PerformanceSettings", lines: 92, description: "Performance tuning options (GPU, memory, caching).", tags: ["React"] },
      { name: "AutofillSettings", lines: 115, description: "Form autofill configuration with secure storage.", tags: ["React"] },
      { name: "ProxySettings", lines: 82, description: "Proxy server configuration with auth support.", tags: ["React"] },
      { name: "SearchEngineSettings", lines: 40, description: "Default search engine configuration with custom engines.", tags: ["React"] },
      { name: "UserAgentSettings", lines: 49, description: "Custom user agent strings for browser fingerprinting.", tags: ["React"] },
      { name: "KeyboardShortcutSettings", lines: 103, description: "Keyboard shortcut customization with presets.", tags: ["React"] },
      { name: "BackendSettings", lines: 78, description: "Backend service configuration for P2P sync.", tags: ["React"] },
    ]
  },
  {
    title: "Browser Core",
    icon: Globe,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
    description: "WebView container, tab management, navigation UI",
    components: [
      { name: "BrowserViewContainer", lines: 128, description: "WebView container management with secure context and sandboxing.", tags: ["React"] },
      { name: "TitleBar", lines: 132, description: "Custom window title bar with traffic lights and window controls.", tags: ["React", "macOS"] },
      { name: "TabManager", lines: 255, description: "Tab lifecycle management with create, close, restore.", tags: ["React"] },
      { name: "VirtualizedTabBar", lines: 319, description: "High-performance virtualized tab bar for 100+ tabs.", tags: ["React"] },
      { name: "SpotlightSearchOverlay", lines: 345, description: "Spotlight-style universal search overlay with fuzzy matching.", tags: ["React"] },
      { name: "QuickNavOverlay", lines: 213, description: "Quick navigation with keyboard shortcuts and recent items.", tags: ["React"] },
      { name: "TabSwitcherOverlay", lines: 79, description: "Visual tab switcher (Cmd+Shift+]) with thumbnails.", tags: ["React"] },
      { name: "ClipboardManager", lines: 86, description: "Clipboard history with sync support and search.", tags: ["React"] },
      { name: "HistoryPanel", lines: 49, description: "Browsing history view with search and filtering.", tags: ["React"] },
      { name: "WelcomeScreen", lines: 359, description: "First-time user welcome with feature tour and setup.", tags: ["React"] },
      { name: "UnifiedSearch", lines: 403, description: "Universal search across all content types (web, history, bookmarks).", tags: ["React"] },
      { name: "LoginPrompt", lines: 19, description: "Authentication login dialog with secure credential storage.", tags: ["React"] },
    ]
  },
  {
    title: "Automation & Tasks",
    icon: Terminal,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-400",
    description: "OS automation service: mouse, keyboard, OCR, scheduling",
    components: [
      { name: "AutomationLayer", lines: 147, description: "Cross-platform automation abstraction with native OS support.", tags: ["Node.js", "Core"] },
      { name: "mac.js", lines: 175, description: "macOS: steve CLI (accessibility) + AppleScript fallback.", tags: ["Node.js", "macOS"] },
      { name: "win.js", lines: 250, description: "Windows: nut.js/xa11y + PowerShell fallback.", tags: ["Node.js", "Windows"] },
      { name: "linux.js", lines: 167, description: "Linux: xdotool + xte/xinput fallback.", tags: ["Node.js", "Linux"] },
      { name: "fallback.js", lines: 95, description: "Fallback chain: nut.js → xa11y → robotjs.", tags: ["Node.js", "Cross-Platform"] },
      { name: "fallback.js", lines: 80, description: "RobotJS conditional loader for legacy support.", tags: ["Node.js"] },
      { name: "robot-service.js", lines: 293, description: "Cross-platform automation engine for mouse/keyboard control.", tags: ["Node.js"] },
      { name: "tesseract-service.js", lines: 1125, description: "OCR: uniOCR > RustO! > Native > Tesseract fallback chain.", tags: ["Node.js", "OCR"] },
      { name: "screen-vision-service.js", lines: 142, description: "Screen capture and vision analysis service.", tags: ["Node.js", "OCR"] },
      { name: "native-os-verifier.js", lines: 248, description: "Native OS capability verification for automation.", tags: ["Node.js", "macOS"] },
      { name: "workflow-recorder.js", lines: 151, description: "Records user workflows for automation replay.", tags: ["Node.js"] },
      { name: "CrossAppOCR", lines: 374, description: "Cross-application OCR & click for external apps.", tags: ["React"] },
      { name: "PhoneCamera", lines: 106, description: "Phone camera integration for document capture.", tags: ["React"] },
      { name: "ClickPermissionModal", lines: 602, description: "Permission dialog for click actions.", tags: ["React"] },
      { name: "SettingsDropdown.tsx", lines: 93, description: "Quick settings dropdown menu.", tags: ["React"] },
    ]
  },
  {
    title: "PDF & Documents",
    icon: FileText,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    description: "PDF generation, editing, template parsing, document export",
    components: [
      { name: "PDFGenerationPanel", lines: 359, description: "PDF creation interface with template selection and preview.", tags: ["React"] },
      { name: "PDFWorkspace", lines: 267, description: "PDF editing workspace with annotation support.", tags: ["React"] },
      { name: "TemplateParser", description: "Markdown table parser with overflow handling.", tags: ["Node.js"] },
      { name: "ScreenshotsEmbedder", description: "Captures and embeds screenshots into PDFs.", tags: ["Node.js"] },
      { name: "professional-pdf.js", lines: 330, description: "Professional PDF template generation with layouts.", tags: ["Node.js"] },
      { name: "AdvancedDocumentEngine.ts", lines: 816, description: "Advanced document generation for PDF, Excel (XLSX), PowerPoint (PPTX), and charts.", tags: ["Node.js"] },
      { name: "MermaidToPDFConverter.ts", lines: 388, description: "Mermaid diagram to PDF/PNG converter with SVG rendering.", tags: ["Node.js"] },
    ]
  },
  {
    title: "Mobile & Sync",
    icon: Smartphone,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/20",
    iconColor: "text-pink-400",
    description: "Flutter mobile app, WebSocket sync, P2P file transfer",
    components: [
      { name: "WiFiSyncService", lines: 511, description: "Real-time WebSocket sync with QR code pairing over local network.", tags: ["Node.js", "Sync"] },
      { name: "P2PFileSyncService.ts", lines: 691, description: "Peer-to-peer file sync service for large files.", tags: ["Node.js", "Sync"] },
      { name: "CloudSyncService.ts", lines: 532, description: "Cloud-based sync service with conflict resolution.", tags: ["Node.js", "Sync"] },
      { name: "SyncMethodManager.ts", lines: 259, description: "Manages sync methods (WiFi, Cloud, P2P) with fallbacks.", tags: ["Node.js", "Sync"] },
      { name: "FirebaseSyncService.ts", lines: 255, description: "Firebase backend sync for real-time updates.", tags: ["Node.js", "Sync"] },
      { name: "ContactSyncService.ts", lines: 132, description: "Contact synchronization across devices.", tags: ["Node.js", "Sync"] },
      { name: "P2PSyncManager", lines: 186, description: "Peer-to-peer sync manager UI with bandwidth control.", tags: ["React"] },
      { name: "CloudSyncConsent", lines: 46, description: "Cloud sync permission dialog.", tags: ["React"] },
    ]
  },
  {
    title: "LLM Providers",
    icon: Cpu,
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    description: "LLM providers: OpenAI, Claude, Gemini, Groq, Ollama",
    components: [
      { name: "llm/LLMOrchestrator.ts", lines: 65, description: "Orchestrates requests across multiple LLM providers.", tags: ["Node.js", "AI"] },
      { name: "llm/providers/base.ts", lines: 34, description: "Base class for LLM provider implementations.", tags: ["Node.js", "AI"] },
      { name: "llm/providers/openai-compatible.ts", lines: 70, description: "OpenAI-compatible API provider (Azure, local models).", tags: ["Node.js", "AI"] },
      { name: "llm/providers/ollama.ts", lines: 52, description: "Ollama local model provider.", tags: ["Node.js", "AI"] },
      { name: "llm/providers/gemini.ts", lines: 47, description: "Google Gemini API provider.", tags: ["Node.js", "AI"] },
      { name: "llm/providers/claude.ts", lines: 50, description: "Anthropic Claude API provider.", tags: ["Node.js", "AI"] },
      { name: "llm/providers/groq.ts", lines: 58, description: "Groq fast inference provider.", tags: ["Node.js", "AI"] },
      { name: "llm/base.ts", lines: 34, description: "Base class for all LLM providers.", tags: ["Node.js", "AI"] },
      { name: "ai-engine.js", lines: 375, description: "AI engine with model routing and fallbacks.", tags: ["Node.js", "AI"] },
      { name: "aiManager.ts", lines: 93, description: "AI manager for model selection and configuration.", tags: ["Node.js", "AI"] },
      { name: "modelRegistry.ts", lines: 30, description: "Registry for available AI models and capabilities.", tags: ["Node.js", "AI"] },
      { name: "aiReasoningOptions.ts", lines: 38, description: "Reasoning configuration options for AI models.", tags: ["Node.js", "AI"] },
      { name: "OfflineChatbot.ts", lines: 105, description: "Offline-capable chatbot with cached responses.", tags: ["Node.js", "AI"] },
    ]
  },
  {
    title: "Native macOS UI",
    icon: Monitor,
    color: "from-sky-500/20 to-blue-500/20",
    borderColor: "border-sky-500/20",
    iconColor: "text-sky-400",
    description: "SwiftUI panels: theme, settings, menu, diagrams",
    components: [
      { name: "LiquidGlassTheme", description: "macOS-native visual effect with blur and transparency.", tags: ["SwiftUI", "macOS"] },
      { name: "NativeSettingsPanel", description: "SwiftUI panel for quick settings access.", tags: ["SwiftUI", "macOS"] },
      { name: "MermaidView", description: "WKWebView wrapper for Mermaid diagrams.", tags: ["SwiftUI", "macOS"] },
      { name: "macOSMenu", description: "Native menu bar with settings shortcuts.", tags: ["Swift", "macOS"] },
      { name: "ThinkUI", description: "Thinking indicator for native macOS sidebar.", tags: ["SwiftUI", "macOS"] },
      { name: "macos-native-panels.js", lines: 159, description: "Native macOS panel management bridge.", tags: ["Node.js", "Swift"] },
    ]
  },
  {
    title: "Integrations & Services",
    icon: Plug,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
    description: "Integrations: Gmail, RAG, web search, voice, MCP, Firebase",
    components: [
      { name: "GmailService.ts", lines: 286, description: "Gmail API integration for email management.", tags: ["Node.js", "AI"] },
      { name: "rag-service.js", lines: 187, description: "RAG (Retrieval-Augmented Generation) service.", tags: ["Node.js", "AI"] },
      { name: "web-search-service.js", lines: 194, description: "Web search with built-in scraper.", tags: ["Node.js", "AI"] },
      { name: "voice-service.js", lines: 93, description: "Voice input and TTS integration.", tags: ["Node.js", "AI"] },
      { name: "bridge-server.js", lines: 159, description: "Bridge server for IPC communication.", tags: ["Node.js"] },
      { name: "mcp-desktop-server.js", lines: 146, description: "Model Context Protocol desktop server.", tags: ["Node.js"] },
      { name: "mcp-server-registry.js", lines: 102, description: "Registry for MCP server connections.", tags: ["Node.js"] },
      { name: "pop-search-service.js", lines: 464, description: "Popular search suggestions service.", tags: ["Node.js"] },
      { name: "DatabaseManager.ts", lines: 226, description: "Local database management with encryption.", tags: ["Node.js"] },
      { name: "SkillLoader.ts", lines: 153, description: "Dynamic skill/command loader for AI.", tags: ["Node.js"] },
      { name: "UnifiedCartService.ts", lines: 418, description: "Shopping cart aggregation service.", tags: ["Node.js"] },
      { name: "PhoneCallControlService.ts", lines: 317, description: "Phone call control integration.", tags: ["Node.js"] },
      { name: "OTPVerificationService.ts", lines: 298, description: "OTP generation and verification.", tags: ["Node.js"] },
      { name: "AdvancedTabManager.ts", lines: 644, description: "Advanced tab management with optimization.", tags: ["Node.js"] },
      { name: "TabOptimizer.ts", lines: 181, description: "Tab memory optimization for 50+ tabs.", tags: ["Node.js"] },
      { name: "DeviceFamilyManager.ts", lines: 322, description: "Device family detection and routing.", tags: ["Node.js"] },
      { name: "FirebaseService.ts", lines: 190, description: "Firebase initialization and configuration.", tags: ["Node.js"] },
      { name: "BackendService.ts", lines: 33, description: "Backend service client.", tags: ["Node.js"] },
      { name: "IntegrationService.ts", lines: 83, description: "Third-party service integrations.", tags: ["Node.js"] },
      { name: "FileUtils.ts", lines: 56, description: "File system utility functions.", tags: ["Node.js"] },
    ]
  },
  {
    title: "Extensibility",
    icon: Puzzle,
    color: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    description: "Plugin system, extensions, deep link handler, marketplace",
    components: [
      { name: "PluginManager", lines: 442, description: "Dynamic plugin system with lifecycle management (load, unload, enable, disable).", tags: ["Node.js"] },
      { name: "PluginSDK", lines: 168, description: "Plugin SDK/framework for building extensions with commands and hooks.", tags: ["Node.js"] },
      { name: "DeepLinkHandler", description: "URL scheme handler for comet:// actions.", tags: ["Node.js"] },
      { name: "ExtensionManager", lines: 161, description: "Browser extension management with hot-reload.", tags: ["React"] },
      { name: "WebStore", lines: 108, description: "Plugin/extension marketplace UI with categories.", tags: ["React"] },
    ]
  },
  {
    title: "Core Architecture",
    icon: Box,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-400",
    description: "Core: main process, security, command parser, platform bridges",
    components: [
      { name: "main.js", lines: 11083, description: "Main Electron process with all IPC handlers, window management, and services.", tags: ["Node.js", "Main"] },
      { name: "preload.js", lines: 558, description: "Context bridge for secure IPC exposure to renderer.", tags: ["Node.js", "Security"] },
      { name: "command-executor.js", lines: 384, description: "IPC handler registration, system commands, window/clipboard/dialog operations.", tags: ["Node.js", "Core"] },
      { name: "network-security.js", lines: 207, description: "Network security configuration, proxy, DNS, ad/tracker blocking.", tags: ["Node.js", "Core"] },
      { name: "window-manager.js", lines: 179, description: "Window lifecycle, focus management, child windows.", tags: ["Node.js", "Core"] },
      { name: "Security.ts", lines: 584, description: "Command validation, shell sanitization, XSS prevention, URL validation.", tags: ["Node.js", "Security"] },
      { name: "AICommandParser.ts", lines: 847, description: "AI command extraction, JSON parsing, bracket format support.", tags: ["Node.js", "AI"] },
      { name: "Security.js", lines: 649, description: "Security utilities and validation helpers.", tags: ["Node.js", "Security"] },
      { name: "ShellCommandParser.ts", lines: 394, description: "Shell command parsing with dangerous command detection.", tags: ["Node.js", "Security"] },
      { name: "ActionLogsStore.ts", lines: 410, description: "Store for action logs with search and filtering.", tags: ["Node.js"] },
      { name: "ActionTagParser.ts", lines: 318, description: "Parse action tags from AI responses for automation.", tags: ["Node.js", "AI"] },
      { name: "BrowserAI.ts", lines: 403, description: "Browser-specific AI orchestration and state management.", tags: ["Node.js", "AI"] },
      { name: "permission-store.js", lines: 207, description: "Permission storage with trusted command lists.", tags: ["Node.js", "Security"] },
      { name: "platform/detector.ts", lines: 62, description: "Platform detection (macOS, Windows, Linux) for conditional logic.", tags: ["Node.js"] },
      { name: "SiriShortcutsIntegration.js", lines: 260, description: "URL scheme handler for aartiq:// shortcuts.", tags: ["Node.js", "macOS", "Siri"] },
      { name: "windows-integration.js", lines: 385, description: "Windows Shortcuts, Voice, Copilot integration.", tags: ["Node.js", "Windows"] },
      { name: "linux-integration.js", lines: 495, description: "Linux GNOME/KDE desktop integration.", tags: ["Node.js", "Linux"] },
      { name: "apple-script-bridge.js", lines: 180, description: "AppleScript voice commands bridge.", tags: ["Node.js", "macOS"] },
      { name: "voice-input-handler.js", lines: 150, description: "macOS Dictation + TTS integration.", tags: ["Node.js", "macOS"] },
      { name: "shortcuts-templates.js", lines: 120, description: "Pre-built shortcut templates generator.", tags: ["Node.js", "macOS"] },
      { name: "platform/MacOSIntegration.ts", lines: 246, description: "macOS-specific integrations and native bridges.", tags: ["Node.js", "macOS"] },
      { name: "platform/WindowsIntegration.ts", lines: 255, description: "Windows-specific integrations and PowerShell bridges.", tags: ["Node.js", "Windows"] },
      { name: "platform/LinuxIntegration.ts", lines: 318, description: "Linux-specific integrations and X11 bridges.", tags: ["Node.js", "Linux"] },
    ]
  },
  {
    title: "Dashboards & Studios",
    icon: LayoutGrid,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-400",
    description: "Dashboards: admin, coding, studio, media, documentation",
    components: [
      { name: "AdminDashboard", lines: 170, description: "Admin control panel for system management.", tags: ["React"] },
      { name: "CodingDashboard", lines: 205, description: "Development workspace with code editor.", tags: ["React"] },
      { name: "WorkspaceDashboard", lines: 159, description: "General workspace hub.", tags: ["React"] },
      { name: "PresentonStudio", lines: 396, description: "Presentation creation studio.", tags: ["React"] },
      { name: "MediaStudio", lines: 169, description: "Media management and editing.", tags: ["React"] },
      { name: "AIFeatureDemo", lines: 473, description: "Interactive AI feature demonstrations.", tags: ["React", "AI"] },
      { name: "LandingPage", lines: 264, description: "Marketing landing page component.", tags: ["React"] },
      { name: "Documentation", lines: 272, description: "Built-in documentation viewer.", tags: ["React"] },
      { name: "CapabilitiesPanel", lines: 75, description: "Browser capabilities display.", tags: ["React"] },
    ]
  },
  {
    title: "Utilities & Entertainment",
    icon: Box,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/20",
    iconColor: "text-rose-400",
    description: "Utilities: games, password manager, shopping cart, navigation",
    components: [
      { name: "DinoGame", lines: 243, description: "Offline dinosaur game (Chrome-style).", tags: ["React", "Game"] },
      { name: "NoNetworkGame", lines: 140, description: "No-internet game for offline pages.", tags: ["React", "Game"] },
      { name: "MediaSuggestions", lines: 44, description: "Content suggestions based on browsing.", tags: ["React"] },
      { name: "PasswordManager", lines: 383, description: "Saved passwords manager with secure storage.", tags: ["React"] },
      { name: "UnifiedCartPanel", lines: 67, description: "Shopping cart aggregator.", tags: ["React"] },
      { name: "QuickNavOverlay", lines: 213, description: "Quick navigation overlay.", tags: ["React"] },
    ]
  },
];

const flutterCategories: CategorySection[] = [
  {
    title: "Core Pages",
    icon: AppWindow,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
    description: "Main screens: desktop control, agent chat, home, settings",
    components: [
      { name: "desktop_control_page.dart", lines: 1172, description: "Remote desktop control with AI chat, shell execution, system commands. 3 tabs: AI Chat, Shell, Control.", tags: ["Main", "Control"] },
      { name: "agent_chat_page.dart", lines: 1020, description: "Agent task execution interface for multi-step actions.", tags: ["AI", "Chat"] },
      { name: "connect_desktop_page.dart", lines: 996, description: "QR scanner for desktop pairing via WiFi sync.", tags: ["Setup", "Sync"] },
      { name: "comet_home_page.dart", lines: 576, description: "Main browser home with tab management.", tags: ["Main"] },
      { name: "automation_page.dart", lines: 648, description: "Scheduled task management with filter and actions.", tags: ["Automation"] },
      { name: "remote_settings_page.dart", lines: 730, description: "Remote settings control from mobile. 5 categories: LLM, Security, Appearance, Browser, Automation.", tags: ["Settings"] },
      { name: "pdf_viewer_page.dart", lines: 511, description: "PDF viewing, save, share, open in external app.", tags: ["PDF"] },
      { name: "auth_page.dart", lines: 580, description: "Authentication page for Firebase.", tags: ["Auth"] },
      { name: "ai_chat_page.dart", lines: 261, description: "Mobile AI chat interface.", tags: ["AI", "Chat"] },
      { name: "bookmarks_page.dart", lines: 123, description: "Bookmarks management UI.", tags: ["Browser"] },
      { name: "splash_screen.dart", lines: 187, description: "App splash screen with logo animation.", tags: ["UI"] },
    ]
  },
  {
    title: "Core Services",
    icon: Server,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    description: "Services: sync, agent, browser controller, WebView tab",
    components: [
      { name: "sync_service.dart", lines: 843, description: "WebSocket sync with desktop. Handles clipboard, AI prompts, shell commands, status updates.", tags: ["Main", "Sync"] },
      { name: "comet_agent_service.dart", lines: 888, description: "Background agent service for automated task execution.", tags: ["Agent"] },
      { name: "browser.dart", lines: 538, description: "Browser controller with WebView management.", tags: ["Core"] },
      { name: "webview_tab.dart", lines: 642, description: "WebView tab controller with lifecycle and navigation.", tags: ["Core"] },
      { name: "auth_service.dart", lines: 244, description: "Firebase authentication service.", tags: ["Auth"] },
      { name: "clipboard_monitor.dart", lines: 44, description: "Clipboard change detection with 2-second polling.", tags: ["Monitor"] },
    ]
  },
  {
    title: "Data Models",
    icon: Database,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
    description: "Models: browser state, WebView state, window, favorites",
    components: [
      { name: "browser_model.dart", lines: 439, description: "Browser state model with tabs, history, favorites.", tags: ["State"] },
      { name: "webview_model.dart", lines: 299, description: "WebView tab state model with URL and loading state.", tags: ["State"] },
      { name: "window_model.dart", lines: 319, description: "Window state model with size and position.", tags: ["State"] },
      { name: "favorite_model.dart", description: "Bookmark data model.", tags: ["Data"] },
      { name: "search_engine_model.dart", description: "Search engine configuration.", tags: ["Data"] },
      { name: "web_archive_model.dart", description: "Archived page model.", tags: ["Data"] },
    ]
  },
  {
    title: "App Bar Components",
    icon: Settings2,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-400",
    description: "App bars: tab toolbar, desktop toolbar, certificate info",
    components: [
      { name: "webview_tab_app_bar.dart", lines: 2350, description: "Tab-specific toolbar with URL bar and navigation controls.", tags: ["UI"] },
      { name: "certificates_info_popup.dart", lines: 1545, description: "SSL certificate information with chain visualization.", tags: ["UI"] },
      { name: "desktop_app_bar.dart", lines: 603, description: "Desktop mode toolbar with window controls.", tags: ["UI"] },
      { name: "tab_viewer_app_bar.dart", lines: 232, description: "Tab grid toolbar with view options.", tags: ["UI"] },
      { name: "custom_app_bar_wrapper.dart", description: "Theme-aware app bar wrapper.", tags: ["UI"] },
      { name: "url_info_popup.dart", description: "URL details popup with SSL info.", tags: ["UI"] },
    ]
  },
  {
    title: "Developer Tools",
    icon: Code2,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    description: "Dev tools: storage manager, network info, JS console",
    components: [
      { name: "storage_manager.dart", lines: 1052, description: "Storage management interface with cache clearing.", tags: ["Debug"] },
      { name: "network_info.dart", lines: 252, description: "Network diagnostics panel with request logging.", tags: ["Debug"] },
      { name: "java_script_console.dart", description: "JS console output viewer.", tags: ["Debug"] },
      { name: "developer_main.dart", description: "Developer tools entry point.", tags: ["Debug"] },
    ]
  },
  {
    title: "Settings Pages",
    icon: Settings,
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/20",
    iconColor: "text-pink-400",
    description: "Settings: Android, iOS, cross-platform, settings hub",
    components: [
      { name: "main.dart (settings)", lines: 723, description: "Settings hub entry with category navigation.", tags: ["Settings"] },
      { name: "android_settings.dart", lines: 1100, description: "Android-specific settings (notifications, permissions).", tags: ["Android"] },
      { name: "ios_settings.dart", lines: 590, description: "iOS-specific settings (Face ID, haptics).", tags: ["iOS"] },
      { name: "cross_platform_settings.dart", lines: 1149, description: "Shared settings across platforms (sync, AI, privacy).", tags: ["Shared"] },
    ]
  },
  {
    title: "UI Components",
    icon: LayoutGrid,
    color: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-400",
    description: "Widgets: tab viewer, dialogs, images, animations",
    components: [
      { name: "tab_viewer.dart", lines: 286, description: "Tab grid/list viewer with drag-and-drop.", tags: ["UI"] },
      { name: "long_press_alert_dialog.dart", lines: 357, description: "Alert dialog for long press actions.", tags: ["UI"] },
      { name: "custom_popup_dialog.dart", lines: 156, description: "Custom styled popup dialog.", tags: ["UI"] },
      { name: "custom_popup_menu_item.dart", lines: 86, description: "Custom popup menu items.", tags: ["UI"] },
      { name: "multiselect_dialog.dart", lines: 134, description: "Multi-select dialog widget.", tags: ["UI"] },
      { name: "custom_image.dart", lines: 65, description: "Custom image widget with caching.", tags: ["UI"] },
      { name: "empty_tab.dart", lines: 90, description: "Empty state for new tabs.", tags: ["UI"] },
      { name: "url_predictor.dart", lines: 45, description: "URL autocomplete predictions.", tags: ["UI"] },
      { name: "animated_logo.dart", lines: 49, description: "Animated browser logo.", tags: ["UI"] },
      { name: "material_transparent_route.dart", lines: 56, description: "Transparent page route for dialogs.", tags: ["Navigation"] },
      { name: "popup_menu_actions.dart", lines: 82, description: "Popup menu action handlers.", tags: ["Menu"] },
    ]
  },
];

const backgroundServiceComponents: ComponentEntry[] = [
  { name: "service-main.js", lines: 375, description: "Entry point for background service, initializes all modules with system tray.", tags: ["Main"] },
  { name: "scheduler.js", lines: 383, description: "Cron-based task scheduler using node-cron library with timezone support.", tags: ["Scheduler"] },
  { name: "task-queue.js", lines: 437, description: "Priority queue with retry logic, dead letter handling, and concurrent limiting.", tags: ["Queue"] },
  { name: "pdf-sync.js", lines: 449, description: "PDF file sync server for mobile access with automatic file discovery.", tags: ["Sync"] },
  { name: "model-selector.js", lines: 244, description: "AI model picker with Ollama, Gemini, OpenAI, Anthropic, Groq options.", tags: ["AI"] },
  { name: "ollama-manager.js", lines: 212, description: "Ollama API integration for local model management with caching.", tags: ["AI"] },
  { name: "notifications.js", lines: 231, description: "Desktop notifications for task completion and errors with icons.", tags: ["Notify"] },
  { name: "ipc-service.js", lines: 289, description: "IPC bridge between browser and background service via WebSocket.", tags: ["IPC"] },
  { name: "storage.js", lines: 253, description: "File management for task outputs, logs, and generated files.", tags: ["Storage"] },
  { name: "tray-manager.js", lines: 246, description: "System tray integration with context menu and status updates.", tags: ["Tray"] },
  { name: "mobile-notifier.js", lines: 178, description: "Mobile push notification bridge via sync service.", tags: ["Notify"] },
  { name: "sleep-handler.js", lines: 127, description: "System sleep/wake recovery with task resumption.", tags: ["System"] },
];

const totalComponents = desktopCategories.reduce((sum, cat) => sum + cat.components.length, 0) + 
                        flutterCategories.reduce((sum, cat) => sum + cat.components.length, 0) + 
                        backgroundServiceComponents.length;

const flutterTotal = flutterCategories.reduce((sum, cat) => sum + cat.components.length, 0);
const flutterTotalLines = flutterCategories.reduce((sum, cat) => 
  sum + cat.components.reduce((lineSum, comp) => lineSum + (comp.lines || 0), 0), 0);

const desktopTotal = desktopCategories.reduce((sum, cat) => sum + cat.components.length, 0);

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function ComponentCard({ component, color, borderColor }: { component: ComponentEntry; color: string; borderColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href={`/docs/components/${slugify(component.name)}`}>
        <div className="group block rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                  {component.name}
                </h3>
                {component.lines && (
                  <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-white/30">
                    {component.lines.toLocaleString()} lines
                  </span>
                )}
              </div>
              <p className="text-xs text-white/40 line-clamp-2">{component.description}</p>
              {component.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {component.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {component.path && (
              <ArrowRight size={14} className="shrink-0 mt-1 text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-sky-400" />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategorySectionComponent({ category, index }: { category: CategorySection; index: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mb-6 flex w-full items-center gap-4 group"
      >
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} transition-transform group-hover:scale-105`}>
          <category.icon size={24} className={category.iconColor} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
            {category.components.length} components
          </p>
          <h2 className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
            {category.title}
            {category.description && (
              <span className="text-sm font-normal text-white/40 normal-case tracking-normal">
                — {category.description}
              </span>
            )}
          </h2>
        </div>
        <div className={`p-2 rounded-lg bg-white/5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight size={18} className="text-white/40" />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.components.map((component) => (
                <ComponentCard
                  key={component.name}
                  component={component}
                  color={category.color}
                  borderColor={category.borderColor}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState<"desktop" | "flutter" | "service" | "integrations">("desktop");
  
  const tabs = [
    { id: "desktop" as const, label: "Desktop", icon: Monitor, count: desktopCategories.reduce((sum, cat) => sum + cat.components.length, 0) },
    { id: "flutter" as const, label: "Mobile", icon: Smartphone, count: flutterCategories.reduce((sum, cat) => sum + cat.components.length, 0) },
    { id: "service" as const, label: "Service", icon: Server, count: backgroundServiceComponents.length },
    { id: "integrations" as const, label: "Platform", icon: Cpu, count: 25 },
  ];

  return (
    <div className="space-y-24">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <LayoutGrid size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Component Inventory
          </span>
        </div>
        
        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl lg:text-8xl">
          Component Inventory
        </h1>
        
        <p className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Component inventory for Aartiq. Auto-generated by aartiq-browser/scripts/component-scanner.js. Data source: src/data/component-data.json
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-2xl px-6 py-4 text-sm font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              <span className={`rounded px-2 py-0.5 text-xs ${activeTab === tab.id ? "bg-white/20" : "bg-white/5"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.section>

      <AnimatePresence mode="wait">
        {activeTab === "desktop" && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            {desktopCategories.map((category, index) => (
              <CategorySectionComponent key={category.title} category={category} index={index} />
            ))}
          </motion.div>
        )}

        {activeTab === "flutter" && (
          <motion.div
            key="flutter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-16"
          >
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/5 bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-8"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
                  <MonitorSmartphone size={28} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
                    Flutter Mobile App
                  </p>
                  <h2 className="text-2xl font-black uppercase tracking-wider">
                    Cross-Platform Browser
                  </h2>
                </div>
              </div>
              <p className="text-white/50 mb-6">
                Full-featured mobile browser with WebView, AI chat, remote desktop control, 
                and sync with the desktop app via WebSocket.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/40">
                  <Package size={16} className="text-sky-400" /> {flutterTotal} Dart files
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Code2 size={16} className="text-emerald-400" /> {flutterTotalLines.toLocaleString()} total lines
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Smartphone size={16} className="text-purple-400" /> iOS & Android
                </div>
              </div>
            </motion.section>

            {flutterCategories.map((category, index) => (
              <CategorySectionComponent key={category.title} category={category} index={index} />
            ))}
          </motion.div>
        )}

        {activeTab === "service" && (
          <motion.div
            key="service"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/5 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-8"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20">
                  <Server size={28} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
                    Background Service
                  </p>
                  <h2 className="text-2xl font-black uppercase tracking-wider">
                    System-Level Automation
                  </h2>
                </div>
              </div>
              <p className="text-white/50 mb-6">
                Runs as an OS-level service (SYSTEM on Windows, LaunchDaemon on macOS) 
                to execute scheduled tasks even when the browser is closed. Memory footprint: ~30-50MB.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/40">
                  <Timer size={16} className="text-amber-400" /> node-cron scheduler
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Bell size={16} className="text-pink-400" /> Desktop & mobile notifications
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <RefreshCw size={16} className="text-blue-400" /> Sleep/wake recovery
                </div>
                <div className="flex items-center gap-2 text-white/40">
                  <Code2 size={16} className="text-emerald-400" /> 3,754 total lines
                </div>
              </div>
            </motion.section>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {backgroundServiceComponents.map((component, index) => (
                <motion.div
                  key={component.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link href={`/docs/components/${slugify(component.name)}`}>
                    <div className="h-full rounded-xl border border-white/5 bg-white/[0.02] p-5 hover:border-emerald-500/20 hover:bg-white/[0.04] transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Server size={18} className="text-emerald-400" />
                        </div>
                        <h3 className="font-mono text-sm font-bold text-white flex-1 truncate">
                          {component.name}
                        </h3>
                        {component.lines && (
                          <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-white/30">
                            {component.lines} lines
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/40 mb-3">{component.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {component.tags?.map((tag) => (
                          <span key={tag} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl border border-white/5 bg-white/[0.02] p-8"
            >
              <h3 className="mb-6 text-xl font-black uppercase tracking-wider">
                Service Architecture
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                    <Play size={18} className="text-sky-400" />
                  </div>
                  <h4 className="mb-2 font-bold text-white">Task Scheduling</h4>
                  <p className="text-xs text-white/40">
                    Cron expressions define when tasks run. Supports daily, hourly, 
                    custom intervals, and one-time execution.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                    <Workflow size={18} className="text-purple-400" />
                  </div>
                  <h4 className="mb-2 font-bold text-white">Task Queue</h4>
                  <p className="text-xs text-white/40">
                    Priority-based queue with exponential backoff retry. 
                    Failed tasks are logged and can be manually retried.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                    <Bell size={18} className="text-emerald-400" />
                  </div>
                  <h4 className="mb-2 font-bold text-white">Notifications</h4>
                  <p className="text-xs text-white/40">
                    Desktop notifications for task completion. 
                    Push notifications to mobile via sync service.
                  </p>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}

        {activeTab === "integrations" && (
          <motion.div
            key="integrations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-orange-500/5 bg-gradient-to-br from-orange-500/5 to-blue-500/5 p-8"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-500/20">
                  <Cpu size={28} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
                    Platform Integrations
                  </p>
                  <h2 className="text-2xl font-black uppercase tracking-wider">
                    Native OS Features
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Apple size={24} className="mb-4 text-white/60" />
                  <h4 className="mb-2 font-bold text-white">macOS Integration</h4>
                  <p className="mb-4 text-xs text-white/40">
                    Siri Shortcuts, AppleScript, Vision Kit, Voice Control
                  </p>
                  <ul className="space-y-2 text-xs text-white/60">
                    <li>• App Intents (12 shortcuts)</li>
                    <li>• URL scheme: aartiq://</li>
                    <li>• Voice: Dictation + TTS</li>
                    <li>• OCR: Vision framework</li>
                    <li>• Click: steve CLI / AXUIElement</li>
                  </ul>
                  <Link href="/docs/apple-integration" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300">
                    View Docs <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Monitor size={24} className="mb-4 text-white/60" />
                  <h4 className="mb-2 font-bold text-white">Windows Integration</h4>
                  <p className="mb-4 text-xs text-white/40">
                    Shortcuts, Voice, Copilot, PowerShell
                  </p>
                  <ul className="space-y-2 text-xs text-white/60">
                    <li>• Windows Shortcuts support</li>
                    <li>• Protocol: com.microsoft.copilot:</li>
                    <li>• Voice: System.Speech</li>
                    <li>• OCR: Windows OCR API</li>
                    <li>• Click: xa11y / nut.js</li>
                  </ul>
                  <Link href="/docs/windows-integration" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300">
                    View Docs <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <Terminal size={24} className="mb-4 text-white/60" />
                  <h4 className="mb-2 font-bold text-white">Linux Integration</h4>
                  <p className="mb-4 text-xs text-white/40">
                    GNOME, KDE, XFCE, MATE
                  </p>
                  <ul className="space-y-2 text-xs text-white/60">
                    <li>• Desktop entries (.desktop)</li>
                    <li>• URL scheme: aartiq://</li>
                    <li>• Voice: espeak (80+ voices)</li>
                    <li>• OCR: AT-SPI2</li>
                    <li>• Click: xdotool</li>
                  </ul>
                  <Link href="/docs/linux-integration" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300">
                    View Docs <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.section>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h3 className="mb-6 text-lg font-bold text-white">Platform-Specific Automation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-3 text-left text-xs font-medium text-white/40">Feature</th>
                      <th className="pb-3 text-left text-xs font-medium text-white/40">macOS</th>
                      <th className="pb-3 text-left text-xs font-medium text-white/40">Windows</th>
                      <th className="pb-3 text-left text-xs font-medium text-white/40">Linux</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 text-white/60">Clicking</td>
                      <td className="py-3 text-white/40">steve CLI / AXUIElement</td>
                      <td className="py-3 text-white/40">nut.js / xa11y</td>
                      <td className="py-3 text-white/40">xdotool</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/60">OCR</td>
                      <td className="py-3 text-white/40">Vision framework</td>
                      <td className="py-3 text-white/40">Windows OCR</td>
                      <td className="py-3 text-white/40">AT-SPI2 + Tesseract</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/60">TTS</td>
                      <td className="py-3 text-white/40">AVSpeechSynthesizer</td>
                      <td className="py-3 text-white/40">System.Speech</td>
                      <td className="py-3 text-white/40">espeak</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/60">Voice Input</td>
                      <td className="py-3 text-white/40">Dictation</td>
                      <td className="py-3 text-white/40">System.Speech</td>
                      <td className="py-3 text-white/40">pocketsphinx</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/60">Shortcuts</td>
                      <td className="py-3 text-white/40">Shortcuts App</td>
                      <td className="py-3 text-white/40">Windows Shortcuts</td>
                      <td className="py-3 text-white/40">.desktop files</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-white/60">Protocol</td>
                      <td className="py-3 text-white/40">aartiq://</td>
                      <td className="py-3 text-white/40">aartiq://</td>
                      <td className="py-3 text-white/40">aartiq://</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl border border-white/5 bg-white/[0.02] p-8"
      >
        <h3 className="mb-8 text-xl font-black uppercase tracking-wider">
          Quick Stats
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white/5 p-6 text-center">
            <div className="mb-2 text-4xl font-black text-sky-400">{totalComponents}</div>
            <p className="text-sm text-white/40">Total Components</p>
          </div>
          <div className="rounded-xl bg-white/5 p-6 text-center">
            <div className="mb-2 text-4xl font-black text-emerald-400">{desktopTotal}</div>
            <p className="text-sm text-white/40">Desktop (Electron)</p>
          </div>
          <div className="rounded-xl bg-white/5 p-6 text-center">
            <div className="mb-2 text-4xl font-black text-purple-400">{flutterTotal}</div>
            <p className="text-sm text-white/40">Mobile (Flutter)</p>
          </div>
          <div className="rounded-xl bg-white/5 p-6 text-center">
            <div className="mb-2 text-4xl font-black text-amber-400">{desktopCategories.reduce((sum, cat) => sum + cat.components.reduce((lineSum, comp) => lineSum + (comp.lines || 0), 0), 0) + flutterTotalLines + backgroundServiceComponents.reduce((sum, comp) => sum + (comp.lines || 0), 0)}</div>
            <p className="text-sm text-white/40">Total Lines</p>
          </div>
        </div>
        <p className="text-xs text-white/40 mt-4 text-center">
          Line counts auto-generated by aartiq-browser/scripts/component-scanner.js
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <Terminal size={24} className="text-sky-400" />
          <h3 className="text-xl font-black uppercase tracking-wider">
            Auto-Update Component Data
          </h3>
        </div>
        <p className="text-white/60 mb-6">
          Run the component scanner to update line counts and metadata:
        </p>
        <div className="bg-black/40 rounded-xl p-4 font-mono text-sm">
          <div className="text-white/40 mb-2"># Scan all components (desktop + Flutter)</div>
          <div className="text-sky-400">cd aartiq-browser && node scripts/component-scanner.js --all</div>
          <div className="text-white/40 mt-4 mb-2"># Check for undocumented components</div>
          <div className="text-sky-400">node scripts/component-scanner.js --missing</div>
          <div className="text-emerald-400 mt-4 text-xs">
            <RefreshCw size={12} className="inline mr-1" />
            Stats auto-sync from src/data/component-data.json on page load.
          </div>
        </div>
        <p className="text-xs text-white/40 mt-4">
          Line counts auto-generated by aartiq-browser/scripts/component-scanner.js
        </p>
      </motion.section>
    </div>
  );
}
