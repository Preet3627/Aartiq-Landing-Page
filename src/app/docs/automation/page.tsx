"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar,
  Timer,
  Play,
  Pause,
  Zap,
  Server,
  Bell,
  Smartphone,
  FileText,
  Globe,
  Terminal,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Workflow,
  Moon,
  Sun,
  Repeat,
  CalendarDays,
  CalendarClock,
  Webhook,
  Key,
  ArrowUpRight,
  Mail,
  Download,
  Share2,
  Copy
} from "lucide-react";

const cronPresets = [
  { name: "Every minute", expression: "* * * * *", description: "Runs every minute" },
  { name: "Every 5 minutes", expression: "*/5 * * * *", description: "Runs every 5 minutes" },
  { name: "Every 15 minutes", expression: "*/15 * * * *", description: "Runs every 15 minutes" },
  { name: "Every hour", expression: "0 * * * *", description: "At the start of every hour" },
  { name: "Every 6 hours", expression: "0 */6 * * *", description: "At midnight, 6am, noon, 6pm" },
  { name: "Daily at midnight", expression: "0 0 * * *", description: "Every day at 12:00 AM" },
  { name: "Daily at 8 AM", expression: "0 8 * * *", description: "Every day at 8:00 AM" },
  { name: "Daily at 6 PM", expression: "0 18 * * *", description: "Every day at 6:00 PM" },
  { name: "Weekdays at 9 AM", expression: "0 9 * * 1-5", description: "Monday to Friday at 9:00 AM" },
  { name: "Weekends at 10 AM", expression: "0 10 * * 0,6", description: "Saturday and Sunday at 10:00 AM" },
  { name: "Weekly on Monday", expression: "0 9 * * 1", description: "Every Monday at 9:00 AM" },
  { name: "First of month", expression: "0 0 1 * *", description: "First day of every month" }
];

const taskTypes = [
  {
    id: "pdf",
    name: "PDF Generation",
    icon: FileText,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    description: "Generate reports, summaries, and documents automatically",
    examples: [
      "Daily sales report at 8 AM",
      "Weekly team digest every Monday",
      "Monthly financial statements on the 1st"
    ],
    workflow: [
      "AI receives scheduled prompt",
      "Fetches latest data or content",
      "Formats into PDF template",
      "Saves to designated folder",
      "Sends notification with file"
    ]
  },
  {
    id: "scrape",
    name: "Web Scraping",
    icon: Globe,
    color: "from-sky-500/20 to-cyan-500/20",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
    description: "Extract data from websites on a schedule",
    examples: [
      "Stock price updates every 15 minutes",
      "News aggregation every hour",
      "Price monitoring for products"
    ],
    workflow: [
      "Scheduler triggers the task",
      "Browser navigates to target URLs",
      "AI extracts relevant content via OCR",
      "Data is processed and stored",
      "Alert sent if threshold exceeded"
    ]
  },
  {
    id: "prompt",
    name: "AI Prompt Execution",
    icon: Zap,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    description: "Run AI prompts on a schedule without user input",
    examples: [
      "Morning briefing every day at 7 AM",
      "System health check every hour",
      "Weekly summary generation"
    ],
    workflow: [
      "Cron triggers prompt execution",
      "AI loads context and memory",
      "Prompt is processed",
      "Results stored or shared",
      "Optional notification sent"
    ]
  },
  {
    id: "workflow",
    name: "Multi-Step Workflow",
    icon: Workflow,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description: "Chain multiple actions together",
    examples: [
      "Research → Summarize → PDF → Email",
      "Scrape → Analyze → Alert → Log",
      "Backup → Verify → Notify"
    ],
    workflow: [
      "Workflow triggered by schedule",
      "First step executes",
      "Output feeds into next step",
      "Error handling at each stage",
      "Final output delivered"
    ]
  }
];

const architectureComponents = [
  {
    name: "Background Service",
    icon: Server,
    description: "Runs as a system service (LaunchDaemon on macOS, Windows Service) independent of the browser",
    source: "src/service/service-main.js, src/service/launchd-manager.js, src/service/tray-manager.js",
    details: [
      "Operates even when browser is closed",
      "Runs under SYSTEM user context on Windows",
      "Minimal resource footprint (~30-50MB RAM)",
      "System tray icon only, no visible window"
    ]
  },
  {
    name: "Task Scheduler",
    icon: Calendar,
    description: "Manages task timing using cron expressions with catch-up logic for missed tasks",
    source: "src/service/scheduler.js",
    details: [
      "Supports cron, one-time, and interval triggers",
      "Automatically catches up on missed tasks after sleep/wake",
      "Timezone-aware scheduling",
      "Stagger option to prevent simultaneous execution"
    ]
  },
  {
    name: "Task Queue",
    icon: Database,
    description: "Priority-based queue with retry logic and concurrent execution limits",
    source: "src/service/task-queue.js",
    details: [
      "High/Normal/Low priority levels",
      "Automatic retry with exponential backoff",
      "Max 2 concurrent tasks by default",
      "Persistent queue survives restarts"
    ]
  },
  {
    name: "Model Selector",
    icon: Key,
    description: "Choose which AI model handles scheduled tasks independently of chat",
    source: "src/service/model-selector.js",
    details: [
      "Per-task model selection",
      "Ollama for local processing",
      "Cloud models for heavy workloads",
      "Model picker popup before scheduling"
    ]
  },
  {
    name: "Notification System",
    icon: Bell,
    description: "Multi-channel notifications for task completion and failures",
    source: "src/service/notifications.js, src/service/mobile-notifier.js",
    details: [
      "Desktop system notifications",
      "Mobile push notifications via WiFi Sync",
      "Email notifications (SMTP config required)",
      "Configurable per-task notification preferences"
    ]
  },
  {
    name: "Storage Manager",
    icon: Download,
    description: "Handles file output, task state persistence, and sync for mobile access",
    source: "src/service/storage.js, src/service/pdf-sync.js",
    details: [
      "Default location: ~/Documents/Aartiq/",
      "User can customize output directory",
      "PDFs synced to mobile for viewing",
      "Task history and logs preserved"
    ]
  }
];

const cronSyntax = {
  format: `┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6)
│ │ │ │ │
* * * * *`,
  fields: [
    { name: "Minute", values: "0-59", allowed: "* , - /" },
    { name: "Hour", values: "0-23", allowed: "* , - /" },
    { name: "Day of Month", values: "1-31", allowed: "* , - /" },
    { name: "Month", values: "1-12", allowed: "* , - /" },
    { name: "Day of Week", values: "0-6 (Sun-Sat)", allowed: "* , - /" }
  ],
  specialChars: [
    { char: "*", meaning: "Any value" },
    { char: ",", meaning: "Value list separator (1,3,5)" },
    { char: "-", meaning: "Range of values (1-5)" },
    { char: "/", meaning: "Step values (*/15 = every 15)" }
  ]
};

const naturalLanguagePatterns = [
  { phrase: "at 8am", result: "0 8 * * *" },
  { phrase: "at 3pm", result: "0 15 * * *" },
  { phrase: "every hour", result: "0 * * * *" },
  { phrase: "every 30 minutes", result: "*/30 * * * *" },
  { phrase: "daily at midnight", result: "0 0 * * *" },
  { phrase: "every weekday at 9", result: "0 9 * * 1-5" },
  { phrase: "every monday at 10am", result: "0 10 * * 1" },
  { phrase: "first of month at 8am", result: "0 8 1 * *" },
  { phrase: "every 15 minutes", result: "*/15 * * * *" },
  { phrase: "at 6pm on weekdays", result: "0 18 * * 1-5" }
];

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "cron" | "tasks">("overview");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <Calendar size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Automation & Scheduling
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Schedule <span className="text-white/20">Tasks</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Cron-based task scheduling system that runs as a background service. Source: src/service/scheduler.js, src/service/task-queue.js, src/service/service-main.js
        </p>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 text-center">
            <CalendarClock size={32} className="mx-auto mb-4 text-sky-400" />
            <h3 className="text-3xl font-black text-sky-400">∞</h3>
            <p className="text-sm text-white/50">Scheduled Tasks</p>
          </div>
          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 text-center">
            <Repeat size={32} className="mx-auto mb-4 text-purple-400" />
            <h3 className="text-3xl font-black text-purple-400">12+</h3>
            <p className="text-sm text-white/50">Cron Presets</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <Server size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">24/7</h3>
            <p className="text-sm text-white/50">Background Service</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <Bell size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-3xl font-black text-amber-400">Multi</h3>
            <p className="text-sm text-white/50">Notification Channels</p>
          </div>
        </div>
      </motion.section>

      {/* Architecture Overview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Architecture
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Architecture <span className="text-white/20">Overview</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            The background service runs independently of the browser, ensuring tasks execute
            even when you're not actively using the application.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-12 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="flex flex-col items-center gap-4">
            {/* Service Layer */}
            <div className="w-full max-w-4xl rounded-xl border border-sky-500/30 bg-sky-500/10 p-6 text-center">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Server size={20} className="text-sky-400" />
                <h3 className="font-black uppercase tracking-wider">Background Service (comet-ai-service)</h3>
              </div>
              <p className="text-sm text-white/50">Runs as system process • ~30-50MB RAM • System tray only</p>
            </div>

            {/* Arrow */}
            <div className="flex h-8 w-0.5 items-center justify-center">
              <div className="h-full w-full bg-gradient-to-b from-sky-500/50 to-purple-500/50" />
            </div>

            {/* Components Grid */}
            <div className="grid w-full max-w-4xl grid-cols-3 gap-4">
              {[
                { icon: Calendar, name: "Task Scheduler", desc: "Cron expressions" },
                { icon: Database, name: "Task Queue", desc: "Priority + retries" },
                { icon: Bell, name: "Notifications", desc: "Desktop + Mobile" }
              ].map((item) => (
                <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <item.icon size={24} className="mx-auto mb-2 text-purple-400" />
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex h-8 w-0.5 items-center justify-center">
              <div className="h-full w-full bg-gradient-to-b from-purple-500/50 to-amber-500/50" />
            </div>

            {/* Model & Storage */}
            <div className="grid w-full max-w-4xl grid-cols-2 gap-4">
              {[
                { icon: Key, name: "Model Selector", desc: "Ollama / Cloud AI" },
                { icon: Download, name: "Storage Manager", desc: "~/Documents/Aartiq/" }
              ].map((item) => (
                <div key={item.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                  <item.icon size={24} className="mx-auto mb-2 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Component Cards */}
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {architectureComponents.map((component, i) => (
            <motion.div
              key={component.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 transition-all hover:border-sky-500/30 hover:bg-sky-500/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 shadow-lg transition-transform group-hover:scale-110">
                <component.icon size={28} />
              </div>
              <h3 className="mb-3 text-xl font-black uppercase tracking-wider">{component.name}</h3>
              <p className="mb-2 text-sm text-white/50">{component.description}</p>
              <p className="mb-4 text-xs text-sky-400/60 font-mono">{component.source}</p>
              <ul className="space-y-2">
                {component.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-xs text-white/40">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-12 flex gap-4">
          {([
            { id: "overview", label: "Task Types", icon: Workflow },
            { id: "cron", label: "Cron Guide", icon: Timer },
            { id: "tasks", label: "Example Tasks", icon: CalendarDays }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-full px-8 py-4 text-sm font-black uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-sky-500 text-black"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: Task Types */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid gap-8 lg:grid-cols-2">
              {taskTypes.map((taskType, i) => (
                <motion.div
                  key={taskType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-[2rem] border ${taskType.borderColor} bg-gradient-to-br ${taskType.color} p-10`}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 ${taskType.iconColor}`}>
                      <taskType.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-wider">{taskType.name}</h3>
                      <p className="text-sm text-white/50">{taskType.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-white/40">Example Use Cases</h4>
                    <ul className="space-y-2">
                      {taskType.examples.map((example, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                          <ArrowRight size={14} className={`mt-1 shrink-0 ${taskType.iconColor}`} />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-xs font-black uppercase tracking-wider text-white/40">Workflow</h4>
                    <div className="space-y-2">
                      {taskType.workflow.map((step, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${taskType.iconColor.replace('text-', 'bg-')}/20 ${taskType.iconColor}`}>
                            {j + 1}
                          </span>
                          <span className="text-sm text-white/50">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Cron Guide */}
        {activeTab === "cron" && (
          <div className="space-y-8">
            {/* Cron Syntax */}
            <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
              <h3 className="mb-6 text-2xl font-black uppercase tracking-wider">Cron Expression Format</h3>
              <p className="mb-8 text-white/50">
                Cron expressions consist of 5 fields separated by spaces, representing minute, hour, day of month, month, and day of week.
              </p>

              <pre className="mb-8 overflow-x-auto rounded-xl bg-black/40 p-6 font-mono text-sm text-sky-400">
                {cronSyntax.format}
              </pre>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-lg font-black uppercase tracking-wider">Field Values</h4>
                  <div className="space-y-2">
                    {cronSyntax.fields.map((field) => (
                      <div key={field.name} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <div>
                          <span className="font-bold text-white">{field.name}</span>
                          <span className="ml-2 text-xs text-white/40">({field.values})</span>
                        </div>
                        <code className="text-xs text-sky-400">{field.allowed}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-black uppercase tracking-wider">Special Characters</h4>
                  <div className="space-y-2">
                    {cronSyntax.specialChars.map((char) => (
                      <div key={char.char} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <code className="rounded bg-sky-500/10 px-2 py-1 text-lg font-bold text-sky-400">{char.char}</code>
                        <span className="text-sm text-white/50">{char.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Natural Language to Cron */}
            <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
              <h3 className="mb-6 text-2xl font-black uppercase tracking-wider">Natural Language to Cron</h3>
              <p className="mb-8 text-white/50">
                When you tell the AI to schedule something, it automatically converts your words into cron expressions.
              </p>

              <div className="space-y-3">
                {naturalLanguagePatterns.map((pattern, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="rounded-lg bg-white/5 px-3 py-1 text-sm text-white/60">"{pattern.phrase}"</span>
                      <ArrowRight size={16} className="text-white/30" />
                    </div>
                    <div className="flex items-center gap-3">
                      <code className="rounded bg-sky-500/10 px-3 py-1 font-mono text-sm text-sky-400">
                        {pattern.result}
                      </code>
                      <button
                        onClick={() => copyToClipboard(pattern.result)}
                        className="rounded-lg p-2 text-white/30 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {showCopied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Presets */}
            <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
              <h3 className="mb-6 text-2xl font-black uppercase tracking-wider">Quick Presets</h3>
              <p className="mb-8 text-white/50">
                Common scheduling patterns you can use directly.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cronPresets.map((preset, i) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      copyToClipboard(preset.expression);
                      setSelectedPreset(preset.expression);
                    }}
                    className={`rounded-xl border p-6 text-left transition-all ${
                      selectedPreset === preset.expression
                        ? "border-sky-500 bg-sky-500/10"
                        : "border-white/5 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <h4 className="mb-2 font-bold text-white">{preset.name}</h4>
                    <code className="text-sm text-sky-400">{preset.expression}</code>
                    <p className="mt-2 text-xs text-white/40">{preset.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Example Tasks */}
        {activeTab === "tasks" && (
          <div className="space-y-8">
            {/* Morning Briefing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2rem] border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <Sun size={24} className="text-amber-400" />
                    <h3 className="text-2xl font-black uppercase tracking-wider">Morning Briefing</h3>
                  </div>
                  <p className="text-white/50">Daily summary of your schedule, weather, and top news</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-4 py-2 text-xs font-black uppercase text-amber-400">
                  Daily @ 7 AM
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Terminal size={14} /> Scheduling Command
                  </h4>
                  <p className="font-mono text-sm text-white/60">
                    "Schedule a daily briefing every morning at 7am that includes the weather, 
                    my calendar for today, and the top 5 tech news stories"
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <FileText size={14} /> Output
                  </h4>
                  <p className="text-sm text-white/60">
                    Generates a beautifully formatted PDF briefing with weather, calendar events, 
                    and curated news. Saved to ~/Documents/Aartiq/Briefings/
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stock Monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-[2rem] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <Globe size={24} className="text-emerald-400" />
                    <h3 className="text-2xl font-black uppercase tracking-wider">Stock Price Alerts</h3>
                  </div>
                  <p className="text-white/50">Monitor stock prices and get notified on significant changes</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase text-emerald-400">
                  Every 15 min
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Terminal size={14} /> Scheduling Command
                  </h4>
                  <p className="font-mono text-sm text-white/60">
                    "Every 15 minutes, check the stock prices of AAPL, GOOGL, and MSFT. 
                    Alert me on my phone if any stock moves more than 3%"
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Bell size={14} /> Notification Flow
                  </h4>
                  <p className="text-sm text-white/60">
                    Desktop notification shows current prices. If threshold exceeded, 
                    push notification sent to mobile app with the percentage change.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Weekly Report */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[2rem] border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <CalendarDays size={24} className="text-purple-400" />
                    <h3 className="text-2xl font-black uppercase tracking-wider">Weekly Team Report</h3>
                  </div>
                  <p className="text-white/50">Aggregate metrics and generate a shareable PDF report</p>
                </div>
                <span className="rounded-full bg-purple-500/10 px-4 py-2 text-xs font-black uppercase text-purple-400">
                  Mondays @ 9 AM
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Terminal size={14} /> Scheduling Command
                  </h4>
                  <p className="font-mono text-sm text-white/60">
                    "Every Monday at 9am, generate a weekly report with GitHub commits, 
                    project metrics, and team accomplishments. Save as PDF and email to the team"
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Mail size={14} /> Output
                  </h4>
                  <p className="text-sm text-white/60">
                    Multi-page PDF with charts, commit history, and highlights. 
                    Automatically emailed to configured recipients via SMTP.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Data Backup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[2rem] border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <RefreshCw size={24} className="text-sky-400" />
                    <h3 className="text-2xl font-black uppercase tracking-wider">Automated Backups</h3>
                  </div>
                  <p className="text-white/50">Run backup scripts and verify completion</p>
                </div>
                <span className="rounded-full bg-sky-500/10 px-4 py-2 text-xs font-black uppercase text-sky-400">
                  Daily @ 2 AM
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <Terminal size={14} /> Scheduling Command
                  </h4>
                  <p className="font-mono text-sm text-white/60">
                    "Run my backup script every night at 2am. Verify the backup completed 
                    successfully and notify me if it failed"
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-white/40">
                    <CheckCircle2 size={14} /> Verification Steps
                  </h4>
                  <p className="text-sm text-white/60">
                    Script output is captured and analyzed. Success: silent operation. 
                    Failure: immediate notification with error details.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.section>

      {/* Sleep/Wake Handler */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Sleep/Wake Handling
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Sleep/Wake <span className="text-white/20">Recovery</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Moon size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">When System Sleeps</h3>
            <p className="mb-6 text-white/50">
              The background service detects when your computer enters sleep mode and preserves 
              the state of all scheduled tasks.
            </p>
            <ul className="space-y-3">
              {[
                "Current task states are saved to disk",
                "Last check time is recorded",
                "All cron jobs are paused",
                "Pending queue is persisted"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Sun size={40} className="mb-6 text-amber-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">When System Wakes</h3>
            <p className="mb-6 text-white/50">
              After wake, the service automatically catches up on any tasks that were missed 
              during the sleep period.
            </p>
            <ul className="space-y-3">
              {[
                "Waits 2 seconds for system stability",
                "Checks all tasks for missed executions",
                "Runs catch-up for tasks due during sleep",
                "Reschedules all active cron jobs"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Mobile Integration */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Mobile Integration
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Mobile <span className="text-white/20">Access</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <div className="mb-6 flex items-center gap-4">
              <Smartphone size={40} className="text-sky-400" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wider">Mobile App Features</h3>
                <p className="text-sm text-white/50">View and manage tasks from your phone</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: Calendar, title: "Task List", desc: "View all scheduled tasks with status" },
                { icon: Play, title: "Run Now", desc: "Trigger any task immediately" },
                { icon: Pause, title: "Pause/Resume", desc: "Toggle tasks without deleting" },
                { icon: Bell, title: "Notifications", desc: "Receive push alerts on completion" },
                { icon: FileText, title: "View PDFs", desc: "Open generated PDFs in-app" },
                { icon: Share2, title: "Share Files", desc: "Send outputs via share sheet" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <feature.icon size={20} className="text-sky-400" />
                  <div>
                    <h4 className="font-bold text-white">{feature.title}</h4>
                    <p className="text-xs text-white/40">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <div className="mb-6 flex items-center gap-4">
              <Download size={40} className="text-emerald-400" />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wider">PDF Sync</h3>
                <p className="text-sm text-white/50">Generated files available on mobile</p>
              </div>
            </div>

            <div className="mb-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-sm text-white/60">
                When the background service generates a PDF, it's automatically synced to your 
                mobile device via the WiFi Sync connection. Open PDFs directly in the app or 
                share them to other apps.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "PDFs stored in ~/Documents/Aartiq/",
                "Synced over local WiFi connection",
                "Available offline after first sync",
                "Built-in PDF viewer with zoom/scroll"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/60">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}