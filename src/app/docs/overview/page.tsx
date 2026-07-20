"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useVersion } from "@/lib/useVersion";
import { 
  Bot, 
  ShieldCheck, 
  Zap, 
  Globe,
  Database,
  Terminal,
  Smartphone,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  Eye,
  FileText,
  Timer,
  Workflow,
  Heart,
  Brain,
  Bookmark
} from "lucide-react";

const keyFeatures = [
  {
    icon: Bot,
    title: "AI Agent",
    description: "Multi-step tasks with chain-of-thought reasoning, RAG memory, and real-time action tracking.",
    fileRef: "src/lib/AIAgent.ts",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
    href: "/docs/ai-commands"
  },
  {
    icon: ShieldCheck,
    title: "Three-Layer Security",
    description: "Visual sandbox, syntactic firewall, and human-in-the-loop authorization prevent unauthorized actions.",
    fileRef: "src/lib/Security.ts",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    href: "/docs/security"
  },
  {
    icon: Terminal,
    title: "Shell Commands",
    description: "Execute terminal commands with explicit permission gating and cross-device authorization.",
    fileRef: "src/core/command-executor.js",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
    href: "/docs/ai-commands#shell"
  },
  {
    icon: FileText,
    title: "PDF Generation",
    description: "Generate structured multi-page PDFs with icons, tables, branding, and screenshot embedding.",
    fileRef: "src/lib/AdvancedDocumentEngine.ts",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-400",
    href: "/docs/ai-commands#pdf"
  },
  {
    icon: Timer,
    title: "Background Scheduling",
    description: "Schedule tasks to run automatically, even when the browser is closed. Works as a system service.",
    fileRef: "src/service/",
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/20",
    iconColor: "text-indigo-400",
    href: "/docs/automation"
  },
  {
    icon: Smartphone,
    title: "Mobile Control",
    description: "Control your desktop from your phone. Approve high-risk actions via QR code scanning.",
    fileRef: "src/lib/WiFiSyncService.ts",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/20",
    iconColor: "text-pink-400",
    href: "/docs/getting-started#mobile"
  },
  {
    icon: Cpu,
    title: "Live Model Catalogs",
    description: "Refresh official provider model lists for Gemini, OpenAI, Claude, Groq, and xAI directly inside settings.",
    fileRef: "src/lib/",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/20",
    iconColor: "text-cyan-300",
    href: "/docs/api-reference#ai"
  },
  {
    icon: Heart,
    title: "Preference Auto-Learning",
    description: "AI detects and remembers user preferences — response style, tone, language, and behavior — across sessions without manual configuration.",
    fileRef: "src/lib/",
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/20",
    iconColor: "text-rose-400",
    href: "/docs/ai-commands"
  },
  {
    icon: Brain,
    title: "Cross-Session RAG",
    description: "Past conversations are automatically ingested into vector memory and available as RAG context in future sessions for continuity.",
    fileRef: "src/lib/AIAgent.ts",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/20",
    iconColor: "text-violet-400",
    href: "/docs/ai-commands"
  },
  {
    icon: Bookmark,
    title: "SAVE_PREFERENCE",
    description: "AI persists user preferences via the SAVE_PREFERENCE command, enabling personalized interactions without manual setup.",
    fileRef: "src/lib/AICommandParser.ts",
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/20",
    iconColor: "text-amber-400",
    href: "/docs/ai-commands"
  },
];

const architectureLayers = [
  {
    name: "User Interface Layer",
    description: "Electron shell with native menus, SwiftUI sidebar on macOS, Flutter mobile app",
    components: ["Next.js Frontend", "SwiftUI macOS UI", "Flutter Mobile App"],
    color: "bg-sky-500"
  },
  {
    name: "AI Orchestration Layer",
    description: "Multi-model support (Gemini, Claude, OpenAI, Groq, xAI, Ollama, Apple Intelligence utilities) with RAG memory and thinking panels",
    components: ["AI Chat Sidebar", "Thinking Panel", "Command Parser", "RAG Memory"],
    color: "bg-purple-500"
  },
  {
    name: "Automation Engine",
    description: "Task scheduling, shell command execution, browser automation, and screenshot capture",
    components: ["Scheduler Service", "Shell Executor", "Browser Controller", "OCR Service"],
    color: "bg-emerald-500"
  },
  {
    name: "Security Layer",
    description: "Three-layer architecture: visual sandbox, syntactic firewall, human-in-the-loop",
    components: ["Permission Store", "PII Scrubber", "Injection Detector", "QR Auth"],
    color: "bg-amber-500"
  },
  {
    name: "Platform Integration",
    description: "Cross-platform support for Windows, macOS, Linux, Android with native APIs",
    components: ["Electron Main Process", "Flutter Bridge", "Firebase Sync", "WiFi P2P"],
    color: "bg-rose-500"
  },
];

const supportedProviders = [
  { name: "Google Gemini", type: "Cloud", status: "Live Catalogs", icon: "G" },
  { name: "OpenAI GPT", type: "Cloud", status: "Live Catalogs", icon: "O" },
  { name: "Anthropic Claude", type: "Cloud", status: "Supported", icon: "A" },
  { name: "Groq", type: "Cloud", status: "Fastest", icon: "G" },
  { name: "xAI Grok", type: "Cloud", status: "Live Catalogs", icon: "X" },
  { name: "Ollama", type: "Local", status: "Private", icon: "O" },
  { name: "Apple Intelligence", type: "Native macOS", status: "Preview", icon: "A" },
];

export default function OverviewPage() {
  const { version } = useVersion();
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <div className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Documentation v{version || '...'}
          </span>
        </div>
        
        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl lg:text-8xl">
          What is <br />
          <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Aartiq?
          </span>
        </h1>
        
        <p className="mx-auto mb-12 max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Aartiq is an open-source Electron application that integrates large 
          language models with native OS APIs for permission-gated automation. 
          Source: main.js, preload.js, src/lib/, src/core/
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs/getting-started"
            className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-sky-400 hover:text-white"
          >
            Get Started <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/docs/ai-commands"
            className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            AI Commands <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.section>

      {/* Key Features Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400">
            Core Features
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Module <span className="text-white/20">Reference</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={feature.href}
                className={`group block rounded-[40px] border ${feature.borderColor} bg-gradient-to-br ${feature.color} p-10 transition-all hover:scale-[1.02] hover:shadow-2xl`}
              >
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/5 ${feature.iconColor} shadow-lg`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="mb-4 text-xl font-black uppercase tracking-wider">{feature.title}</h3>
                <p className="mb-4 text-sm font-medium leading-relaxed text-white/50">{feature.description}</p>
                <p className="mb-6 font-mono text-[10px] text-white/20">{feature.fileRef}</p>
                <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${feature.iconColor} opacity-0 transition-opacity group-hover:opacity-100`}>
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Architecture Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400">
            Architecture
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            System <span className="text-white/20">Design</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Aartiq uses a layered architecture that separates concerns while maintaining 
            tight integration between AI intelligence and platform capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {architectureLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-white/10"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
              
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${layer.color}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
                      Layer {i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-black uppercase tracking-wider">{layer.name}</h3>
                  <p className="text-sm font-medium text-white/40">{layer.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {layer.components.map((component) => (
                    <span
                      key={component}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/40"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* AI Providers Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400">
            AI Integration
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Multi-Model <span className="text-white/20">Support</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Choose the right model for your task. Use cloud APIs for power or run 
            locally for complete privacy.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportedProviders.map((provider, i) => (
            <motion.div
              key={provider.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-lg font-black text-white/60">
                  {provider.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{provider.name}</h4>
                  <p className="text-xs text-white/30">{provider.type}</p>
                </div>
              </div>
              <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                provider.status === "Recommended" 
                  ? "bg-sky-500/20 text-sky-400"
                  : provider.status === "Private"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-white/10 text-white/40"
              }`}>
                {provider.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Performance Benchmarks */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400">
            Verified Benchmarks
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Performance <span className="text-white/20">Data</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Real measurements on production hardware. All tests use osascript window-visibility polling and ps RSS sampling.
          </p>
        </div>

        {/* Device */}
        <div className="mb-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/40">Test Environment</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Device", value: "MacBook Pro (Mac16,8)" },
              { label: "Chip", value: "Apple M4 Pro — 12 cores" },
              { label: "RAM", value: "24 GB" },
              { label: "OS", value: "macOS 26.5 (25F71)" },
              { label: "App Version", value: "0.3.4" },
              { label: "Date", value: "2026-07-20" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <span className="text-xs text-white/40">{item.label}</span>
                <code className="text-xs font-mono text-sky-300">{item.value}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Time */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60">Cold Launch</p>
            <p className="text-5xl font-black text-emerald-400">0.32<span className="text-2xl">s</span></p>
            <p className="mt-2 text-xs text-white/40">Process start → Window visible</p>
            <p className="mt-1 text-[10px] text-white/20">3/3 runs identical (±0.00s)</p>
          </div>
          <div className="rounded-[2rem] border border-sky-500/20 bg-sky-500/5 p-8 text-center">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400/60">Warm Start</p>
            <p className="text-5xl font-black text-sky-400">0.31<span className="text-2xl">s</span></p>
            <p className="mt-2 text-xs text-white/40">From OS cache (second launch)</p>
          </div>
          <div className="rounded-[2rem] border border-purple-500/20 bg-purple-500/5 p-8 text-center">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400/60">Memory (Main)</p>
            <p className="text-5xl font-black text-purple-400">430<span className="text-2xl">MB</span></p>
            <p className="mt-2 text-xs text-white/40">RSS at steady state (1.8% of 24GB)</p>
          </div>
        </div>

        {/* Detailed Table */}
        <div className="mt-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-white/40">Detailed Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-xs font-black uppercase tracking-wider text-white/40">Metric</th>
                  <th className="pb-3 text-xs font-black uppercase tracking-wider text-white/40">Value</th>
                  <th className="pb-3 text-xs font-black uppercase tracking-wider text-white/40">Notes</th>
                </tr>
              </thead>
              <tbody className="text-sm text-white/60">
                {[
                  { metric: "Cold Launch (Window Visible)", value: "0.32s", notes: "Average of 3 runs, ±0.00s" },
                  { metric: "Warm Start (Window Visible)", value: "0.31s", notes: "From OS file cache" },
                  { metric: "Main Process RSS", value: "430 MB", notes: "Stabilizes to ~610 MB after tab activity" },
                  { metric: "Total RSS (all processes)", value: "1,712 MB", notes: "8 Electron + Chromium processes" },
                  { metric: "CPU (idle, window visible)", value: "< 1%", notes: "After initial load completes" },
                  { metric: "Memory (% of 24 GB)", value: "~7.1%", notes: "Total footprint including GPU subprocesses" },
                  { metric: "Active Ports", value: "3001, 3004, 46203", notes: "MCP, WiFi sync, Native bridge" },
                  { metric: "App Bundle Size", value: "1.2 GB", notes: "Frameworks: 276 MB, Resources: 958 MB" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 font-medium text-white/70">{row.metric}</td>
                    <td className="py-3"><code className="rounded bg-white/5 px-2 py-1 text-xs font-mono text-sky-300">{row.value}</code></td>
                    <td className="py-3 text-xs text-white/40">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reproduce */}
        <div className="mt-8 rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8">
          <h3 className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-amber-400/60">How to Reproduce</h3>
          <p className="mb-4 text-sm text-white/50">Run these commands on your own machine to verify:</p>
          <div className="rounded-xl bg-black/40 p-4 font-mono text-xs text-white/60">
            <p className="text-white/30"># Kill any running instance</p>
            <p className="text-emerald-400">pkill -f &quot;Aartiq&quot; &amp;&amp; sleep 4</p>
            <p className="mt-2 text-white/30"># Measure cold launch</p>
            <p className="text-emerald-400">START=$(python3 -c &quot;import time; print(time.time())&quot;)</p>
            <p className="text-emerald-400">open -a Aartiq</p>
            <p className="text-emerald-400">for i in $(seq 1 40); do sleep 0.1; VISIBLE=$(osascript -e &apos;tell application &quot;System Events&quot; to tell process &quot;Aartiq&quot; to get visible&apos; 2&gt;/dev/null); if [ &quot;$VISIBLE&quot; = &quot;true&quot; ]; then echo &quot;Window visible in: $(python3 -c &quot;import time; print(f&apos;{$(date +%s%N)}&apos;)&quot;)&quot;; break; fi; done</p>
            <p className="mt-2 text-white/30"># Measure memory</p>
            <p className="text-emerald-400">sleep 3 &amp;&amp; ps -p $(pgrep -f &quot;Aartiq.app/Contents/MacOS/Aartiq&quot;) -o rss=,vsz=,%cpu=,%mem=</p>
          </div>
        </div>
    </div>
  );
}