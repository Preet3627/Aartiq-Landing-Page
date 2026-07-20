"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Apple,
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
  Smartphone,
  Globe,
  Sparkles,
  AlertCircle
} from "lucide-react";

const features = [
  {
    id: "apple-intelligence",
    name: "Apple Intelligence",
    icon: Sparkles,
    fileRef: "src/lib/native-panels/",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    description: "Leverage Apple's on-device AI for summaries, image generation, and genmoji creation directly from Aartiq.",
    requirements: [
      "macOS 15.0 or later",
      "Apple Silicon or M-series chip",
      "Apple Intelligence enabled in Settings"
    ],
    features: [
      { name: "Text Summarization", desc: "Generate concise summaries of long content" },
      { name: "Image Generation", desc: "Create images from natural language prompts" },
      { name: "Genmoji", desc: "Create custom emoji from descriptions" },
      { name: "Writing Tools", desc: "Proofread, rewrite, and compose text" },
      { name: "Priority Notifications", desc: "AI-powered notification summary" }
    ],
    examples: [
      { title: "Summarize Article", prompt: "Summarize this article in 3 bullet points", command: "Summarize: {content}" },
      { title: "Generate Image", prompt: "Create an image of a futuristic city at sunset", command: "Generate Image: {prompt}" },
      { title: "Create Genmoji", prompt: "Create a genmoji of a robot chef", command: "Genmoji: {description}" }
    ]
  },
  {
    id: "siri-integration",
    name: "Siri Integration",
    icon: Mic,
    fileRef: "src/lib/SiriShortcutsIntegration.ts",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    description: "Control Aartiq hands-free using Siri voice commands. Trigger actions from anywhere on your Mac.",
    phrases: [
      { phrase: "Ask Aartiq [prompt]", desc: "Send a question to the AI chat" },
      { phrase: "What did Aartiq say?", desc: "Read the latest AI response aloud" },
      { phrase: "Refine Aartiq's response to be [style]", desc: "Iteratively improve AI output" },
      { phrase: "List my conversations in Aartiq", desc: "Show recent chat sessions" },
      { phrase: "Regenerate Aartiq's response", desc: "Try a different version of the answer" },
      { phrase: "Summarize this page with Aartiq", desc: "Voice-triggered page summarization" },
      { phrase: "New chat in Aartiq", desc: "Start a fresh conversation" },
      { phrase: "Run [command] in Aartiq", desc: "Execute a terminal command" },
      { phrase: "Search [query] with Aartiq", desc: "Perform a smart web search" },
      { phrase: "Reset Aartiq chat", desc: "Clear current context" }
    ],
    workflows: [
      "Siri recognizes Aartiq native AppIntent",
      "Polls bridge server for generation status",
      "Waits for complete AI response (polling)",
      "Attributes content to Aartiq per HIG",
      "Speaks or displays response to user"
    ]
  },
  {
    id: "apple-shortcuts",
    name: "Apple Shortcuts",
    icon: Command,
    fileRef: "src/lib/SiriShortcutsIntegration.ts",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description: "Access Aartiq actions directly from the Shortcuts app. Build custom workflows with pre-configured shortcuts.",
    urlScheme: "aartiq://",
    actions: [
      {
        name: "Chat Message",
        url: "aartiq://chat",
        params: [{ name: "message", required: true, desc: "The message to send to AI" }],
        example: "aartiq://chat?message=Tell%20me%20a%20joke"
      },
      {
        name: "Smart Search",
        url: "aartiq://search",
        params: [{ name: "query", required: true, desc: "Search query" }],
        example: "aartiq://search?query=latest%20AI%20news"
      },
      {
        name: "Create PDF",
        url: "aartiq://create-pdf",
        params: [
          { name: "content", required: true, desc: "Content for the PDF" },
          { name: "title", required: false, desc: "Document title" }
        ],
        example: "aartiq://create-pdf?content=Hello%20World&title=My%20Document"
      },
      {
        name: "Navigate",
        url: "aartiq://navigate",
        params: [{ name: "url", required: true, desc: "URL to open" }],
        example: "aartiq://navigate?url=https://example.com"
      },
      {
        name: "Run Command",
        url: "aartiq://run-command",
        params: [
          { name: "command", required: true, desc: "Terminal command to execute" },
          { name: "confirm", required: false, desc: "Auto-confirm (true/false)" }
        ],
        example: "aartiq://run-command?command=ls%20-la&confirm=true"
      },
      {
        name: "Schedule Task",
        url: "aartiq://schedule",
        params: [
          { name: "task", required: true, desc: "Task description" },
          { name: "cron", required: true, desc: "Cron expression" }
        ],
        example: "aartiq://schedule?task=Generate%20report&cron=0%208%20*%20*"
      },
      {
        name: "Set Volume",
        url: "aartiq://volume",
        params: [{ name: "level", required: true, desc: "Volume level (0-100)" }],
        example: "aartiq://volume?level=50"
      },
      {
        name: "Open App",
        url: "aartiq://open-app",
        params: [{ name: "appName", required: true, desc: "Application name" }],
        example: "aartiq://open-app?appName=Safari"
      },
      {
        name: "Capture Screenshot",
        url: "aartiq://screenshot",
        params: [],
        example: "aartiq://screenshot"
      },
      {
        name: "Smart Web Search",
        url: "aartiq://search",
        params: [{ name: "query", required: true, desc: "Search query" }],
        example: "aartiq://search?query=latest%20AI%20news"
      },
      {
        name: "Switch AI Model",
        url: "aartiq://set-model",
        params: [{ name: "model", required: true, desc: "Model name (GPT-4, etc)" }],
        example: "aartiq://set-model?model=GPT-4"
      },
      {
        name: "Create Document",
        url: "aartiq://create-doc",
        params: [
          { name: "format", required: true, desc: "pdf, xlsx, or pptx" },
          { name: "topic", required: true, desc: "Document topic" }
        ],
        example: "aartiq://create-doc?format=pdf&topic=Project%20Update"
      }
    ],
    setup: [
      "Open Shortcuts app on your Mac",
      "Create a new shortcut",
      "Add 'Open URL' action",
      "Enter aartiq:// URL with parameters",
      "Save and customize the shortcut"
    ]
  },
  {
    id: "voice-control",
    name: "Voice Control",
    icon: Volume2,
    fileRef: "src/lib/platform/macOSIntegration.ts",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    description: "Use macOS dictation for voice input and text-to-speech for AI responses.",
    features: [
      {
        name: "Dictation Input",
        desc: "Speak naturally and have your words converted to text",
        usage: "cmd+d to activate macOS dictation"
      },
      {
        name: "Text-to-Speech",
        desc: "Hear AI responses spoken aloud",
        usage: "Add ?speak=true to any URL action"
      },
      {
        name: "Voice Selection",
        desc: "Choose from default macOS voices",
        usage: "Configure in Settings > Accessibility > Speech"
      },
      {
        name: "Speech Rate",
        desc: "Adjust speaking speed",
        usage: "Set rate in System Preferences"
      },
      {
        name: "Continuous Voice",
        desc: "Keep voice mode open for multiple exchanges",
        usage: "Use voice-chat URL action"
      }
    ],
    commands: [
      { action: "Dictation", trigger: "Command+D", usage: "Activate voice input" },
      { action: "Stop Listening", trigger: "Escape", usage: "Exit voice mode" },
      { action: "Voice Response", trigger: "?speak=true", usage: "Speak AI response" },
      { action: "Select Voice", trigger: "?voice=Samantha", usage: "Choose voice" }
    ]
  },
  {
    id: "raycast-integration",
    name: "Raycast Integration",
    icon: Command,
    fileRef: null,
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    description: "Extend Raycast with Aartiq commands. Access AI features directly from the Raycast command bar.",
    extensions: [
      {
        name: "AI Chat",
        desc: "Quickly send a message to Aartiq",
        trigger: "ai {message}",
        icon: Bot
      },
      {
        name: "Search",
        desc: "Perform AI-powered web search",
        trigger: "search {query}",
        icon: Search
      },
      {
        name: "Create PDF",
        desc: "Generate a new PDF document",
        trigger: "pdf {title}",
        icon: FileText
      },
      {
        name: "Screenshot",
        desc: "Take a screenshot through Raycast",
        trigger: "screenshot",
        icon: Camera
      },
      {
        name: "Volume Control",
        desc: "Quickly adjust volume",
        trigger: "volume {0-100}",
        icon: Volume2
      },
      {
        name: "Open App",
        desc: "Launch applications",
        trigger: "open {app name}",
        icon: AppWindow
      },
      {
        name: "Schedule Task",
        desc: "Quickly schedule automation",
        trigger: "schedule {task} at {time}",
        icon: Calendar
      },
      {
        name: "Terminal",
        desc: "Run shell commands",
        trigger: "run {command}",
        icon: Terminal
      }
    ],
    setup: [
      "Download the Aartiq extension from Raycast Store",
      "Grant necessary permissions",
      "Configure API keys in extension settings",
      "Start using /ai commands"
    ]
  }
];

const codeExamples = {
  appleIntelligence: `# Check Apple Intelligence availability
const status = await window.electron.invoke('apple-intelligence-status');
console.log(status);
// {
//   supported: true,
//   enabled: true,
//   ready: true,
//   model: 'on-device-foundation'
// }

// Generate a summary
const summary = await window.electron.invoke('apple-intelligence-summary', {
  text: 'Long article content here...',
  format: 'bullets'
});
console.log(summary.result);

// Generate an image
const image = await window.electron.invoke('apple-intelligence-generate-image', {
  prompt: 'A futuristic city at sunset'
});
// Returns base64 encoded image`,

  siriPhrases: `// Siri Phrases available:
// Siri Phrases & App Intents (v0.3.0+):
// "Ask Aartiq [prompt]"
// "What did Aartiq say?" (Reads latest response)
// "Refine Aartiq's response to be shorter/longer"
// "List my conversations in Aartiq"
// "Regenerate Aartiq's response"
// "Summarize this page with Aartiq"
// "New chat in Aartiq"
// "Run [command] in Aartiq"
// "Reset Aartiq chat"
// "Open my [Name] conversation in Aartiq"
// "Search [query] with Aartiq"`,

  urlScheme: `# Apple Shortcuts URL Schemes
// Chat message
aartiq://chat?message=Hello%20AI

// Smart search
aartiq://search?query=latest%20tech%20news

// Create PDF
aartiq://create-pdf?content=Report%20content&title=My%20Report

// Navigate to URL
aartiq://navigate?url=https://example.com

// Run terminal command
aartiq://run-command?command=ls%20-la&confirm=true

// Schedule task
aartiq://schedule?task=Daily%20brief&cron=0%208%20*%20*

// Set volume (0-100)
aartiq://volume?level=75

// Open application
aartiq://open-app?appName=Safari

// Capture screenshot (Saves to Downloads)
aartiq://screenshot

// Smart web search (AI-powered)
aartiq://search?query=latest%20AI%20news

// Switch AI model
aartiq://set-model?model=GPT-4

// Create Document (PDF/XLSX/PPTX)
aartiq://create-doc?format=xlsx&topic=Stock%20Market%20Analysis`,

  voiceControl: `# Voice input via AppleScript
async function startDictation() {
  const result = await window.electron.invoke('applescript:dictation');
  return result; // Returns transcribed text
}

// Text-to-speech output
async function speakResponse(text) {
  await window.electron.invoke('applescript:speak', {
    text: text,
    rate: 180, // Words per minute
    voice: 'Samantha'
  });
}

// Get available voices
const voices = await window.electron.invoke('applescript:get-voices');
console.log(voices);
// ['Alex', 'Ava', 'Fred', 'Grace', 'Samantha', ...]

// Configure continuous voice chat
async function startVoiceChat() {
  // Opens interactive voice mode
  await window.electron.invoke('ai:voice-chat');
}`,

  raycast: `# Raycast extension commands
// Install Aartiq extension from Raycast Store
// Then use these commands:

/ai Tell me a joke

/search latest AI news

/pdf Daily Report

/screenshot

/volume 75

/open Safari

/schedule Generate report at 8am

/run ls -la

// Custom Raycast script
import { launchCommand, launchApp } from "@raycast/api";
import { open } from "aartiq";

await launchCommand({
  name: "Chat",
  arguments: { message: "Hello from Raycast!" }
});

// Or use aartiq:// URL
open("aartiq://chat?message=Hello%20AI")`,
};

export default function AppleIntegrationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-24 bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <Apple size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Apple Integration
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Apple <span className="text-white/20">Integration</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          macOS-specific integration layer bridging Aartiq with Apple Intelligence, Siri, Shortcuts,
          and Voice Control. The orchestrator lives in
          <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/lib/platform/macOSIntegration.ts</code>
          with native SwiftUI panels in
          <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/lib/native-panels/</code>.
        </p>
      </motion.section>

      {/* Feature Cards Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className={`group block rounded-[40px] border ${feature.borderColor} bg-gradient-to-br ${feature.color} p-10 transition-all hover:scale-[1.02] hover:shadow-2xl cursor-pointer`}
                onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
              >
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/5 ${feature.iconColor} shadow-lg`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="mb-4 text-xl font-black uppercase tracking-wider">{feature.name}</h3>
                <p className="mb-4 text-sm font-medium leading-relaxed text-white/50">{feature.description}</p>
                {feature.fileRef && (
                  <p className="font-mono text-[10px] text-white/20">{feature.fileRef}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Apple Intelligence */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="mb-12">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            macOS Native AI
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Apple <span className="text-white/20">Intelligence</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/40">
            Aartiq integrates with Apple's on-device AI capabilities on supported Macs.
            The native Swift bridge handles readiness checks, summarization, and image generation.
            Source: <code className="rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/lib/native-panels/AppleIntelligenceBridge.swift</code>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
            <h3 className="mb-6 text-xl font-black uppercase tracking-wider">Requirements</h3>
            <ul className="space-y-3">
              {features[0].requirements?.map((req, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
            <h3 className="mb-6 text-xl font-black uppercase tracking-wider">Available Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features[0].features?.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <ChevronRight size={14} className="mt-0.5 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">{f.name}</p>
                    <p className="text-xs text-white/40">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider">Code Example</h3>
            <button
              onClick={() => copyCode(codeExamples.appleIntelligence, "ai-code")}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-bold text-white/60 transition-colors hover:bg-white/10"
            >
              {copiedCode === "ai-code" ? (
                <><Check size={14} className="text-emerald-400" /> Copied!</>
              ) : (
                <><Copy size={14} /> Copy</>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-black/40 p-6 font-mono text-sm text-white/80">
            <code>{codeExamples.appleIntelligence}</code>
          </pre>
        </div>
      </motion.section>

      {/* Siri Integration */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-12">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Voice Commands
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Siri <span className="text-white/20">Integration</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/40">
            App Intents bridge allowing Siri to trigger Aartiq actions. Handlers defined in
            <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/lib/SiriShortcutsIntegration.ts</code>.
            Use natural voice commands from anywhere on your Mac.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 mb-6">
          <h3 className="mb-6 text-xl font-black uppercase tracking-wider">Available Siri Phrases</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {features[1].phrases?.map((phrase, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <Mic size={16} className="mt-0.5 text-purple-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">&ldquo;{phrase.phrase}&rdquo;</p>
                  <p className="text-xs text-white/40">{phrase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <h3 className="mb-6 text-xl font-black uppercase tracking-wider">How It Works</h3>
          <div className="flex flex-wrap items-center gap-3">
            {features[1].workflows?.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-sm font-black text-purple-400">
                  {i + 1}
                </div>
                <span className="text-sm text-white/50">{step}</span>
                {features[1].workflows && i < features[1].workflows.length - 1 && (
                  <ChevronRight size={16} className="text-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-wider">Siri Phrases Reference</h3>
            <button
              onClick={() => copyCode(codeExamples.siriPhrases, "siri-code")}
              className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-bold text-white/60 transition-colors hover:bg-white/10"
            >
              {copiedCode === "siri-code" ? (
                <><Check size={14} className="text-emerald-400" /> Copied!</>
              ) : (
                <><Copy size={14} /> Copy</>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-xl bg-black/40 p-6 font-mono text-sm text-white/80">
            <code>{codeExamples.siriPhrases}</code>
          </pre>
        </div>
      </motion.section>

      {/* Apple Shortcuts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="mb-12">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            URL Scheme
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Apple <span className="text-white/20">Shortcuts</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-white/40">
            The aartiq:// URL scheme enables integration with Apple Shortcuts. Route definitions
            are in
            <code className="mx-1 rounded bg-white/5 px-2 py-0.5 font-mono text-sm">src/lib/SiriShortcutsIntegration.ts</code>.
            Build automation workflows combining Aartiq with other apps.
          </p>
        </div>

      </motion.section>
    </div>
  );
}
