"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mic,
  Volume2,
  Keyboard,
  Terminal,
  Calendar,
  AppWindow,
  Camera,
  Search,
  FileText,
  MessageSquare,
  Share2,
  Settings,
  ChevronRight,
  Copy,
  Check,
  Zap,
  Bot,
  Command,
  Cpu,
  Globe,
  Bell,
  Folder,
  Bookmark,
  Link as LinkIcon,
  Shell,
  Cpu as CpuIcon
} from "lucide-react";

const features = [
  {
    id: "gnome-integration",
    name: "GNOME Desktop Integration",
    icon: AppWindow,
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
    description: "Native GNOME shell integration with notifications, shortcuts, and system tray.",
    requirements: [
      "GNOME Shell 40+",
      "notify-send for notifications",
      "espeak for text-to-speech"
    ],
    features: [
      { name: "Desktop Notifications", desc: "Native GNOME notifications via notify-send" },
      { name: "Keybindings", desc: "Register global keyboard shortcuts" },
      { name: "App Launcher", desc: "Add to GNOME Activities overview" },
      { name: "System Tray", desc: "Background running with tray icon" }
    ]
  },
  {
    id: "kde-integration",
    name: "KDE Plasma Integration",
    icon: Cpu,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    description: "Full KDE Plasma desktop integration with system notifications and shortcuts.",
    requirements: [
      "KDE Plasma 5.20+",
      "kdialog for notifications",
      "qdbus for system control"
    ],
    features: [
      { name: "KDialog Notifications", desc: "Native KDE notifications" },
      { name: "KRunner Integration", desc: "Quick actions via KRunner" },
      { name: "System Tray", desc: "Plasma system tray support" },
      { name: "Audio Control", desc: "Volume control via KMix" }
    ]
  },
  {
    id: "voice-control",
    name: "Voice Control",
    icon: Mic,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    description: "Text-to-speech and voice input support for hands-free control.",
    requirements: [
      "espeak for text-to-speech",
      "pocketsphinx for offline STT (optional)",
      "Web-based STT via AI backend"
    ],
    features: [
      { name: "Text-to-Speech", desc: "Speak AI responses aloud" },
      { name: "Voice Input", desc: "Dictate messages to AI" },
      { name: "Multiple Voices", desc: "Choose from 80+ eSpeak voices" },
      { name: "Rate Control", desc: "Adjust speech speed" }
    ]
  },
  {
    id: "shortcuts",
    name: "Desktop Shortcuts",
    icon: Command,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
    description: "Create .desktop launcher files and URL scheme shortcuts for quick access.",
    requirements: [
      "XDG desktop entry standard",
      "Optional: GTK/Qt launchers"
    ],
    features: [
      { name: "URL Scheme", desc: "aartiq:// protocol handler" },
      { name: "Desktop Launchers", desc: "Add to desktop/Applications" },
      { name: "GNOME Shortcuts", desc: "Install to GNOME Activities" },
      { name: "Quick Actions", desc: "Pre-defined action shortcuts" }
    ]
  },
  {
    id: "system-automation",
    name: "System Automation",
    icon: Terminal,
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    description: "Control system functions via shell commands and desktop environment APIs.",
    requirements: [
      "Linux shell (bash/zsh)",
      "Desktop environment APIs"
    ],
    features: [
      { name: "Volume Control", desc: "Adjust system volume" },
      { name: "App Launching", desc: "Open applications via xdg-open/gtk-launch" },
      { name: "Notifications", desc: "Send desktop notifications" },
      { name: "Screenshots", desc: "Capture screen via scrot/import" }
    ]
  }
];

const urlSchemes = [
  { action: "chat", params: "message", example: "aartiq://chat?message=Hello%20AI" },
  { action: "search", params: "query", example: "aartiq://search?query=web+search" },
  { action: "navigate", params: "url", example: "aartiq://navigate?url=https://example.com" },
  { action: "create-pdf", params: "content,title", example: "aartiq://create-pdf?content=Hello&title=Doc" },
  { action: "run-command", params: "command", example: "aartiq://run-command?command=ls%20-la" },
  { action: "open-app", params: "appName", example: "aartiq://open-app?appName=firefox" },
  { action: "volume", params: "level", example: "aartiq://volume?level=50" },
  { action: "schedule", params: "task,cron", example: "aartiq://schedule?task=PDF&cron=0%208%20*%20*%20*" },
  { action: "ask-ai", params: "prompt,speak", example: "aartiq://ask-ai?prompt=Hello&speak=true" },
  { action: "notify", params: "title,message", example: "aartiq://notify?title=Alert&message=Done" }
];

const shortcutsTemplates = [
  { name: "Ask AI", action: "chat", icon: MessageSquare },
  { name: "Web Search", action: "search", icon: Search },
  { name: "Create PDF", action: "create-pdf", icon: FileText },
  { name: "Run Command", action: "run-command", icon: Terminal },
  { name: "Open App", action: "open-app", icon: AppWindow },
  { name: "Set Volume", action: "volume", icon: Volume2 },
  { name: "Schedule Task", action: "schedule", icon: Calendar },
  { name: "Take Screenshot", action: "screenshot", icon: Camera },
  { name: "Send Notification", action: "notify", icon: Bell }
];

export default function LinuxIntegrationPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "desktop-environments", label: "Desktop Environments" },
    { id: "url-scheme-actions", label: "URL Scheme Actions" },
    { id: "shortcuts-templates", label: "Shortcuts" },
    { id: "features", label: "Features" },
    { id: "usage-examples", label: "Usage Examples" },
    { id: "api-reference", label: "API Reference" },
    { id: "installation", label: "Installation" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900 text-white">
      <div className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-blue-600">
                <AppWindow className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Linux Integration</h1>
                <p className="text-sm text-zinc-400">Aartiq for Linux</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link 
                href="/docs/apple-integration"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                macOS Integration
              </Link>
              <Link 
                href="/docs/windows-integration"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Windows Integration
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <motion.aside 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`flex-shrink-0 ${sidebarOpen ? 'w-64' : 'w-16'}`}
          >
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-400 hover:text-white transition-colors mb-4"
            >
              <Settings className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Collapse</span>}
            </button>
            
            {sidebarOpen && (
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            )}
          </motion.aside>

          <main className="flex-1 min-w-0">
            {/* Overview */}
            <section id="overview" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-orange-900/20 border border-zinc-800/50 p-8 md:p-12"
              >
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-blue-500">
                      <AppWindow className="w-8 h-8 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium border border-orange-500/30">
                      GNOME / KDE / XFCE / MATE
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Linux Integration
                  </h1>
                  <p className="text-xl text-zinc-300 max-w-2xl mb-6">
                    aartiq:// URL scheme handler for Linux desktops. Source: src/lib/platform/LinuxIntegration.ts.
                    Provides GNOME, KDE Plasma, XFCE, and MATE/Cinnamon integration with desktop notifications,
                    voice control, global shortcuts, and system automation via shell integration.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <AppWindow className="w-4 h-4 text-amber-400" />
                      GNOME / KDE
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Mic className="w-4 h-4 text-amber-400" />
                      Voice Control
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      Shell Automation
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Command className="w-4 h-4 text-amber-400" />
                      Desktop Shortcuts
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Supported Desktop Environments */}
            <section id="desktop-environments" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                  <Globe className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Supported Desktop Environments</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <AppWindow className="w-6 h-6 text-orange-400" />
                    <div>
                      <h3 className="font-semibold text-white">GNOME</h3>
                      <p className="text-sm text-zinc-500">Ubuntu, Fedora, Debian, Arch</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-6 h-6 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-white">KDE Plasma</h3>
                      <p className="text-sm text-zinc-500">Kubuntu, Fedora KDE, openSUSE</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Shell className="w-6 h-6 text-green-400" />
                    <div>
                      <h3 className="font-semibold text-white">XFCE</h3>
                      <p className="text-sm text-zinc-500">Xfce, Xubuntu</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50">
                  <div className="flex items-center gap-3">
                    <Folder className="w-6 h-6 text-purple-400" />
                    <div>
                      <h3 className="font-semibold text-white">MATE / Cinnamon</h3>
                      <p className="text-sm text-zinc-500">Linux Mint, Ubuntu MATE</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* URL Scheme Actions */}
            <section id="url-scheme-actions" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <LinkIcon className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">URL Scheme Actions</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800/50">
                        <th className="text-left p-4 font-medium text-zinc-500">Action</th>
                        <th className="text-left p-4 font-medium text-zinc-500">Parameters</th>
                        <th className="text-left p-4 font-medium text-zinc-500">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {urlSchemes.map((scheme) => (
                        <tr key={scheme.action} className="border-b border-zinc-800/30">
                          <td className="p-4">
                            <code className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                              {scheme.action}
                            </code>
                          </td>
                          <td className="p-4 text-zinc-300 text-sm">{scheme.params}</td>
                          <td className="p-4">
                            <code className="text-xs text-zinc-500 block max-w-xs truncate">
                              {scheme.example}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Shortcuts Templates */}
            <section id="shortcuts-templates" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <Command className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Shortcuts Templates</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-4">
                {shortcutsTemplates.map((template) => (
                  <motion.div
                    key={template.name}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800/50 hover:border-zinc-700/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <template.icon className="w-5 h-5 text-zinc-400" />
                      <span className="font-medium text-white">{template.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section id="features" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30">
                  <Zap className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Features</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="space-y-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    initial={false}
                    animate={{ backgroundColor: expandedFeature === feature.id ? 'rgba(24, 24, 27, 0.5)' : 'rgba(9, 9, 11, 0.3)' }}
                    className={`rounded-xl border overflow-hidden ${feature.borderColor}`}
                  >
                    <button
                      onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                      className="w-full p-5 flex items-center gap-4 text-left"
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                        <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white">{feature.name}</h3>
                        <p className="text-zinc-400 text-sm mt-1">{feature.description}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform ${expandedFeature === feature.id ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {expandedFeature === feature.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 pb-5"
                      >
                        <div className="pt-4 border-t border-zinc-800/50">
                          <h4 className="text-sm font-medium text-zinc-500 mb-3">Requirements</h4>
                          <ul className="space-y-2 mb-4">
                            {feature.requirements.map((req, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                                <Check className="w-4 h-4 text-green-400" />
                                {req}
                              </li>
                            ))}
                          </ul>
                          
                          <h4 className="text-sm font-medium text-zinc-500 mb-3">Features</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {feature.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <Zap className="w-4 h-4 text-yellow-400" />
                                <span className="text-zinc-300">{f.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Usage Examples */}
            <section id="usage-examples" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Terminal className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Usage Examples</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              
              <div className="space-y-6">
                <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 p-5">
                  <h3 className="font-semibold text-white mb-3">Send Message to AI</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400">aartiq://chat?message=Hello%20AI</code>
                      <button
                        onClick={() => copyToClipboard('aartiq://chat?message=Hello%20AI', 'chat')}
                        className="p-1 hover:bg-zinc-800 rounded"
                      >
                        {copied === 'chat' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-500" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 p-5">
                  <h3 className="font-semibold text-white mb-3">Create PDF from Content</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400">aartiq://create-pdf?content=Report%20Content&title=MyReport</code>
                      <button
                        onClick={() => copyToClipboard('aartiq://create-pdf?content=Report%20Content&title=MyReport', 'pdf')}
                        className="p-1 hover:bg-zinc-800 rounded"
                      >
                        {copied === 'pdf' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-500" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 p-5">
                  <h3 className="font-semibold text-white mb-3">Schedule Daily Task</h3>
                  <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <code className="text-green-400">aartiq://schedule?task=Generate%20Report&cron=0%208%20*%20*%20*</code>
                      <button
                        onClick={() => copyToClipboard('aartiq://schedule?task=Generate%20Report&cron=0%208%20*%20*%20*', 'schedule')}
                        className="p-1 hover:bg-zinc-800 rounded"
                      >
                        {copied === 'schedule' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section id="api-reference" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                  <Keyboard className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">API Reference</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 p-5">
                <div className="space-y-4 font-mono text-sm">
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.executeAction</div>
                    <div className="text-zinc-500 text-xs mt-1">Execute a shortcut action</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.getDesktop</div>
                    <div className="text-zinc-500 text-xs mt-1">Get current desktop environment</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.voice.speak(text, options)</div>
                    <div className="text-zinc-500 text-xs mt-1">Text-to-speech using espeak</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.voice.getVoices()</div>
                    <div className="text-zinc-500 text-xs mt-1">Get available espeak voices</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.notify(title, body, options)</div>
                    <div className="text-zinc-500 text-xs mt-1">Send desktop notification</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.createShortcut(name, action, params)</div>
                    <div className="text-zinc-500 text-xs mt-1">Create .desktop shortcut file</div>
                  </div>
                  <div>
                    <div className="text-purple-400">window.electronAPI.linux.createLauncher()</div>
                    <div className="text-zinc-500 text-xs mt-1">Create application launcher</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation */}
            <section id="installation" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Bell className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Installation</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Source: src/lib/platform/LinuxIntegration.ts
                  </p>
                </div>
              </motion.div>
              <div className="bg-zinc-900/60 rounded-xl border border-zinc-800/50 p-5">
                <h3 className="font-semibold text-white mb-3">Required Dependencies</h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="text-zinc-400"># Debian/Ubuntu</div>
                  <div className="text-green-400">sudo apt install espeak libnotify-bin xdg-utils</div>
                  <div className="text-zinc-400 mt-3"># Fedora</div>
                  <div className="text-green-400">sudo dnf install espeak libnotify xdg-utils</div>
                  <div className="text-zinc-400 mt-3"># Arch Linux</div>
                  <div className="text-green-400">sudo pacman -S espeak libnotify xdg-utils</div>
                </div>
                
                <h3 className="font-semibold text-white mb-3">Register URL Protocol</h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-zinc-400"># In Aartiq Settings → Integration → Linux</div>
                  <div className="text-green-400">Click "Register aartiq:// Protocol"</div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}