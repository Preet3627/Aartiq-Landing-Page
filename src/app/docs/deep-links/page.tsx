"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Link as LinkIcon,
  Globe,
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Share2,
  Copy,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Plus,
  Minus,
  Settings,
  Zap,
  Terminal,
  Code,
  Box,
  Layers,
  Lock,
  Unlock,
  ExternalLink,
  FileCode,
  Hash,
  AtSign,
  Slash
} from "lucide-react";

const deepLinkFormats = [
  {
    protocol: "comet-ai",
    name: "Aartiq Protocol",
    icon: LinkIcon,
    color: "from-sky-500/20 to-cyan-500/20",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
    description: "Primary protocol for all Aartiq deep links",
    example: "aartiq://",
    usage: "Universal launcher for all Comet features"
  },
  {
    protocol: "https://aartiq.vercel.app",
    name: "Web URL",
    icon: Globe,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description: "Web-based links that work across platforms",
    example: "https://aartiq.vercel.app/",
    usage: "Shareable links for web and mobile"
  }
];

const deepLinkCategories = [
  {
    id: "navigation",
    name: "Navigation",
    icon: Globe,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    source: "main.js (open-url handler)",
    routes: [
      { path: "/", name: "Home", desc: "Main landing page" },
      { path: "/docs", name: "Documentation", desc: "Documentation hub" },
      { path: "/docs/ai-commands", name: "AI Commands", desc: "Available AI commands" },
      { path: "/docs/automation", name: "Automation", desc: "Task scheduling and automation" },
      { path: "/docs/plugins", name: "Plugins", desc: "Plugin marketplace" },
      { path: "/settings", name: "Settings", desc: "App settings" }
    ]
  },
  {
    id: "features",
    name: "Features",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    source: "main.js (open-url handler), preload.js",
    routes: [
      { path: "/chat", name: "AI Chat", desc: "Start AI conversation" },
      { path: "/automation", name: "Automation", desc: "View scheduled tasks" },
      { path: "/pdf-viewer", name: "PDF Viewer", desc: "View generated PDFs" },
      { path: "/desktop-control", name: "Desktop Control", desc: "Control desktop from mobile" },
      { path: "/sync", name: "WiFi Sync", desc: "Sync with desktop" }
    ]
  },
  {
    id: "actions",
    name: "Actions",
    icon: Terminal,
    color: "from-purple-500/20 to-fuchsia-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    source: "main.js (open-url handler)",
    routes: [
      { path: "/new-chat", name: "New Chat", desc: "Start new conversation" },
      { path: "/new-task", name: "New Task", desc: "Create automation task" },
      { path: "/import-plugin", name: "Import Plugin", desc: "Import custom plugin" },
      { path: "/export", name: "Export Data", desc: "Export app data" }
    ]
  },
  {
    id: "params",
    name: "Parameters",
    icon: Settings,
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    source: "preload.js, main.js",
    routes: [
      { path: "?tab=settings", name: "Settings Tab", desc: "Open specific settings tab" },
      { path: "?prompt=hello", name: "Pre-fill Prompt", desc: "Pre-fill AI prompt" },
      { path: "?theme=dark", name: "Theme Override", desc: "Force specific theme" },
      { path: "?lang=es", name: "Language", desc: "Set UI language" }
    ]
  }
];

const codeExamples = {
  basicLink: `# Basic navigation links
aartiq://chat
aartiq://automation
aartiq://settings

# Web URLs
https://aartiq.vercel.app/chat
https://aartiq.vercel.app/automation`,

  withParams: `# Links with parameters
aartiq://chat?prompt=Hello%20AI
aartiq://automation?task=backup
aartiq://pdf-viewer?file=report.pdf

# Web with query params
https://aartiq.vercel.app/chat?prompt=Hello&theme=dark
https://aartiq.vercel.app/docs?section=native-api`,

  customScheme: `// Register custom URL scheme (iOS Info.plist / Android intent-filter)
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>comet-ai</string>
    </array>
    <key>CFBundleURLName</key>
    <string>com.cometai.app</string>
  </dict>
</array>`,

  handlingLinks: `// Handle deep links in Electron (main.js)
app.on('open-url', (event, url) => {
  event.preventDefault();
  const parsed = new URL(url);
  const path = parsed.pathname.replace(/^\\//, '');
  const params = Object.fromEntries(parsed.searchParams);
  
  mainWindow.webContents.send('deep-link', { path, params });
});

// Handle in React
useEffect(() => {
  window.electron.on('deep-link', ({ path, params }) => {
    router.push(\`/\${path}\`, { query: params });
  });
}, []);`,

  mobileHandling: `// Flutter: Handle deep links (lib/main.dart)
@implementation
void initState() {
  super.initState();
  DeepLinkHandler.init();
}

// Deep link handler
class DeepLinkHandler {
  static void init() {
    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      navigateTo(message.data['route']);
    });
    
    // Check initial link
    getInitialUri().then((uri) {
      if (uri != null) {
        navigateTo(uri.path);
      }
    });
  }
  
  static void navigateTo(String path) {
    // Handle routing based on path
    switch (path) {
      case '/chat':
        navigator.pushNamed(context, '/chat');
        break;
      case '/automation':
        navigator.pushNamed(context, '/automation');
        break;
    }
  }
}`,

  sharingContent: `// Share content via deep link
const shareData = {
  type: 'link',
  title: 'Check out this PDF',
  url: 'aartiq://pdf-viewer?file=sales-report-2024.pdf',
  text: 'Generated by Aartiq'
};

// Web Share API
if (navigator.share) {
  await navigator.share(shareData);
} else {
  // Fallback: copy to clipboard
  await navigator.clipboard.writeText(shareData.url);
}`,

  universalLinks: `// Universal Links (iOS) / App Links (Android)
// apple-app-site-association
{
  "applinks": {
    "domains": ["aartiq.vercel.app"],
    "paths": ["/chat*", "/docs/*", "/automation*"]
  }
}

// Android: assetlinks.json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.cometai.app",
    "sha256_cert_fingerprints": ["..."]
  }
}]`
};

export default function DeepLinksPage() {
  const [activeCategory, setActiveCategory] = useState("navigation");
  const [codeTab, setCodeTab] = useState<"basic" | "params" | "scheme" | "handling" | "mobile" | "sharing" | "universal">("basic");
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  const activeRoute = deepLinkCategories.find(c => c.id === activeCategory);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <LinkIcon size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            URL Protocol Reference
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          URL Protocol <span className="text-white/20">Reference</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          URL scheme reference for comet-browser:// protocol handlers. Source: main.js (protocol handlers), preload.js
        </p>
      </motion.section>

      {/* Protocol Formats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            URL Schemes
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Protocol <span className="text-white/20">Formats</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {deepLinkFormats.map((format) => (
            <div key={format.protocol} className={`rounded-[2rem] border ${format.borderColor} bg-gradient-to-br ${format.color} p-8`}>
              <div className="mb-6 flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ${format.iconColor}`}>
                  <format.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider">{format.name}</h3>
                  <code className="text-sm text-white/60">{format.protocol}</code>
                </div>
              </div>
              <p className="mb-4 text-white/70">{format.description}</p>
              <div className="flex items-center gap-2">
                <code className="rounded bg-black/30 px-3 py-1.5 text-sm text-white">
                  {format.example}
                </code>
                <button
                  onClick={() => copyToClipboard(format.example, `format-${format.protocol}`)}
                  className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                >
                  {showCopied === `format-${format.protocol}` ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Available Routes */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Available Endpoints
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Route <span className="text-white/20">Reference</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {deepLinkCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                activeCategory === category.id
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <category.icon size={16} />
              {category.name}
            </button>
          ))}
        </div>

        {activeRoute && (
          <div className={`rounded-[2rem] border ${activeRoute.borderColor} bg-gradient-to-br ${activeRoute.color} p-10`}>
            <div className="mb-8 flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ${activeRoute.iconColor}`}>
                  <activeRoute.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-wider">{activeRoute.name}</h3>
                  <p className="text-white/60">{activeRoute.routes.length} available routes</p>
                </div>
              </div>
              {activeRoute.source && (
                <code className="rounded bg-white/5 px-3 py-1.5 text-xs font-mono text-white/40">
                  Source: {activeRoute.source}
                </code>
              )}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {activeRoute.routes.map((route) => (
                <div key={route.path} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-5">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <code className="font-mono text-sm text-white">{route.path}</code>
                      <button
                        onClick={() => copyToClipboard(`aartiq://${route.path.replace('/', '')}`, `route-${route.path}`)}
                        className="rounded bg-white/10 p-1 transition hover:bg-white/20"
                      >
                        {showCopied === `route-${route.path}` ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <h4 className="font-bold text-white">{route.name}</h4>
                    <p className="text-sm text-white/50">{route.desc}</p>
                  </div>
                  <ExternalLink size={18} className="text-white/30" />
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
        transition={{ delay: 0.3 }}
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
          {[
            { id: "basic", label: "Basic Links" },
            { id: "params", label: "With Params" },
            { id: "scheme", label: "Register Scheme" },
            { id: "handling", label: "Handle in Electron" },
            { id: "mobile", label: "Mobile (Flutter)" },
            { id: "sharing", label: "Share Content" },
            { id: "universal", label: "Universal Links" }
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
              {codeTab === "basic" && "Basic Deep Links"}
              {codeTab === "params" && "Links with Parameters"}
              {codeTab === "scheme" && "Custom URL Scheme Registration"}
              {codeTab === "handling" && "Handling in Electron"}
              {codeTab === "mobile" && "Mobile Deep Link Handling"}
              {codeTab === "sharing" && "Share Content via Deep Links"}
              {codeTab === "universal" && "Universal/App Links"}
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

      {/* Platform Support */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Cross-Platform
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Platform <span className="text-white/20">Support</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { 
              platform: "macOS", 
              icon: Monitor,
              color: "from-sky-500/20 to-blue-500/20",
              borderColor: "border-sky-500/30",
              features: ["Custom URL Scheme", "Universal Links", "NSUserActivity"]
            },
            { 
              platform: "Windows", 
              icon: Monitor,
              color: "from-emerald-500/20 to-teal-500/20",
              borderColor: "border-emerald-500/30",
              features: ["Custom Protocol Handler", "App Links", "Jump List"]
            },
            { 
              platform: "Mobile (Flutter)", 
              icon: Smartphone,
              color: "from-purple-500/20 to-fuchsia-500/20",
              borderColor: "border-purple-500/30",
              features: ["App Links (Android)", "Universal Links (iOS)", "Firebase Dynamic Links"]
            }
          ].map((platform) => (
            <div key={platform.platform} className={`rounded-2xl border ${platform.borderColor} bg-gradient-to-br ${platform.color} p-8`}>
              <platform.icon size={32} className="mb-4 text-white/60" />
              <h3 className="mb-4 font-bold text-white">{platform.platform}</h3>
              <ul className="space-y-2">
                {platform.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
