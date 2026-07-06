"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Code,
  Box,
  Terminal,
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  Monitor,
  Keyboard,
  MousePointer,
  Volume2,
  FolderOpen,
  Globe,
  Printer,
  Share2,
  Settings,
  Smartphone,
  Tablet,
  Laptop,
  Layers,
  Plug,
  Zap,
  CheckCircle2,
  CircleX,
  AlertTriangle,
  ArrowRight,
  Copy,
  Braces,
  Database,
  Server,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Minus,
  Maximize,
  Minimize,
  X,
  RefreshCw,
  Command,
  ChevronRight,
  Sparkles
} from "lucide-react";

const apiCategories = [
  {
    id: "system",
    name: "System APIs",
    icon: Cpu,
    fileRef: "src/main/handlers/system.js",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    description: "Control system-level functions like displays, power, and system preferences.",
    apis: [
      { name: "getSystemInfo", desc: "Get CPU, memory, disk info", returns: "SystemInfo" },
      { name: "getDisplays", desc: "List all connected displays", returns: "Display[]" },
      { name: "setDisplayMode", desc: "Change resolution, refresh rate", returns: "void" },
      { name: "getSystemPreferences", desc: "Get macOS system preferences", returns: "Preferences" },
      { name: "setSystemPreference", desc: "Update system preferences", returns: "void" },
      { name: "lockScreen", desc: "Lock the computer", returns: "void" },
      { name: "sleep", desc: "Put display to sleep", returns: "void" },
      { name: "restart", desc: "Restart the system", returns: "void" },
      { name: "shutdown", desc: "Shut down the system", returns: "void" }
    ]
  },
  {
    id: "window",
    name: "Window Management",
    icon: Monitor,
    fileRef: "src/main/handlers/window.js",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description: "Control window positioning, sizing, and state.",
    apis: [
      { name: "getWindows", desc: "List all open windows", returns: "Window[]" },
      { name: "focusWindow", desc: "Focus a specific window", returns: "void" },
      { name: "setWindowBounds", desc: "Move and resize window", returns: "void" },
      { name: "minimizeWindow", desc: "Minimize window to dock", returns: "void" },
      { name: "maximizeWindow", desc: "Maximize window to fullscreen", returns: "void" },
      { name: "closeWindow", desc: "Close a window", returns: "void" },
      { name: "setWindowAlwaysOnTop", desc: "Pin window above others", returns: "void" },
      { name: "getWindowTitle", desc: "Get window title", returns: "string" },
      { name: "getWindowApp", desc: "Get owning application", returns: "AppInfo" }
    ]
  },
  {
    id: "input",
    name: "Input Control",
    icon: Keyboard,
    fileRef: "src/main/handlers/input.js",
    color: "from-purple-500/20 to-fuchsia-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    description: "Control keyboard, mouse, and other input devices.",
    apis: [
      { name: "typeText", desc: "Type text at cursor", returns: "void" },
      { name: "pressKey", desc: "Press a keyboard key", returns: "void" },
      { name: "pressHotKey", desc: "Press modifier + key combo", returns: "void" },
      { name: "moveMouse", desc: "Move cursor to position", returns: "void" },
      { name: "clickMouse", desc: "Click at cursor position", returns: "void" },
      { name: "scrollMouse", desc: "Scroll wheel", returns: "void" },
      { name: "dragMouse", desc: "Drag from to position", returns: "void" },
      { name: "getMousePosition", desc: "Get cursor coordinates", returns: "Point" },
      { name: "getActiveApp", desc: "Get frontmost app", returns: "AppInfo" }
    ]
  },
  {
    id: "files",
    name: "File System",
    icon: FolderOpen,
    fileRef: "src/main/handlers/files.js",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    description: "Read, write, and manage files and directories.",
    apis: [
      { name: "readFile", desc: "Read file contents", returns: "string | Buffer" },
      { name: "writeFile", desc: "Write to file", returns: "void" },
      { name: "appendFile", desc: "Append to file", returns: "void" },
      { name: "deleteFile", desc: "Delete a file", returns: "void" },
      { name: "moveFile", desc: "Move/rename file", returns: "void" },
      { name: "copyFile", desc: "Copy file", returns: "void" },
      { name: "listDirectory", desc: "List directory contents", returns: "FileInfo[]" },
      { name: "createDirectory", desc: "Create directory", returns: "void" },
      { name: "getFileInfo", desc: "Get file metadata", returns: "FileInfo" }
    ]
  },
  {
    id: "network",
    name: "Network & URLs",
    icon: Wifi,
    fileRef: "src/main/handlers/network.js",
    color: "from-cyan-500/20 to-sky-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    description: "Network requests, URL handling, and connectivity.",
    apis: [
      { name: "httpRequest", desc: "Make HTTP request", returns: "Response" },
      { name: "downloadFile", desc: "Download from URL", returns: "string" },
      { name: "openURL", desc: "Open URL in browser/app", returns: "void" },
      { name: "getLocalIP", desc: "Get local IP address", returns: "string" },
      { name: "ping", desc: "Ping a host", returns: "number" },
      { name: "getNetworkStatus", desc: "Get connectivity info", returns: "NetworkStatus" }
    ]
  },
  {
    id: "media",
    name: "Media Control",
    icon: Volume2,
    fileRef: "src/main/handlers/media.js",
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    description: "Control audio, video, and media playback.",
    apis: [
      { name: "setVolume", desc: "Set system volume (0-100)", returns: "void" },
      { name: "getVolume", desc: "Get current volume", returns: "number" },
      { name: "muteAudio", desc: "Mute/unmute system audio", returns: "void" },
      { name: "playPauseMedia", desc: "Play/pause media keys", returns: "void" },
      { name: "nextTrack", desc: "Next media track", returns: "void" },
      { name: "prevTrack", desc: "Previous media track", returns: "void" },
      { name: "screenshot", desc: "Take screenshot", returns: "string (base64)" },
      { name: "screenRecord", desc: "Record screen", returns: "string" }
    ]
  },
  {
    id: "vision",
    name: "Visual Automation",
    icon: Eye,
    fileRef: "src/lib/ocr/",
    color: "from-rose-500/20 to-orange-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-300",
    description: "Native-first OCR and cross-app clicking across macOS, Windows, and Linux.",
    apis: [
      { name: "performOCR", desc: "Run native-first OCR on the screen or a region", returns: "OCRResult" },
      { name: "ocrCaptureWords", desc: "Get OCR words and reconstructed lines with provider metadata", returns: "OCRCaptureResult" },
      { name: "ocrClick", desc: "Resolve and click visible desktop text targets", returns: "OCRClickResult" },
      { name: "performCrossAppClick", desc: "Click external app coordinates after approval", returns: "void" },
      { name: "findAndClickText", desc: "Shared high-level visible-text click helper", returns: "boolean" }
    ]
  },
  {
    id: "apple",
    name: "Apple Intelligence",
    icon: Sparkles,
    fileRef: "src/lib/native-panels/",
    color: "from-sky-500/20 to-violet-500/20",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-300",
    description: "macOS-only native AI bridge for Foundation Models, Apple readiness checks, and local image generation.",
    apis: [
      { name: "apple-intelligence-status", desc: "Check if Apple Intelligence is supported, enabled, and ready", returns: "AppleIntelligenceStatus" },
      { name: "apple-intelligence-summary", desc: "Generate a local summary through Foundation Models", returns: "AppleSummaryResult" },
      { name: "apple-intelligence-generate-image", desc: "Generate a local image through Apple frameworks", returns: "AppleImageResult" },
      { name: "show-mac-native-panel", desc: "Open native SwiftUI panel modes on macOS", returns: "PanelResult" },
      { name: "update-native-mac-ui-state", desc: "Push state from Electron into native macOS panels", returns: "void" }
    ]
  }
];

const codeExamples = {
  systemInfo: `// Get comprehensive system information
const info = await window.electron.invoke('get-system-info');
console.log(info);
// {
//   platform: 'darwin',
//   arch: 'arm64',
//   version: '14.2.1',
//   cpu: { model: 'Apple M2 Pro', cores: 12, speed: 3.5 },
//   memory: { total: 32768, free: 16384 },
//   disk: { total: 1000245632000, free: 500122931200 },
//   uptime: 864000 // seconds
// }`,

  windowControl: `// Control window positioning
await window.electron.invoke('set-window-bounds', {
  windowId: 'main',
  x: 100,
  y: 100,
  width: 1200,
  height: 800
});

// Minimize, maximize, close
await window.electron.invoke('minimize-window', 'main');
await window.electron.invoke('maximize-window', 'main');
await window.electron.invoke('close-window', 'main');

// Set always on top
await window.electron.invoke('set-window-always-on-top', {
  windowId: 'main',
  alwaysOnTop: true
});`,

  inputSimulation: `// Type text
await window.electron.invoke('type-text', 'Hello, World!');

// Press key combinations
await window.electron.invoke('press-hot-key', {
  modifiers: ['command'],
  key: 'a'
}); // Select all

await window.electron.invoke('press-hot-key', {
  modifiers: ['command', 'shift'],
  key: '4'
}); // Screenshot selection

// Mouse control
await window.electron.invoke('move-mouse', { x: 500, y: 300 });
await window.electron.invoke('click-mouse', { button: 'left' });
await window.electron.invoke('scroll-mouse', { deltaY: -100 });`,

  fileOperations: `// Read a file
const content = await window.electron.invoke('read-file', {
  path: '~/Documents/example.txt'
});

// Write to a file
await window.electron.invoke('write-file', {
  path: '~/Documents/output.txt',
  content: 'Hello from Aartiq!'
});

// List directory
const files = await window.electron.invoke('list-directory', {
  path: '~/Documents'
});
console.log(files);
// [{ name: 'file.txt', isDirectory: false, size: 1024 }, ...]

// Create directory
await window.electron.invoke('create-directory', {
  path: '~/Documents/NewFolder'
});`,

  networkRequest: `// Make HTTP request
const response = await window.electron.invoke('http-request', {
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: { 'Authorization': 'Bearer token' }
});
console.log(response);
// { status: 200, data: { ... }, headers: {...} }

// Download file
const localPath = await window.electron.invoke('download-file', {
  url: 'https://example.com/file.pdf',
  destination: '~/Downloads/'
});

// Open URL
await window.electron.invoke('open-url', 'https://example.com');`,

  mediaControl: `// Set volume (0-100)
await window.electron.invoke('set-volume', 50);

// Mute/unmute
await window.electron.invoke('mute-audio', true);

// Take screenshot
const screenshot = await window.electron.invoke('screenshot', {
  format: 'png',
  quality: 100
});
// Returns base64 encoded image

// Take screenshot of region
const region = await window.electron.invoke('screenshot', {
  x: 100, y: 100,
  width: 800, height: 600,
  format: 'png'
});`,

  vision: `// Native-first OCR capture
const result = await window.electronAPI.ocrCaptureWords();
console.log(result.provider);
console.log(result.lines?.slice(0, 5));

// Native-first external app click
const clickResult = await window.electronAPI.ocrClick('Run', true);
console.log(clickResult);

// OCR raw text for the current display
const screenText = await window.electronAPI.ocrScreenText();
console.log(screenText.text);`,

  apple: `// Check Apple Intelligence readiness on macOS
const status = await window.electronAPI.getAppleIntelligenceStatus();
console.log(status);
// {
//   success: true,
//   osVersion: 'macOS ...',
//   summaryAvailable: false,
//   summaryReason: 'Apple Intelligence is not supported on this Mac.',
//   imageAvailable: false,
//   imageReason: 'Apple image generation is not supported or not available right now on this Mac.'
// }

// Generate a local summary only when summaryAvailable === true
const summary = await window.electronAPI.summarizeWithAppleIntelligence(
  "Summarize this browser content for me."
);

// Generate a local image only when imageAvailable === true
const image = await window.electronAPI.generateAppleIntelligenceImage({
  prompt: "A cinematic comet streaking over a desktop browser UI"
});`,

  nativeApiCall: `// Full example: Open app, type, and save
async function createDocument() {
  // Open TextEdit
  await window.electron.invoke('open-app', 'TextEdit');
  
  // Wait for app to focus
  await delay(500);
  
  // Type content
  await window.electron.invoke('type-text', '# My Document\\n\\n');
  await window.electron.invoke('type-text', 'This was created by Aartiq!');
  
  // Save with Cmd+S
  await window.electron.invoke('press-hot-key', {
    modifiers: ['command'],
    key: 's'
  });
  
  // Wait for save dialog, type filename
  await delay(300);
  await window.electron.invoke('type-text', 'my-document');
  await window.electron.invoke('press-key', 'enter');
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`
};

const appleAdvancedPaths = [
  {
    title: "Foundation Models",
    description: "Use Apple's on-device language model for summarization, structured output, and tool-aware generation on supported Macs.",
    fileRef: "src/lib/native-panels/AppleIntelligenceBridge.swift"
  },
  {
    title: "Image Playground / ImageCreator",
    description: "Use Apple's native image stack for Mac-only creative workflows, either with programmatic generation or Apple-controlled UI.",
    fileRef: "src/lib/native-panels/AppleIntelligenceBridge.swift"
  },
  {
    title: "Writing Tools",
    description: "For richer editor integration, custom AppKit views can expose text directly to Apple's Writing Tools instead of routing everything through chat.",
    fileRef: "src/lib/native-panels/"
  },
  {
    title: "Assistant Schemas",
    description: "For deeper Siri and Apple Intelligence integration, App Intents domains and schemas can expose Comet actions and content to Apple's assistant layer.",
    fileRef: "src/lib/SiriShortcutsIntegration.ts"
  }
];

const typeDefinitions = `// Type definitions for all Native APIs

interface SystemInfo {
  platform: 'darwin' | 'windows' | 'linux';
  arch: string;
  version: string;
  cpu: { model: string; cores: number; speed: number };
  memory: { total: number; free: number };
  disk: { total: number; free: number };
  uptime: number;
}

interface Display {
  id: number;
  name: string;
  bounds: { x: number; y: number; width: number; height: number };
  isPrimary: boolean;
  scaleFactor: number;
}

interface Window {
  id: string;
  title: string;
  app: AppInfo;
  bounds: { x: number; y: number; width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
}

interface AppInfo {
  name: string;
  bundleId: string;
  pid: number;
  icon?: string;
}

interface Point {
  x: number;
  y: number;
}

interface FileInfo {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modifiedAt: Date;
}

interface NetworkStatus {
  connected: boolean;
  type: 'wifi' | 'ethernet' | 'cellular' | 'none';
  strength?: number;
}

interface HttpResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
}

// API Methods

// System
invoke('get-system-info'): Promise<SystemInfo>
invoke('get-displays'): Promise<Display[]>
invoke('set-display-mode', { displayId, width, height, refreshRate }): Promise<void>
invoke('get-system-preferences'): Promise<Preferences>
invoke('set-system-preference', { key, value }): Promise<void>
invoke('lock-screen'): Promise<void>
invoke('sleep'): Promise<void>
invoke('restart'): Promise<void>
invoke('shutdown'): Promise<void>

// Window
invoke('get-windows'): Promise<Window[]>
invoke('focus-window', { windowId }): Promise<void>
invoke('set-window-bounds', { windowId, x, y, width, height }): Promise<void>
invoke('minimize-window', { windowId }): Promise<void>
invoke('maximize-window', { windowId }): Promise<void>
invoke('close-window', { windowId }): Promise<void>
invoke('set-window-always-on-top', { windowId, alwaysOnTop }): Promise<void>

// Input
invoke('type-text', { text }): Promise<void>
invoke('press-key', { key }): Promise<void>
invoke('press-hot-key', { modifiers, key }): Promise<void>
invoke('move-mouse', { x, y }): Promise<void>
invoke('click-mouse', { button, x?, y? }): Promise<void>
invoke('scroll-mouse', { deltaX, deltaY }): Promise<void>
invoke('drag-mouse', { fromX, fromY, toX, toY }): Promise<void>
invoke('get-mouse-position'): Promise<Point>
invoke('get-active-app'): Promise<AppInfo>

// Files
invoke('read-file', { path, encoding? }): Promise<string | Buffer>
invoke('write-file', { path, content, encoding? }): Promise<void>
invoke('append-file', { path, content }): Promise<void>
invoke('delete-file', { path }): Promise<void>
invoke('move-file', { source, destination }): Promise<void>
invoke('copy-file', { source, destination }): Promise<void>
invoke('list-directory', { path }): Promise<FileInfo[]>
invoke('create-directory', { path }): Promise<void>
invoke('get-file-info', { path }): Promise<FileInfo>

// Network
invoke('http-request', { method, url, headers?, body?, timeout? }): Promise<HttpResponse>
invoke('download-file', { url, destination, filename? }): Promise<string>
invoke('open-url', { url }): Promise<void>
invoke('get-local-ip'): Promise<string>
invoke('ping', { host }): Promise<number>
invoke('get-network-status'): Promise<NetworkStatus>

// Media
invoke('set-volume', { level }): Promise<void>
invoke('get-volume'): Promise<number>
invoke('mute-audio', { muted }): Promise<void>
invoke('play-pause-media'): Promise<void>
invoke('next-track'): Promise<void>
invoke('prev-track'): Promise<void>
invoke('screenshot', { x?, y?, width?, height?, format?, quality? }): Promise<string>`;

export default function NativeAPIPage() {
  const [activeCategory, setActiveCategory] = useState("system");
  const [codeTab, setCodeTab] = useState<"system" | "window" | "input" | "files" | "network" | "media" | "vision" | "apple">("system");
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const activeApi = apiCategories.find(c => c.id === activeCategory);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2">
          <Code size={14} className="text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
            Native API
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Native <span className="text-white/20">API</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          System-level APIs exposed through Electron IPC channels. Handlers are registered in 
          <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/core/ipc-handlers.js</code> 
          and organized per domain in 
          <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/main/handlers/</code>. 
          All APIs accessible via <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">window.electron.invoke()</code> through the preload bridge.
        </p>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          {[
            { icon: Box, label: "APIs", value: "60+", color: "text-blue-400", border: "border-blue-500/20" },
            { icon: Cpu, label: "System", value: "9", color: "text-emerald-400", border: "border-emerald-500/20" },
            { icon: Monitor, label: "Window", value: "9", color: "text-purple-400", border: "border-purple-500/20" },
            { icon: Eye, label: "Visual", value: "5", color: "text-rose-300", border: "border-rose-500/20" },
            { icon: Sparkles, label: "Apple AI", value: "5", color: "text-sky-300", border: "border-sky-500/20" }
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl border ${stat.border} bg-white/5 p-6 text-center`}>
              <stat.icon size={32} className={`mx-auto mb-4 ${stat.color}`} />
              <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
              <p className="text-sm text-white/50">{stat.label} APIs</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="mb-10">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            macOS Native AI
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Apple Intelligence <span className="text-white/20">Paths</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/40">
            Comet ships a native Swift helper for readiness checks, summaries, and Apple image generation.
            Apple's platform docs also point to more advanced integrations through Writing Tools, App Intents
            assistant schemas, and native Image Playground interfaces.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {appleAdvancedPaths.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
              <div className="mb-4 flex items-center gap-3 text-sky-300">
                <Sparkles size={18} />
                <h3 className="text-lg font-black uppercase tracking-wider">{item.title}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/45">{item.description}</p>
              <p className="font-mono text-[10px] text-white/20">{item.fileRef}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* API Categories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Available APIs
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            API <span className="text-white/20">Categories</span>
          </h2>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {apiCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all ${
                activeCategory === category.id
                  ? `${category.borderColor} bg-gradient-to-br ${category.color}`
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <category.icon size={28} className={category.iconColor} />
              <span className={`text-xs font-bold uppercase tracking-wider ${activeCategory === category.id ? "text-white" : "text-white/60"}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {activeApi && (
          <div className={`rounded-[2rem] border ${activeApi.borderColor} bg-gradient-to-br ${activeApi.color} p-10`}>
            <div className="mb-8 flex items-center gap-6">
              <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 ${activeApi.iconColor}`}>
                <activeApi.icon size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-wider">{activeApi.name}</h3>
                <p className="text-white/60">{activeApi.description}</p>
                <p className="mt-1 font-mono text-[10px] text-white/30">{activeApi.fileRef}</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {activeApi.apis.map((api) => (
                <div key={api.name} className="rounded-xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <code className="font-mono font-bold text-white">{api.name}()</code>
                    <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-mono text-sky-400">
                      {api.returns}
                    </span>
                  </div>
                  <p className="text-sm text-white/50">{api.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* Code Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Implementation
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Code <span className="text-white/20">Examples</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {apiCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCodeTab(category.id as any)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                codeTab === category.id
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <category.icon size={16} />
              {category.name}
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider">
              {codeExamples[codeTab as keyof typeof codeExamples] ? 
                `${apiCategories.find(c => c.id === codeTab)?.name} Example` : 
                "Example"
              }
            </h3>
            <button
              onClick={() => copyToClipboard(codeExamples[codeTab as keyof typeof codeExamples] || '', `code-${codeTab}`)}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-bold text-white/60 transition-colors hover:bg-white/10"
            >
              {showCopied === `code-${codeTab}` ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {showCopied === `code-${codeTab}` ? "Copied!" : "Copy"}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl bg-black/40 p-6 font-mono text-sm text-white/80">
            {codeExamples[codeTab as keyof typeof codeExamples]}
          </pre>
        </div>
      </motion.section>

      {/* Type Definitions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Reference
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Type <span className="text-white/20">Definitions</span>
          </h2>
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider">TypeScript Definitions</h3>
            <button
              onClick={() => copyToClipboard(typeDefinitions, 'types')}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-bold text-white/60 transition-colors hover:bg-white/10"
            >
              {showCopied === 'types' ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
              {showCopied === 'types' ? "Copied!" : "Copy"}
            </button>
          </div>

          <pre className="overflow-x-auto rounded-xl bg-black/40 p-6 font-mono text-sm text-white/80">
            {typeDefinitions}
          </pre>
        </div>
      </motion.section>

      {/* Usage Patterns */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Best Practices
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Usage <span className="text-white/20">Patterns</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider">Recommended</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-emerald-400" />
                <span className="text-white/70">Always await async operations before continuing</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-emerald-400" />
                <span className="text-white/70">Use error handling for file/network operations</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-emerald-400" />
                <span className="text-white/70">Check permissions before destructive actions</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-emerald-400" />
                <span className="text-white/70">Add delays between rapid input operations</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <CircleX size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-wider">Avoid</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-red-400" />
                <span className="text-white/70">Rapid-fire keyboard input without delays</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-red-400" />
                <span className="text-white/70">Deleting files without confirmation</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-red-400" />
                <span className="text-white/70">Ignoring errors on system operations</span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={18} className="mt-1 text-red-400" />
                <span className="text-white/70">Running shutdown without user consent</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
}