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
  X
} from "lucide-react";

const pluginCategories = [
  { id: "all", name: "All Plugins", icon: Box, count: 2 },
  { id: "command", name: "Command", icon: Code, count: 2 },
];

const featuredPlugins = [
  {
    id: "sample-weather-plugin",
    name: "Weather Plugin",
    description: "Get weather information for any location using the wttr.in API with simulated fallback.",
    author: "Aartiq",
    version: "1.0.0",
    icon: "🌤️",
    category: "command",
    rating: 5.0,
    downloads: 0,
    verified: true,
    features: ["Real wttr.in API", "Simulated fallback", "Temperature, humidity, wind", "Cross-platform"]
  },
  {
    id: "aartiq-page-analyzer",
    name: "Page Analyzer",
    description: "Analyze web page structure, SEO, accessibility, and readability with real HTTP requests.",
    author: "Aartiq",
    version: "1.0.0",
    icon: "📊",
    category: "command",
    rating: 5.0,
    downloads: 0,
    verified: true,
    features: ["SEO analysis", "Link checker", "Readability score", "Real HTTP fetching"]
  },
];

const codeExamples = {
  pluginStructure: `my-plugin/
├── manifest.json        # Plugin metadata (required)
├── index.js             # Entry point (default: index.js)
└── ...                  # Any other files your plugin needs`,

  manifest: `{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Does something useful",
  "author": "Your Name",
  "type": "command",
  "main": "index.js",
  "permissions": ["network"],
  "commands": [
    {
      "id": "my-command",
      "name": "My Command",
      "description": "Does something useful",
      "params": [
        { "name": "input", "type": "string", "required": true, "description": "Input text" }
      ]
    }
  ]
}`,

  entryPoint: `const { Plugin } = require('../../src/lib/plugin-sdk');

class MyPlugin extends Plugin {
  constructor() {
    super({
      id: 'my-plugin',
      name: 'My Plugin',
      version: '1.0.0',
      description: 'Does something useful',
      type: 'command',
      permissions: ['network'],
    });
  }

  async onLoad() {
    this.context.log('My Plugin loaded');

    this.registerCommand({
      id: 'my-command',
      name: 'My Command',
      description: 'Does something useful',
      params: [
        { name: 'input', type: 'string', required: true, description: 'Input text' }
      ],
      handler: async (params) => {
        const { input } = params;
        this.context.log(\`Processing: \${input}\`);
        return {
          success: true,
          output: \`Processed: \${input}\`
        };
      },
    });
  }
}

module.exports = new MyPlugin();`,

  pluginAPI: `// ======= Plugin Base Class =======
class Plugin {
  // Lifecycle hooks (override these)
  async onLoad() {}         // Plugin loaded into manager
  async onUnload() {}       // Plugin unloaded from manager
  async onEnable() {}       // Plugin enabled by user
  async onDisable() {}      // Plugin disabled by user
  async onConfigChange(config) {}  // Config updated

  // Command registration
  registerCommand(spec)     // spec: {id, name, description, params, handler}
  getCommands()             // Returns {cmdId: handlerFn, ...}

  // Hook registration
  registerHook(event, handler)  // event: string, handler: fn(data)
  getHooks()                    // Returns {event: [handlers], ...}
}

// ======= PluginContext =======
class PluginContext {
  log(message, level)       // level: 'info' | 'warn' | 'error'
  fetch(url, options)       // HTTP GET (auto JSON parse)
  store(key, value)         // Persist config (value=undefined to read)
  executeCommand(cmdId, params)  // Run another plugin's command
  emitHook(event, data)     // Fire a hook event
  readFile(filePath)        // Read a file from disk
  writeFile(filePath, content)   // Write a file to disk
}`,

  hooks: `// Register hooks in onLoad():
this.registerHook('browser:navigate', async (data) => {
  this.context.log(\`Navigated to: \${data.url}\`);
});

// Hooks are managed by PluginManager and emitted
// via pluginManager.emitHook(event, data).
// Multiple plugins can listen to the same event.`,

  installPlugin: `// Install a plugin from a directory
await window.electron.invoke('plugins:install', 'file', {
  filePath: '/path/to/my-plugin'
});

// List installed plugins
const plugins = await window.electron.invoke('plugins:list');

// Get a specific plugin
const plugin = await window.electron.invoke('plugins:get', 'my-plugin');

// Enable/disable
await window.electron.invoke('plugins:enable', 'my-plugin');
await window.electron.invoke('plugins:disable', 'my-plugin');

// Update config
await window.electron.invoke('plugins:update-config', 'my-plugin', {
  apiKey: 'sk-...'
});

// Execute a command
await window.electron.invoke('plugins:execute-command',
  'my-plugin:my-command', { input: 'hello' });

// Uninstall
await window.electron.invoke('plugins:uninstall', 'my-plugin');

// Get plugins directory path
const dir = await window.electron.invoke('plugins:get-dir');
// macOS: ~/Library/Application Support/Aartiq/plugins/`
};

const pluginTypes = [
  { type: "AI Model", desc: "Add new AI model providers", icon: Zap, color: "text-sky-400" },
  { type: "Command", desc: "Custom AI commands and actions", icon: Code, color: "text-emerald-400" },
  { type: "Integration", desc: "Connect external services", icon: Layers, color: "text-purple-400" },
  { type: "Theme", desc: "Custom UI themes and styles", icon: Box, color: "text-amber-400" },
  { type: "Automation", desc: "Pre-built automation templates", icon: Settings, color: "text-rose-400" }
];

export default function PluginsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlugin, setSelectedPlugin] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState<"structure" | "manifest" | "entry" | "commands" | "settings" | "api" | "hooks" | "verify" | "install">("structure");
  const [showCopied, setShowCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(id);
    setTimeout(() => setShowCopied(null), 2000);
  };

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-5 py-2">
          <Puzzle size={14} className="text-purple-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-400">
            Plugin System
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Plugins
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Extend Aartiq with custom plugins using the built-in Plugin SDK. Plugins are Node.js modules loaded by PluginManager at startup from <code>~/Library/Application Support/Aartiq/plugins/</code>. See <code>src/lib/plugin-sdk.js</code>, <code>src/lib/plugin-manager.js</code>, and <code>src/main/handlers/plugin-handlers.js</code>.
        </p>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          {[
            { icon: Puzzle, label: "Sample Plugins", value: "2", color: "text-purple-400", border: "border-purple-500/20" },
            { icon: Code, label: "SDK", value: "Plugin + PluginContext", color: "text-emerald-400", border: "border-emerald-500/20" },
            { icon: Shield, label: "Lifecycle Hooks", value: "5", color: "text-sky-400", border: "border-sky-500/20" },
            { icon: Box, label: "Storage", value: "electron-store", color: "text-amber-400", border: "border-amber-500/20" }
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Plugin SDK", path: "src/lib/plugin-sdk.js" },
                { label: "Plugin Manager", path: "src/lib/plugin-manager.js" },
                { label: "Plugin IPC Handlers", path: "src/main/handlers/plugin-handlers.js" },
                { label: "Weather Plugin", path: "plugins/sample-weather-plugin/index.js" },
                { label: "Page Analyzer", path: "plugins/aartiq-page-analyzer/index.js" }
              ].map((ref) => (
              <div key={ref.label} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-3">
                <FileCode size={14} className="shrink-0 text-purple-400" />
                <div>
                  <p className="text-xs font-bold text-white">{ref.label}</p>
                  <p className="font-mono text-[10px] text-white/40">{ref.path}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Quick Start
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            SDK <span className="text-white/20">Reference</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="group rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 transition hover:border-emerald-500/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Plus size={28} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Create New Plugin</h3>
            <p className="mb-6 text-sm text-white/60">Start building your own plugin with our SDK and templates.</p>
            <button className="flex items-center gap-2 text-sm font-bold text-emerald-400 transition group-hover:gap-3">
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          <div className="group rounded-2xl border border-sky-500/30 bg-sky-500/5 p-8 transition hover:border-sky-500/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <Download size={28} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Browse Marketplace</h3>
            <p className="mb-6 text-sm text-white/60">Discover and install plugins from the community.</p>
            <button className="flex items-center gap-2 text-sm font-bold text-sky-400 transition group-hover:gap-3">
              Explore <ArrowRight size={16} />
            </button>
          </div>

          <div className="group rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8 transition hover:border-purple-500/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Upload size={28} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Submit Plugin</h3>
            <p className="mb-6 text-sm text-white/60">Share your plugin with the Aartiq community.</p>
            <button className="flex items-center gap-2 text-sm font-bold text-purple-400 transition group-hover:gap-3">
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Plugin Types */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Plugin Types
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Plugin <span className="text-white/20">Types</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {pluginTypes.map((type) => (
            <div key={type.type} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <type.icon size={32} className={`mx-auto mb-4 ${type.color}`} />
              <h3 className="mb-2 font-bold text-white">{type.type}</h3>
              <p className="text-xs text-white/50">{type.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Featured Plugins */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Featured Plugins
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Featured <span className="text-white/20">Plugins</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search plugins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 pl-12 text-sm text-white placeholder:text-white/30 focus:border-purple-500/50 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {pluginCategories.map((category) => (
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

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPlugins.map((plugin) => (
            <div
              key={plugin.id}
              className="group cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-purple-500/30 hover:bg-purple-500/5"
              onClick={() => setSelectedPlugin(plugin.id === selectedPlugin ? null : plugin.id)}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{plugin.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{plugin.name}</h3>
                      {plugin.verified && <CheckCircle2 size={14} className="text-sky-400" />}
                    </div>
                    <p className="text-sm text-white/50">by {plugin.author}</p>
                  </div>
                </div>
                <button className="rounded-lg bg-white/5 p-2 opacity-0 transition group-hover:opacity-100">
                  <CloudDownload size={18} className="text-white/60" />
                </button>
              </div>

              <p className="mb-4 text-sm text-white/60">{plugin.description}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {plugin.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-white/60">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400" />
                    {plugin.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <CloudDownload size={14} />
                    {plugin.downloads.toLocaleString('en-US')}
                  </span>
                </div>
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
                  v{plugin.version}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SDK Reference */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Documentation
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            SDK <span className="text-white/20">Reference</span>
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {[
            { id: "structure", label: "Structure" },
            { id: "manifest", label: "manifest.json" },
            { id: "entry", label: "Entry Point" },
            { id: "api", label: "Plugin API" },
            { id: "hooks", label: "Event Hooks" },
            { id: "install", label: "IPC API" }
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
              {codeTab === "structure" && "Project Structure"}
              {codeTab === "manifest" && "manifest.json"}
              {codeTab === "entry" && "Entry Point (index.js)"}
              {codeTab === "api" && "Plugin SDK API Reference"}
              {codeTab === "hooks" && "Event Hooks"}
              {codeTab === "install" && "IPC API Reference"}
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

      {/* Security Model */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Security Model
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Security <span className="text-white/20">Verification</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Lock size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Code Signing</h3>
            <p className="text-sm text-white/60">
              All verified plugins are code-signed by their developers. Signatures are validated before installation to ensure authenticity.
            </p>
          </div>

          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <Shield size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Permission System</h3>
            <p className="text-sm text-white/60">
              Plugins declare required permissions upfront. Users can review and approve permissions before installation.
            </p>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Box size={28} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">Sandboxed Execution</h3>
            <p className="text-sm text-white/60">
              Plugins run in isolated contexts with no direct file system or network access. All operations are proxied and logged.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="flex items-center gap-4">
            <AlertTriangle size={24} className="text-amber-400" />
            <div>
              <h4 className="font-bold text-amber-400">Unverified Plugins</h4>
              <p className="text-sm text-white/60">
                Plugins from untrusted sources will show a warning badge. Review the code and permissions carefully before installing.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}