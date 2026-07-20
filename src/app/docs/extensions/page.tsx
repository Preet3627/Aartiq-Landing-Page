"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Puzzle,
  Plus,
  Download,
  Upload,
  Trash2,
  Search,
  Filter,
  Star,
  Timer,
  CloudDownload,
  Shield,
  CheckCircle2,
  CircleX,
  AlertTriangle,
  ExternalLink,
  Code,
  FileCode,
  Box,
  Layers,
  Zap,
  Settings,
  ArrowRight,
  ChevronRight,
  GitBranch,
  Hash,
  Lock,
  Unlock,
  Eye,
  Edit3,
  MoreVertical,
  Copy,
  CheckCheck,
  X,
  Palette,
  Paintbrush,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Eye as EyeIcon,
  Sparkles,
  ShieldCheck,
  Zap as ZapIcon,
  Globe,
  Mail,
  FileText,
  Image,
  Video,
  Music,
  BookOpen,
  ShoppingCart,
  Briefcase,
  Code2,
  Terminal,
  Database,
  Cloud,
  Server,
  HardDrive,
  Wifi,
  Bluetooth,
  Cpu,
  Fingerprint,
  Key,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  RefreshCw,
  Trash,
  Settings2,
  Layout,
  Grid3X3,
  List,
  Bookmark,
  BookmarkCheck,
  Tag,
  Tags,
  Package,
  Box as BoxIcon,
  Archive,
  Folder,
  FolderOpen,
  File,
  FilePlus,
  FileMinus,
  FolderPlus,
  FolderMinus,
  Copy as CopyIcon,
  Clipboard,
  Scissors,
  ClipboardPaste,
  Undo,
  Redo,
  Search as SearchIcon,
  ZoomIn,
  ZoomOut,
  Move,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  type Icon,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  PlusCircle,
  MinusCircle,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Send,
  Mail as MailIcon,
  Inbox,
  User,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Heart,
  HeartPulse,
  Star as StarIcon,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Share,
  Link2,
  Link2Off,
  ExternalLink as ExternalLinkIcon,
  Home,
  Building,
  MapPin,
  Navigation,
  Compass,
  Map,
  Calendar,
  Clock,
  Bell,
  BellOff,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Video as VideoIcon,
  VideoOff,
  Phone,
  PhoneCall,
  PhoneOff,
  MessageSquare as MessageSquareIcon,
  Send as SendIcon,
  Paperclip,
  Link as LinkIcon,
  Image as ImageIcon,
  Smile,
  Frown,
  Meh,
  Angry,
  Flashlight,
  Lightbulb,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  Wind,
  Thermometer,
  Droplet,
  Umbrella,
  Snowflake,
  Flame,
  Leaf,
  TreePine,
  Flower2,
  Flower,
  Coffee,
  Beer,
  Wine,
  Sandwich,
  Cake,
  Cookie,
  Egg,
  Milk,
  Salad,
  Soup,
  UtensilsCrossed,
  Utensils
} from "lucide-react";

// Theme definitions
const themes = [
  {
    id: "graphite",
    name: "Graphite",
    description: "Classic dark theme with subtle gray accents",
    preview: "from-gray-900 to-gray-800",
    accent: "#6B7280",
    icon: Monitor,
    category: "dark"
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Deep blue-black theme with cyan accents",
    preview: "from-slate-900 to-slate-950",
    accent: "#06B6D4",
    icon: Moon,
    category: "dark"
  },
  {
    id: "emerald-dark",
    name: "Emerald Dark",
    description: "Dark theme with emerald green accents",
    preview: "from-emerald-950 to-black",
    accent: "#10B981",
    icon: Leaf,
    category: "dark"
  },
  {
    id: "crimson-night",
    name: "Crimson Night",
    description: "Dark theme with deep red accents",
    preview: "from-red-950 to-black",
    accent: "#DC2626",
    icon: Flame,
    category: "dark"
  },
  {
    id: "arctic",
    name: "Arctic",
    description: "Light theme with cool blue accents",
    preview: "from-slate-50 to-blue-50",
    accent: "#3B82F6",
    icon: Sun,
    category: "light"
  },
  {
    id: "coral-light",
    name: "Coral Light",
    description: "Warm light theme with coral accents",
    preview: "from-orange-50 to-rose-50",
    accent: "#F97316",
    icon: Sun,
    category: "light"
  },
  {
    id: "liquid-glass",
    name: "Liquid Glass",
    description: "Translucent glass morphism with vibrant accents",
    preview: "from-purple-500/20 to-pink-500/20",
    accent: "#A855F7",
    icon: Droplet,
    category: "special",
    features: ["Glassmorphism", "Blur effects", "Dynamic gradients"]
  },
  {
    id: "hacker-green",
    name: "Hacker Green",
    description: "Classic terminal green on black",
    preview: "from-black to-green-950",
    accent: "#22C55E",
    icon: Terminal,
    category: "special",
    features: ["Matrix vibes", "CRT effects", "Neon glow"]
  }
];

// Pre-built extensions
const preBuiltExtensions = [
  {
    id: "ad-blocker-pro",
    name: "Ad Blocker Pro",
    description: "Blocks ads, trackers, and malicious scripts",
    icon: Shield,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
    category: "privacy",
    rating: 4.9,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "2.1.0",
    features: ["Ad blocking", "Tracker prevention", "Malware protection", "Whitelist support"],
    isInstalled: true
  },
  {
    id: "enhancer-pack",
    name: "Enhancer Pack",
    description: "Custom page styles, keyboard shortcuts, and productivity tools",
    icon: Sparkles,
    color: "from-purple-500/20 to-fuchsia-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    category: "productivity",
    rating: 4.8,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "1.5.0",
    features: ["Custom styles", "Keyboard shortcuts", "Page enhancement", "Dark mode toggle"],
    isInstalled: false
  },
  {
    id: "password-vault",
    name: "Password Vault",
    description: "Local password manager with encryption and auto-fill",
    icon: Lock,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    category: "security",
    rating: 4.9,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "3.0.0",
    features: ["AES-256 encryption", "Auto-fill", "Password generator", "Breach monitoring"],
    isInstalled: true
  },
  {
    id: "tab-master",
    name: "Tab Master",
    description: "Tab management with groups, snapshots, and automation",
    icon: Layout,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    category: "productivity",
    rating: 4.7,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "2.2.0",
    features: ["Tab groups", "Tab snapshots", "Auto-suspend", "Tab search"],
    isInstalled: false
  },
  {
    id: "screenshot-pro",
    name: "Screenshot Pro",
    description: "Capture full page, selected regions, and annotated screenshots",
    icon: Camera,
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    category: "productivity",
    rating: 4.8,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "1.8.0",
    features: ["Full page capture", "Region selection", "Annotations", "Cloud upload"],
    isInstalled: true
  },
  {
    id: "video-downloader",
    name: "Video Downloader",
    description: "Download videos from YouTube, Vimeo, Twitter, and supported sites",
    icon: Video,
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    category: "media",
    rating: 4.6,
    downloads: 0,
    verified: true,
    author: "Community",
    version: "4.1.0",
    features: ["Multi-platform", "Quality selection", "Audio extraction", "Playlist support"],
    isInstalled: false
  },
  {
    id: "note-clipper",
    name: "Note Clipper",
    description: "Save web pages, articles, and highlights to your notes",
    icon: BookOpen,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    iconColor: "text-teal-400",
    category: "productivity",
    rating: 4.7,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "1.3.0",
    features: ["Page saving", "Highlight text", "Notes tagging", "Export options"],
    isInstalled: false
  },
  {
    id: "translator-plus",
    name: "Translator Plus",
    description: "Page translation with 100+ language support",
    icon: Globe,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    category: "productivity",
    rating: 4.5,
    downloads: 0,
    verified: true,
    author: "Community",
    version: "2.0.0",
    features: ["Auto-detect", "100+ languages", "Offline mode", "Pronunciation"],
    isInstalled: false
  },
  {
    id: "dev-tools-pro",
    name: "Dev Tools Pro",
    description: "Developer tools with API testing, JSON formatting, and more",
    icon: Code2,
    color: "from-cyan-500/20 to-sky-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    category: "developer",
    rating: 4.9,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "2.5.0",
    features: ["API tester", "JSON formatter", "Color picker", "Regex tester"],
    isInstalled: true
  },
  {
    id: "privacy-guard",
    name: "Privacy Guard",
    description: "Block fingerprinting, manage cookies, protect privacy",
    icon: Eye,
    color: "from-gray-500/20 to-slate-500/20",
    borderColor: "border-gray-500/30",
    iconColor: "text-gray-400",
    category: "privacy",
    rating: 4.8,
    downloads: 0,
    verified: true,
    author: "Aartiq",
    version: "1.7.0",
    features: ["Fingerprint blocking", "Cookie manager", "History cleaner", "Incognito mode"],
    isInstalled: false
  },
  {
    id: "email-checker",
    name: "Email Checker",
    description: "Verify email addresses and detect disposable/temporary emails",
    icon: Mail,
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-400",
    category: "productivity",
    rating: 4.4,
    downloads: 0,
    verified: false,
    author: "Community",
    version: "1.1.0",
    features: ["Email verification", "Disposable detection", "Format validation", "MX check"],
    isInstalled: false
  },
  {
    id: "shopping-companion",
    name: "Shopping Companion",
    description: "Price comparison, coupons, and price drop alerts",
    icon: ShoppingCart,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
    category: "shopping",
    rating: 4.6,
    downloads: 0,
    verified: true,
    author: "Community",
    version: "3.2.0",
    features: ["Price comparison", "Coupon finder", "Price history", "Wishlist alerts"],
    isInstalled: false
  }
];

const extensionCategories = [
  { id: "all", name: "All Extensions", icon: Box, count: preBuiltExtensions.length },
  { id: "productivity", name: "Productivity", icon: Zap, count: preBuiltExtensions.filter(e => e.category === "productivity").length },
  { id: "privacy", name: "Privacy & Security", icon: Shield, count: preBuiltExtensions.filter(e => e.category === "privacy").length },
  { id: "developer", name: "Developer", icon: Code2, count: preBuiltExtensions.filter(e => e.category === "developer").length },
  { id: "media", name: "Media", icon: Video, count: preBuiltExtensions.filter(e => e.category === "media").length },
  { id: "shopping", name: "Shopping", icon: ShoppingCart, count: preBuiltExtensions.filter(e => e.category === "shopping").length }
];

const ipcAPI = `// Get all loaded extensions
const extensions = await window.electron.getExtensions();
// Returns: [{ id, name, version, description, path }, ...]

// Toggle an extension on/off
const result = await window.electron.toggleExtension('my-extension-id');
// Returns: { success: true, enabled: false }  (disabled)
// Returns: { success: true, enabled: true }   (re-enabled)
// Returns: { success: false, error: 'Extension not found' }

// Uninstall (remove from session + delete folder)
await window.electron.uninstallExtension('my-extension-id');

// Get extension storage path
const extPath = await window.electron.getExtensionPath();
// macOS: ~/Library/Application Support/Aartiq/extensions/

// Open extensions folder in Finder
window.electron.openExtensionDir();

// Preload API (see preload.js):
//   getExtensions()    -> ipcRenderer.invoke('get-extensions')
//   toggleExtension()  -> ipcRenderer.invoke('toggle-extension', id)
//   uninstallExtension()-> ipcRenderer.invoke('uninstall-extension', id)
//   getExtensionPath() -> ipcRenderer.invoke('get-extension-path')
//   openExtensionDir() -> ipcRenderer.send('open-extension-dir')`;

const codeExamples = {
  extensionManifest: `// extension-manifest.json
{
  "manifest_version": 3,
  "name": "My Awesome Extension",
  "version": "1.0.0",
  "description": "Does awesome things in Aartiq",
  "author": "Your Name",
  "permissions": [
    "storage",
    "tabs",
    "activeTab",
    "contextMenus"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"],
    "css": ["styles.css"]
  }],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "icons": {
    "16": "icons/16.png",
    "48": "icons/48.png",
    "128": "icons/128.png"
  }
}`,

  contentScript: `// content.js - Runs on web pages
class ContentScript {
  constructor() {
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    // Inject custom styles
    this.injectStyles();
    
    // Set up message listeners
    this.setupListeners();
    
    this.initialized = true;
    console.log('[Extension] Content script initialized');
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = \`
      .comet-extension-highlight {
        background: rgba(59, 130, 246, 0.3);
        border: 2px solid #3B82F6;
        border-radius: 4px;
        cursor: pointer;
      }
    \`;
    document.head.appendChild(style);
  }

  setupListeners() {
    // Listen for messages from background script
    browser.runtime.onMessage.addListener((msg, sender, response) => {
      switch (msg.type) {
        case 'HIGHLIGHT_ELEMENTS':
          this.highlightElements(msg.selector);
          break;
        case 'GET_PAGE_INFO':
          response(this.getPageInfo());
          break;
      }
    });
  }

  highlightElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.classList.add('comet-extension-highlight'));
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      elements.forEach(el => el.classList.remove('comet-extension-highlight'));
    }, 3000);
  }

  getPageInfo() {
    return {
      title: document.title,
      url: window.location.href,
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
        text: h.textContent,
        level: h.tagName.toLowerCase()
      })),
      links: Array.from(document.querySelectorAll('a[href]')).map(a => a.href),
      images: Array.from(document.querySelectorAll('img')).length
    };
  }
}

// Initialize
new ContentScript().init();`,

  backgroundScript: `// background.js - Service worker
class BackgroundScript {
  constructor() {
    this.storage = browser.storage.local;
    this.setupContextMenu();
  }

  async setupContextMenu() {
    // Create context menu items
    await browser.contextMenus.create({
      id: 'highlight-links',
      title: 'Highlight All Links',
      contexts: ['page']
    });

    await browser.contextMenus.create({
      id: 'show-page-info',
      title: 'Show Page Info',
      contexts: ['page']
    });

    await browser.contextMenus.create({
      id: 'save-to-notes',
      title: 'Save to Notes',
      contexts: ['selection']
    });

    // Handle clicks
    browser.contextMenus.onClicked.addListener((info, tab) => {
      switch (info.menuItemId) {
        case 'highlight-links':
          browser.tabs.sendMessage(tab.id, {
            type: 'HIGHLIGHT_ELEMENTS',
            selector: 'a'
          });
          break;
        case 'show-page-info':
          this.showPageInfo(tab.id);
          break;
        case 'save-to-notes':
          this.saveSelection(info, tab);
          break;
      }
    });
  }

  async showPageInfo(tabId) {
    const response = await browser.tabs.sendMessage(tabId, {
      type: 'GET_PAGE_INFO'
    });
    
    // Show notification with page info
    browser.notifications.create({
      type: 'basic',
      iconUrl: 'icons/48.png',
      title: 'Page Info',
      message: \`Title: \${response.title}\\nLinks: \${response.links.length}\\nImages: \${response.images}\`
    });
  }

  async saveSelection(info, tab) {
    const data = {
      text: info.selectionText,
      url: tab.url,
      timestamp: Date.now()
    };

    const result = await this.storage.get('notes');
    const notes = result.notes || [];
    notes.push(data);
    
    await this.storage.set({ notes });
    console.log('[Extension] Saved note:', data);
  }
}

// Initialize
new BackgroundScript();`,

  popupHTML: `<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { width: 300px; padding: 16px; }
    .header { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
    .header h1 { font-size: 16px; font-weight: bold; }
    .status { padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; }
    .status.active { background: #22C55E20; color: #22C55E; }
    .status.inactive { background: #EF444420; color: #EF4444; }
    .btn { width: 100%; padding: 8px; border: none; border-radius: 6px; cursor: pointer; }
    .btn-primary { background: #3B82F6; color: white; }
    .btn-secondary { background: #374151; color: white; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <span style="font-size: 24px;">🚀</span>
    <h1>My Extension</h1>
  </div>

  <div id="status" class="status active">
    Extension Active
  </div>

  <button id="toggleBtn" class="btn btn-primary">
    Toggle Feature
  </button>

  <button id="settingsBtn" class="btn btn-secondary">
    Open Settings
  </button>

  <script src="popup.js"></script>
</body>
</html>`,

  popupJS: `// popup.js
document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');
  const settingsBtn = document.getElementById('settingsBtn');

  // Load current state
  const result = await browser.storage.local.get('enabled');
  const enabled = result.enabled ?? true;
  updateStatus(enabled);

  // Toggle feature
  toggleBtn.addEventListener('click', async () => {
    const newState = !(await browser.storage.local.get('enabled')).enabled ?? false;
    await browser.storage.local.set({ enabled: newState });
    updateStatus(newState);
    
    // Notify content script
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    browser.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE', enabled: newState });
  });

  // Open settings
  settingsBtn.addEventListener('click', () => {
    browser.runtime.openOptionsPage();
  });

  function updateStatus(enabled) {
    statusEl.className = \`status \${enabled ? 'active' : 'inactive'}\`;
    statusEl.textContent = enabled ? 'Extension Active' : 'Extension Disabled';
    toggleBtn.textContent = enabled ? 'Disable Feature' : 'Enable Feature';
  }
});`,

  devtools: `// devtools.js - Developer tools integration
// This script runs in the context of DevTools

// Create custom panel
browser.devtools.panels.create(
  "Aartiq Inspector",
  "icons/panel.png",
  "panel.html"
).then(panel => {
  console.log('[DevTools] Custom panel created');
});

// Listen for network requests
browser.webRequest.onCompleted.addListener(
  (details) => {
    // Log API calls
    console.log('[Network]', details.url, details.status);
    
    // Send to custom panel
    browser.runtime.sendMessage({
      type: 'NETWORK_LOG',
      data: details
    });
  },
  { urls: ["<all_urls>"] }
);

// Panel communication
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_INSPECTED_TAB') {
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      sendResponse({ tabId: tabs[0].id });
    });
    return true; // Keep message channel open for async response
  }
});`,

  ipcAPI: ipcAPI
};

export default function ExtensionsPage() {
  const [activeTab, setActiveTab] = useState<"themes" | "extensions">("extensions");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [codeTab, setCodeTab] = useState<"manifest" | "content" | "background" | "popup" | "devtools" | "ipcAPI">("manifest");
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const filteredExtensions = preBuiltExtensions.filter(ext => {
    const matchesCategory = activeCategory === "all" || ext.category === activeCategory;
    const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ext.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-5 py-2">
          <Package size={14} className="text-violet-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-400">
            Extensions & Themes
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Extensions <span className="text-white/20">& Themes</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Build and install Chrome-compatible extensions for Aartiq. Extensions are loaded via Electron's <code>session.defaultSession.loadExtension()</code>. Drop your extension folder into the extensions directory and restart, or toggle them at runtime via IPC. See <code>main.js</code> (~line 6000) and <code>src/main/handlers/system-handlers.js</code>.
        </p>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-5">
          {[
            { icon: Package, label: "API", value: "Chrome MV3", color: "text-violet-400", border: "border-violet-500/20" },
            { icon: Palette, label: "Themes", value: "8", color: "text-pink-400", border: "border-pink-500/20" },
            { icon: CloudDownload, label: "Toggle", value: "IPC Runtime", color: "text-emerald-400", border: "border-emerald-500/20" },
            { icon: Code2, label: "Loading", value: "session.loadExtension", color: "text-sky-400", border: "border-sky-500/20" },
            { icon: Shield, label: "Electron", value: "Built-in", color: "text-amber-400", border: "border-amber-500/20" }
          ].map((stat) => (
            <div key={stat.label} className={`rounded-2xl border ${stat.border} bg-white/5 p-6 text-center`}>
              <stat.icon size={32} className={`mx-auto mb-4 ${stat.color}`} />
              <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Source Files */}
        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Source Files</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Extension Toggle (main.js)", path: "main.js (~line 6000)" },
              { label: "System IPC Handlers", path: "src/main/handlers/system-handlers.js" },
              { label: "Preload Bridge", path: "preload.js (~line 241)" },
              { label: "TypeScript Types", path: "src/types/electron.d.ts (~line 270)" },
            ].map((ref) => (
              <div key={ref.label} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-3">
                <FileCode size={14} className="shrink-0 text-violet-400" />
                <div>
                  <p className="text-xs font-bold text-white">{ref.label}</p>
                  <p className="font-mono text-[10px] text-white/40">{ref.path}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Tab Switcher */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab("extensions")}
            className={`flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === "extensions"
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Package size={18} />
            Available Extensions
          </button>
          <button
            onClick={() => setActiveTab("themes")}
            className={`flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wider transition-all ${
              activeTab === "themes"
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Palette size={18} />
            Themes
          </button>
        </div>

        {/* Extensions Tab */}
        {activeTab === "extensions" && (
          <>
            {/* Search and Filter */}
            <div className="mb-8 flex flex-wrap gap-4">
              <div className="relative flex-1 min-w-[300px]">
                <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search extensions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 pl-12 text-sm text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {extensionCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      activeCategory === category.id
                        ? "bg-white text-black"
                        : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    <category.icon size={14} />
                    {category.name}
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extensions Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {filteredExtensions.map((ext) => (
                <motion.div
                  key={ext.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group rounded-2xl border ${ext.borderColor} bg-gradient-to-br ${ext.color} p-8 transition hover:scale-[1.02] cursor-pointer`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ${ext.iconColor}`}>
                        <ext.icon size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{ext.name}</h3>
                          {ext.verified && <CheckCircle2 size={14} className="text-sky-400" />}
                        </div>
                        <p className="text-sm text-white/50">by {ext.author}</p>
                      </div>
                    </div>
                    {ext.isInstalled ? (
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                        Installed
                      </span>
                    ) : (
                      <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80 hover:bg-white/20 transition">
                        Install
                      </button>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-white/60">{ext.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {ext.features.slice(0, 4).map((feature) => (
                      <span key={feature} className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-white/60">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-4 text-sm text-white/40">
                      <span className="flex items-center gap-1">
                        <StarIcon size={14} className="text-amber-400" />
                        {ext.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <CloudDownload size={14} />
                        {ext.downloads > 999 ? `${(ext.downloads / 1000).toFixed(1)}K` : ext.downloads}
                      </span>
                    </div>
                    <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-400">
                      v{ext.version}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Themes Tab */}
        {activeTab === "themes" && (
          <div className="grid gap-6 lg:grid-cols-4">
            {themes.map((theme) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition hover:border-white/20"
              >
                <div className={`h-32 bg-gradient-to-br ${theme.preview} flex items-center justify-center`}>
                  <theme.icon size={48} style={{ color: theme.accent }} className="opacity-50" />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-bold text-white">{theme.name}</h3>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/40 uppercase">
                      {theme.category}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-white/50">{theme.description}</p>
                  {theme.features && (
                    <div className="mb-4 flex flex-wrap gap-1">
                      {theme.features.map((feature) => (
                        <span key={feature} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                    <span className="text-xs text-white/40">{theme.accent}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Extension API */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Extension API
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Developing <span className="text-white/20">Extensions</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {[
            { id: "manifest", label: "manifest.json" },
            { id: "content", label: "Content Script" },
            { id: "background", label: "Background Script" },
            { id: "popup", label: "Popup UI" },
            { id: "devtools", label: "DevTools" },
            { id: "ipcAPI", label: "IPC API" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCodeTab(tab.id as any)}
              className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                codeTab === tab.id
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider">
              {codeTab === "manifest" && "manifest.json"}
              {codeTab === "content" && "Content Script (content.js)"}
              {codeTab === "background" && "Background Script (background.js)"}
              {codeTab === "popup" && "Popup UI (popup.html/js)"}
              {codeTab === "devtools" && "DevTools Integration"}
              {codeTab === "ipcAPI" && "IPC API Reference (toggle-extension)"}
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

      {/* Security */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Trust & Safety
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Security <span className="text-white/20">Verification</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <LockIcon size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Code Signing</h3>
            <p className="text-sm text-white/60">
              All verified extensions are code-signed by their developers. Signatures are validated before installation.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <ShieldCheck size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Permission Review</h3>
            <p className="text-sm text-white/60">
              Extensions declare required permissions upfront. Users can review and approve permissions before installation.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400">
              <EyeIcon size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Sandboxed Execution</h3>
            <p className="text-sm text-white/60">
              Extensions run in isolated contexts with no direct file system or network access. All operations are proxied.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}