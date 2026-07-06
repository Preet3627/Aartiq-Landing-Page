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
  { id: "all", name: "All Plugins", icon: Box, count: 12 },
  { id: "ai", name: "AI Models", icon: Zap, count: 4 },
  { id: "productivity", name: "Productivity", icon: Settings, count: 3 },
  { id: "utilities", name: "Utilities", icon: Puzzle, count: 2 },
  { id: "integrations", name: "Integrations", icon: Layers, count: 3 }
];

const featuredPlugins = [
  {
    id: "claude-integration",
    name: "Claude Integration",
    description: "Add Anthropic's Claude AI model with advanced reasoning and code generation capabilities.",
    author: "Aartiq",
    version: "2.1.0",
    icon: "🤖",
    category: "ai",
    rating: 4.9,
    downloads: 0,
    verified: true,
    features: ["Claude 3.5 Sonnet", "Claude 3 Opus", "Function calling", "Vision support"]
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    description: "Trigger and monitor GitHub Actions workflows directly from Aartiq.",
    author: "Community",
    version: "1.5.0",
    icon: "🐙",
    category: "integrations",
    rating: 4.7,
    downloads: 0,
    verified: true,
    features: ["Workflow triggers", "Status monitoring", "Artifact access", "PR comments"]
  },
  {
    id: "slack-notifications",
    name: "Slack Notifications",
    description: "Send notifications and updates to Slack channels from your AI automations.",
    author: "Community",
    version: "1.2.0",
    icon: "💬",
    category: "integrations",
    rating: 4.5,
    downloads: 0,
    verified: false,
    features: ["Channel messaging", "Direct messages", "Embeds", "Thread replies"]
  }
];

const codeExamples = {
  pluginStructure: `// plugin-name/
// ├── manifest.json        # Plugin metadata
// ├── index.js             # Entry point
// ├── src/
// │   ├── commands.js      # AI commands
// │   ├── handlers.js      # Event handlers
// │   └── utils.js         # Helper functions
// ├── ui/
// │   ├── settings.tsx     # Settings panel
// │   └── components/      # UI components
// └── assets/
//     └── icon.png         # Plugin icon`,

  manifest: `// manifest.json
{
  "id": "my-awesome-plugin",
  "name": "My Awesome Plugin",
  "version": "1.0.0",
  "description": "Does awesome things",
  "author": "Your Name",
  "license": "MIT",
  "category": "productivity",
  "icon": "icon.png",
  "minAppVersion": "0.2.0",
  "permissions": [
    "filesystem",
    "network"
  ],
  "commands": [
    {
      "id": "my-command",
      "name": "My Command",
      "description": "Does something awesome",
      "schema": {
        "type": "object",
        "properties": {
          "input": { "type": "string" }
        }
      }
    }
  ],
  "settings": [
    {
      "id": "apiKey",
      "type": "password",
      "label": "API Key",
      "default": ""
    }
  ]
}`,

  entryPoint: `// index.js
const { Plugin } = require('@comet-ai/plugin-sdk');

class MyAwesomePlugin extends Plugin {
  constructor() {
    super({
      id: 'my-awesome-plugin',
      name: 'My Awesome Plugin'
    });
  }

  async onLoad() {
    // Register commands
    this.registerCommand('my-command', this.myCommand.bind(this));
    
    // Register event handlers
    this.on('automation:complete', this.onAutomationComplete.bind(this));
    
    console.log('My Awesome Plugin loaded!');
  }

  async myCommand(params) {
    const { input } = params;
    // Your command logic here
    return {
      success: true,
      result: \`Processed: \${input}\`
    };
  }

  async onAutomationComplete(event) {
    console.log('Automation completed:', event.taskId);
  }

  getSettingsUI() {
    return require('./ui/settings');
  }
}

module.exports = MyAwesomePlugin;`,

  commandHandler: `// commands.js
module.exports = {
  async analyze_code(code, language) {
    // Analyze code using your preferred service
    const response = await fetch('https://api.analyzer.com/analyze', {
      method: 'POST',
      body: JSON.stringify({ code, language }),
      headers: { 'Authorization': \`Bearer \${this.config.apiKey}\` }
    });
    
    return {
      issues: response.issues,
      suggestions: response.suggestions,
      complexity: response.complexity
    };
  },

  async generate_tests(code, framework) {
    // Generate unit tests
    const tests = await this.ai.complete({
      prompt: \`Generate \${framework} tests for: \${code}\`
    });
    
    return { tests };
  }
};`,

  settingsUI: `// ui/settings.tsx
import React from 'react';

export default function SettingsPanel({ config, onUpdate }) {
  return (
    <div className="plugin-settings">
      <h3>My Awesome Plugin</h3>
      
      <label>
        <span>API Key</span>
        <input
          type="password"
          value={config.apiKey || ''}
          onChange={(e) => onUpdate({ apiKey: e.target.value })}
          placeholder="Enter your API key"
        />
      </label>
      
      <label>
        <span>Default Language</span>
        <select
          value={config.language || 'javascript'}
          onChange={(e) => onUpdate({ language: e.target.value })}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>
      </label>
      
      <label className="checkbox">
        <input
          type="checkbox"
          checked={config.autoAnalyze || false}
          onChange={(e) => onUpdate({ autoAnalyze: e.target.checked })}
        />
        <span>Auto-analyze on save</span>
      </label>
    </div>
  );
}`,

  verification: `// Security verification steps
1. Code Signing
   - Developer signs plugin with certificate
   - Signature verified on install
   - Un-signed plugins show warning

2. Permissions System
   - Plugins declare required permissions
   - User approves permissions
   - Runtime permission checks

3. Sandboxed Execution
   - Plugins run in isolated context
   - No direct file system access
   - Network requests proxied`,

  installPlugin: `// Install a plugin
await window.electron.invoke('plugins:install', {
  source: 'marketplace', // or 'file'
  pluginId: 'claude-integration'
});

// Install from file
await window.electron.invoke('plugins:install', {
  source: 'file',
  path: '/path/to/plugin.zip'
});

// List installed plugins
const plugins = await window.electron.invoke('plugins:list');
console.log(plugins);

// Update a plugin
await window.electron.invoke('plugins:update', {
  pluginId: 'claude-integration'
});

// Uninstall a plugin
await window.electron.invoke('plugins:uninstall', {
  pluginId: 'my-plugin'
});`,

  pluginAPI: `// Plugin SDK API Reference

// Main Plugin Class
class Plugin {
  constructor(config: PluginConfig)
  
  // Lifecycle
  async onLoad(): Promise<void>           // Called when plugin loads
  async onUnload(): Promise<void>        // Called when plugin unloads
  async onEnable(): Promise<void>        // Called when enabled
  async onDisable(): Promise<void>       // Called when disabled
  
  // Command Registration
  registerCommand(id: string, handler: CommandHandler): this
  unregisterCommand(id: string): this
  
  // Event System
  on(event: string, handler: EventHandler): this
  off(event: string, handler: EventHandler): this
  emit(event: string, data?: any): void
  
  // Configuration
  getConfig(key?: string): any
  setConfig(key: string, value: any): void
  saveConfig(): Promise<void>
  
  // Utilities
  getDataPath(): string                  // Get plugin data directory
  getAssetPath(filename: string): string // Get asset path
  log(message: string, level?: string): void
}

// CommandContext - passed to command handlers
interface CommandContext {
  args: Record<string, any>              // Command arguments
  user: { id: string; name: string }    // User info
  session: { id: string }               // Session info
  
  // Response methods
  respond(text: string): Promise<void>
  respondJSON(data: object): Promise<void>
  progress(current: number, total: number): Promise<void>
  
  // AI helpers
  ai: {
    complete(prompt: string): Promise<string>
    stream(prompt: string, onChunk: Function): Promise<void>
  }
}

// AICommandBuilder - for AI command responses
const { AICommandBuilder } = require('@comet-ai/plugin-sdk');

const builder = AICommandBuilder.create('my-command')
  .param('input', 'string', 'Input text')
  .param('options', 'object', 'Additional options');

const command = builder.build();
// Returns: { command: 'MY_COMMAND', params: {...} }`,

  hooks: `// Event Hooks Reference

// Available Plugin Hooks
const hooks = {
  // Lifecycle hooks
  'plugin:load': (plugin: Plugin) => void,
  'plugin:unload': (plugin: Plugin) => void,
  'plugin:enable': (plugin: Plugin) => void,
  'plugin:disable': (plugin: Plugin) => void,
  
  // Automation hooks
  'automation:before': (task: Task) => void,
  'automation:after': (task: Task, result: Result) => void,
  'automation:error': (task: Task, error: Error) => void,
  
  // AI hooks
  'ai:beforeCommand': (command: Command) => void,
  'ai:afterCommand': (command: Command, result: Result) => void,
  'ai:beforeComplete': (prompt: string) => void,
  'ai:afterComplete': (prompt: string, response: string) => void,
  
  // Browser hooks
  'browser:navigate': (url: string) => void,
  'browser:domReady': () => void,
  'browser:close': () => void,
  
  // Settings hooks
  'settings:change': (key: string, value: any) => void,
  'settings:reset': () => void
};

// Register hooks in plugin
class MyPlugin extends Plugin {
  constructor() {
    super({ id: 'my-plugin', name: 'My Plugin' });
  }
  
  async onLoad() {
    this.on('automation:after', this.onAutomationComplete.bind(this));
    this.on('ai:beforeCommand', this.logCommand.bind(this));
  }
  
  async onAutomationComplete(task, result) {
    console.log('Automation completed:', task.id);
  }
  
  async logCommand(command) {
    console.log('AI command:', command.name);
  }
}`
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
          Extend Aartiq with custom plugins using the Plugin SDK. Source: src/lib/plugin-sdk.js, src/lib/plugin-manager.js, src/main/handlers/plugin-handlers.js
        </p>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          {[
            { icon: Puzzle, label: "Plugins", value: "SDK v1", color: "text-purple-400", border: "border-purple-500/20" },
            { icon: CloudDownload, label: "Installs", value: "Open Source", color: "text-emerald-400", border: "border-emerald-500/20" },
            { icon: Shield, label: "Verified", value: "8", color: "text-sky-400", border: "border-sky-500/20" },
            { icon: Code, label: "SDK Version", value: "v2.0", color: "text-amber-400", border: "border-amber-500/20" }
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
              { label: "Plugin IPC", path: "src/main/handlers/plugin-handlers.js" },
              { label: "Extension Manager", path: "src/lib/extensions/ExtensionManager.ts" },
              { label: "Web Store", path: "src/components/WebStore.tsx" }
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
            { id: "structure", label: "Project Structure" },
            { id: "manifest", label: "manifest.json" },
            { id: "entry", label: "Entry Point" },
            { id: "commands", label: "Commands" },
            { id: "settings", label: "Settings UI" },
            { id: "api", label: "Plugin API" },
            { id: "hooks", label: "Event Hooks" },
            { id: "verify", label: "Verification" },
            { id: "install", label: "Install API" }
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
              {codeTab === "commands" && "Command Handlers"}
              {codeTab === "settings" && "Settings UI Component"}
              {codeTab === "api" && "Plugin SDK API Reference"}
              {codeTab === "hooks" && "Event Hooks Reference"}
              {codeTab === "verify" && "Security Verification"}
              {codeTab === "install" && "Install API"}
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