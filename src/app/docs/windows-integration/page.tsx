"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Monitor,
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
  ExternalLink,
  Cog
} from "lucide-react";

const CodeBlock = ({ code, language = "bash" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
        <span className="text-xs text-slate-400 font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-200 leading-relaxed">{code}</code>
      </pre>
    </div>
  );
};

const ParameterTable = ({ 
  params 
}: { 
  params: { name: string; required: boolean; type: string; desc: string }[] 
}) => (
  <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-700/50 bg-slate-800/30">
          <th className="px-4 py-3 text-left text-slate-300 font-semibold">Parameter</th>
          <th className="px-4 py-3 text-left text-slate-300 font-semibold">Type</th>
          <th className="px-4 py-3 text-left text-slate-300 font-semibold">Required</th>
          <th className="px-4 py-3 text-left text-slate-300 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param, idx) => (
          <tr key={idx} className="border-b border-slate-700/30 last:border-0">
            <td className="px-4 py-3 font-mono text-blue-400">{param.name}</td>
            <td className="px-4 py-3 text-slate-400">{param.type}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                param.required 
                  ? "bg-amber-500/20 text-amber-400" 
                  : "bg-slate-700/50 text-slate-400"
              }`}>
                {param.required ? "Required" : "Optional"}
              </span>
            </td>
            <td className="px-4 py-3 text-slate-300">{param.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const windowsActions = [
  {
    name: "AI Chat",
    url: "aartiq://chat",
    description: "Send a message to the AI assistant for processing",
    params: [
      { name: "message", required: true, type: "string", desc: "The message to send to AI" },
      { name: "stream", required: false, type: "boolean", desc: "Enable streaming response" }
    ],
    example: "aartiq://chat?message=Explain%20quantum%20computing&stream=true"
  },
  {
    name: "Smart Search",
    url: "aartiq://search",
    description: "Perform a web search with AI-powered results",
    params: [
      { name: "query", required: true, type: "string", desc: "Search query" },
      { name: "safe", required: false, type: "boolean", desc: "Safe search (default: true)" }
    ],
    example: "aartiq://search?query=Windows%2012%20features&safe=true"
  },
  {
    name: "Create PDF",
    url: "aartiq://create-pdf",
    description: "Generate a PDF document with customizable templates",
    params: [
      { name: "content", required: true, type: "string", desc: "Content for the PDF" },
      { name: "title", required: false, type: "string", desc: "Document title" },
      { name: "template", required: false, type: "string", desc: "Template: professional, executive, academic, minimalist, dark" }
    ],
    example: "aartiq://create-pdf?content=Hello%20World&title=My%20Report&template=professional"
  },
  {
    name: "Navigate",
    url: "aartiq://navigate",
    description: "Open a URL in the Aartiq browser",
    params: [
      { name: "url", required: true, type: "string", desc: "URL to open" },
      { name: "newTab", required: false, type: "boolean", desc: "Open in new tab" }
    ],
    example: "aartiq://navigate?url=https://github.com&newTab=true"
  },
  {
    name: "Run Command",
    url: "aartiq://run-command",
    description: "Execute a PowerShell or CMD command",
    params: [
      { name: "command", required: true, type: "string", desc: "Command to execute" },
      { name: "shell", required: false, type: "string", desc: "Shell: powershell, cmd, pwsh" },
      { name: "confirm", required: false, type: "boolean", desc: "Skip confirmation" }
    ],
    example: "aartiq://run-command?command=Get-Process&shell=powershell&confirm=true"
  },
  {
    name: "Schedule Task",
    url: "aartiq://schedule",
    description: "Schedule an automation task with cron expression",
    params: [
      { name: "task", required: true, type: "string", desc: "Task description" },
      { name: "cron", required: true, type: "string", desc: "Cron expression" },
      { name: "action", required: true, type: "string", desc: "Action type: pdf, search, chat, scrape" }
    ],
    example: "aartiq://schedule?task=Daily%20report&cron=0%208%20*%20*&action=pdf"
  },
  {
    name: "Set Volume",
    url: "aartiq://volume",
    description: "Adjust system volume level",
    params: [
      { name: "level", required: true, type: "number", desc: "Volume level (0-100)" },
      { name: "mute", required: false, type: "boolean", desc: "Mute/unmute" }
    ],
    example: "aartiq://volume?level=75&mute=false"
  },
  {
    name: "Open App",
    url: "aartiq://open-app",
    description: "Launch a Windows application",
    params: [
      { name: "appName", required: true, type: "string", desc: "Application name or path" },
      { name: "args", required: false, type: "string", desc: "Command line arguments" }
    ],
    example: "aartiq://open-app?appName=notepad&args=c:\\temp\\notes.txt"
  },
  {
    name: "Screenshot",
    url: "aartiq://screenshot",
    description: "Capture a screenshot of the screen or window",
    params: [
      { name: "mode", required: false, type: "string", desc: "full, window, region" },
      { name: "save", required: false, type: "boolean", desc: "Save to file" }
    ],
    example: "aartiq://screenshot?mode=region&save=true"
  },
  {
    name: "Ask & Speak",
    url: "aartiq://ask-ai",
    description: "Ask AI and get spoken audio response",
    params: [
      { name: "prompt", required: true, type: "string", desc: "Question or prompt" },
      { name: "speak", required: false, type: "boolean", desc: "Speak the response" },
      { name: "voice", required: false, type: "string", desc: "Voice name (default: David)" }
    ],
    example: "aartiq://ask-ai?prompt=What%20is%20the%20weather&speak=true&voice=David"
  },
  {
    name: "Copilot Query",
    url: "aartiq://copilot",
    description: "Send query to Microsoft Copilot and get response",
    params: [
      { name: "prompt", required: true, type: "string", desc: "Query for Copilot" },
      { name: "mode", required: false, type: "string", desc: "creative, balanced, precise" }
    ],
    example: "aartiq://copilot?prompt=Help%20me%20write%20a%20function&mode=precise"
  },
  {
    name: "OCR Scan",
    url: "aartiq://ocr",
    description: "Perform OCR on screen region or image",
    params: [
      { name: "mode", required: false, type: "string", desc: "screen, clipboard, file" },
      { name: "lang", required: false, type: "string", desc: "Language code (eng, spa, fra, etc.)" }
    ],
    example: "aartiq://ocr?mode=screen&lang=eng"
  }
];

const voiceCommands = [
  { phrase: "Hey Comet, ask about...", description: "Send a question to AI", example: "Hey Comet, ask about machine learning" },
  { phrase: "Hey Comet, search for...", description: "Perform a web search", example: "Hey Comet, search for Windows 12 release date" },
  { phrase: "Hey Comet, create PDF", description: "Generate a PDF document", example: "Hey Comet, create PDF with my meeting notes" },
  { phrase: "Hey Comet, run command...", description: "Execute a PowerShell command", example: "Hey Comet, run command Get-EventLog" },
  { phrase: "Hey Comet, schedule...", description: "Schedule a task", example: "Hey Comet, schedule daily report at 8am" },
  { phrase: "Hey Comet, set volume to...", description: "Adjust system volume", example: "Hey Comet, set volume to 50 percent" },
  { phrase: "Hey Comet, open...", description: "Launch an application", example: "Hey Comet, open Visual Studio Code" },
  { phrase: "Hey Comet, take screenshot", description: "Capture screen", example: "Hey Comet, take screenshot of active window" },
  { phrase: "Hey Comet, speak the answer", description: "Voice chat with AI", example: "Hey Comet, what's the weather? Speak the answer" },
  { phrase: "Hey Comet, ask Copilot...", description: "Query Microsoft Copilot", example: "Hey Comet, ask Copilot to explain async/await" },
  { phrase: "Hey Comet, OCR this", description: "Extract text from screen", example: "Hey Comet, OCR this region" },
  { phrase: "Hey Comet, automate...", description: "Create automation workflow", example: "Hey Comet, automate my backup process" }
];

const copilotActions = [
  { name: "Open Copilot Panel", action: "aartiq://copilot-panel", description: "Open Microsoft Copilot sidebar", shortcut: "Ctrl + Shift + C" },
  { name: "Ask Copilot", action: "Ask a question", description: "Send prompt to Copilot and get response", shortcut: "Copilot + C" },
  { name: "Code Assist", action: "Copilot:explain", description: "Explain selected code with Copilot", shortcut: "Ctrl + Alt + E" },
  { name: "Refactor Code", action: "Copilot:refactor", description: "Refactor selected code", shortcut: "Ctrl + Alt + R" },
  { name: "Generate Tests", action: "Copilot:tests", description: "Generate unit tests", shortcut: "Ctrl + Alt + T" },
  { name: "Document Code", action: "Copilot:doc", description: "Generate documentation", shortcut: "Ctrl + Alt + D" },
  { name: "Chat with Both", action: "aartiq://dual-chat", description: "Chat with both Aartiq and Copilot", shortcut: "Ctrl + D" },
  { name: "Compare Answers", action: "aartiq://compare", description: "Compare Aartiq and Copilot responses", shortcut: "Ctrl + Shift + P" }
];

export default function WindowsIntegrationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "windows-shortcuts", label: "Windows Shortcuts" },
    { id: "voice-control", label: "Voice Control" },
    { id: "copilot-integration", label: "Copilot Integration" },
    { id: "power-automate", label: "Power Automate" },
    { id: "setup-guide", label: "Setup Guide" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-900">
      <div className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Windows Integration</h1>
                <p className="text-sm text-zinc-400">Aartiq for Windows</p>
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
                href="/docs/deep-links"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Deep Links
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
              {sidebarOpen ? <Settings className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
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
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-900/20 border border-zinc-800/50 p-8 md:p-12"
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LjI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500">
                      <Monitor className="w-8 h-8 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium border border-blue-500/30">
                      Windows 10/11
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Windows Integration
                  </h1>
                  <p className="text-xl text-zinc-300 max-w-2xl mb-6">
                    aartiq:// URL scheme handler for Windows 10/11. Source: src/lib/platform/WindowsIntegration.ts.
                    Provides programmatic access to AI chat, web search, PDF generation, shell execution,
                    system control, and Copilot integration.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Zap className="w-4 h-4 text-amber-400" />
                      URL Scheme Handler
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Mic className="w-4 h-4 text-amber-400" />
                      Voice Activation
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Bot className="w-4 h-4 text-amber-400" />
                      Copilot Integration
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 text-sm">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      Power Automate
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Windows Shortcuts */}
            <section id="windows-shortcuts" className="mb-16">
              <motion.div 
                id="windows-shortcuts"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Command className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Windows Shortcuts</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    aartiq:// URL scheme triggered from any Windows application. Source: src/lib/platform/WindowsIntegration.ts.
                    Compatible with Power Automate, Task Scheduler, and other Windows automation tools.
                  </p>
                </div>
              </motion.div>

              <div className="mb-8">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-white">URL Scheme</h3>
                  </div>
                  <code className="text-emerald-400 font-mono text-lg">aartiq://</code>
                  <p className="text-zinc-400 mt-2">
                    Register the URL scheme in Windows Registry to enable deep linking from any application.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                {windowsActions.map((action, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {action.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <p className="text-zinc-400 text-sm mb-4">{action.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">URL Pattern</span>
                      <code className="block mt-1 text-sm font-mono text-emerald-400 bg-zinc-800/50 px-2 py-1.5 rounded-lg overflow-x-auto">
                        {action.url}
                      </code>
                    </div>

                    {action.params.length > 0 && (
                      <div className="mb-4">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Parameters</span>
                        <div className="mt-2 space-y-1.5">
                          {action.params.map((param, pidx) => (
                            <div key={pidx} className="flex items-center gap-2 text-sm">
                              <span className="font-mono text-blue-400">{param.name}</span>
                              {param.required && <span className="text-amber-400 text-xs">*</span>}
                              <span className="text-zinc-500">-</span>
                              <span className="text-zinc-400">{param.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <details className="group/code">
                      <summary className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer flex items-center gap-1">
                        Show Example
                      </summary>
                      <div className="mt-3">
                        <CodeBlock code={action.example} />
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  PowerShell Usage
                </h3>
                <CodeBlock code={`# Open Aartiq with chat message
Start-Process "aartiq://chat?message=Hello%20AI"

# Search with Windows PowerShell
Start-Process "aartiq://search?query=powershell%20tutorials"

# Create PDF
$content = "My Report Content"
Start-Process "aartiq://create-pdf?content=$content&title=Report"

# Run command and get output via HTTP API
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/commands" -Method POST -Body (@{
    action = "chat"
    message = "List running processes"
} | ConvertTo-Json) -ContentType "application/json"

Write-Host $response.Content`} />
              </div>
            </section>

            {/* Voice Control */}
            <section id="voice-control" className="mb-16">
              <motion.div 
                id="voice-control"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Mic className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Windows Voice Control</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Voice control via Windows Speech Recognition and PowerShell TTS. Source: src/lib/platform/WindowsIntegration.ts.
                    Works when the browser window is minimized.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                      <Search className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Speech Recognition</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Windows Speech Recognition or PowerShell speech module to listen for voice commands and trigger Aartiq actions.
                  </p>
                  <CodeBlock code={`# PowerShell Speech Recognition Setup
# Install required module
Install-Module -Name SpeechRecognition -Force

# Import module
Import-Module SpeechRecognition

# Start continuous recognition
Start-SpeechRecognition -Language en-US -Callback {
    param($text, $confidence)
    Write-Host "Heard: $text (Confidence: $confidence%)"
    
    # Map to Aartiq commands
    if ($text -match "ask about (.+)") {
        $query = $matches[1]
        Start-Process "aartiq://chat?message=$query"
    }
    elseif ($text -match "search for (.+)") {
        $query = $matches[1]
        Start-Process "aartiq://search?query=$query"
    }
    elseif ($text -match "create pdf (.+)") {
        $content = $matches[1]
        Start-Process "aartiq://create-pdf?content=$content"
    }
}`} language="powershell" />
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Volume2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Text-to-Speech</h3>
                  </div>
                  <p className="text-zinc-400 mb-4">
                    Aartiq speaks responses using Windows SAPI voices. Select from Microsoft David, Zira, or install additional voices.
                  </p>
                  <CodeBlock code={`# Text-to-Speech with Windows Voices
Add-Type -AssemblyName System.Speech

# Create synthesizer
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# Get available voices
$synth.GetInstalledVoices() | ForEach-Object {
    Write-Host $_.VoiceInfo.Name
}

# Set voice (choose from available)
$synth.SelectVoice("Microsoft David")

# Speak text
$synth.Speak("Hello! I'm Aartiq. How can I help you today?")

# Speak with custom rate and volume
$synth.Rate = 0   # -10 to 10
$synth.Volume = 100  # 0 to 100
$synth.SpeakAsync("This is a voice response from Aartiq")

# Speak and wait for completion
$synth.Speak("Processing complete")`} language="powershell" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-blue-400" />
                  Voice Command Phrases
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {voiceCommands.map((cmd, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30 hover:border-blue-500/20 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                          <Mic className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <code className="text-sm font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">
                            "{cmd.phrase}"
                          </code>
                          <p className="text-zinc-400 text-sm mt-2">{cmd.description}</p>
                          {cmd.example && (
                            <p className="text-zinc-500 text-xs mt-2 font-mono">
                              Example: {cmd.example}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-semibold text-white">Voice Activation Setup</h3>
                </div>
                <p className="text-zinc-400 mb-4">
                  "Hey Comet" wake word detection via VoiceAttack or Windows Speech Recognition.
                </p>
                <CodeBlock code={`# Windows Voice Activation via VoiceAttack
# 1. Download VoiceAttack (free/paid)
# 2. Create new profile
# 3. Add voice command: "Hey Comet"

# In the command action:
# - Execute: External Program
# - Path: "C:\\Program Files\\Aartiq\\comet-ai.exe"
# - Arguments: "aartiq://chat?message={Hwnd}"

# Alternative: Use Windows Speech Recognition
# Enable in Settings > Privacy & Security > Speech

# Create VBS script for wake word detection
Set speechRecognizer = CreateObject("SAPI.SpSharedRecognizer")
Set context = speechRecognizer.CreateRecoContext
Set grammar = context.CreateGrammar("CometCommands")

# Configure the grammar to listen for "Hey Comet"
grammar.DictationSetState 0

Do While True
    ' Wait for speech input
    Sleep(100)
Loop`} language="powershell" />
              </div>
            </section>

            {/* Copilot Integration */}
            <section id="copilot-integration" className="mb-16">
              <motion.div 
                id="copilot-integration"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Microsoft Copilot Integration</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Dual AI workflow between Aartiq and Microsoft Copilot. Source: src/lib/platform/WindowsIntegration.ts.
                    Compare answers, chat with both AI assistants simultaneously, or use Copilot for code-specific tasks.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {copilotActions.map((action, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/60 border border-zinc-700/50 hover:border-purple-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                        <Bot className="w-4 h-4 text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-white">{action.name}</h3>
                    </div>
                    <code className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded block mb-2 w-fit">
                      {action.action}
                    </code>
                    <p className="text-zinc-400 text-sm">{action.description}</p>
                    {action.shortcut && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                        <Keyboard className="w-3 h-3" />
                        <span>{action.shortcut}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Dual AI Workflow
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-blue-400 font-semibold">Aartiq</div>
                    </div>
                    <div className="flex-1 text-zinc-300">
                      General AI tasks, document creation, web automation, scheduling,
                      cross-app OCR and clicking, system control
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-purple-400 font-semibold">Microsoft Copilot</div>
                    </div>
                    <div className="flex-1 text-zinc-300">
                      Code explanation, refactoring, Microsoft 365 integration,
                      Windows system questions, creative writing in Office apps
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Command className="w-5 h-5 text-blue-400" />
                  Keyboard Shortcuts
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Keyboard className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-400 text-sm">Toggle Copilot</span>
                    </div>
                    <code className="text-white font-mono">Ctrl + Shift + C</code>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Keyboard className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-400 text-sm">Dual Chat</span>
                    </div>
                    <code className="text-white font-mono">Ctrl + D</code>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Keyboard className="w-4 h-4 text-zinc-400" />
                      <span className="text-zinc-400 text-sm">Compare</span>
                    </div>
                    <code className="text-white font-mono">Ctrl + Shift + P</code>
                  </div>
                </div>
              </div>
            </section>

            {/* Power Automate */}
            <section id="power-automate" className="mb-16">
              <motion.div 
                id="power-automate"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Terminal className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Power Automate Integration</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Microsoft Power Automate integration. Source: src/lib/platform/WindowsIntegration.ts.
                    Trigger Aartiq actions via HTTP requests from Power Automate Desktop flows.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 mb-4 w-fit">
                    <Search className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Web Scraping Flow</h3>
                  <p className="text-zinc-400 text-sm">
                    Trigger Aartiq to scrape websites on schedule.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 mb-4 w-fit">
                    <FileText className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Document Generation</h3>
                  <p className="text-zinc-400 text-sm">
                    Auto-generate reports, invoices, and documents from email attachments or SharePoint.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4 w-fit">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Scheduled Tasks</h3>
                  <p className="text-zinc-400 text-sm">
                    Daily briefings, weekly reports, monthly summaries via cron scheduling.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  Power Automate Desktop Flow
                </h3>
                <p className="text-zinc-400 mb-4">
                  Use Power Automate Desktop to create flows that interact with Aartiq
                  via HTTP requests or launch URLs.
                </p>
                <div className="space-y-4">
                  <CodeBlock code={`# Power Automate Desktop Flow Setup
# 1. Open Power Automate Desktop
# 2. Create new flow: "CometAI_Automation"
# 3. Add HTTP request action to trigger Aartiq

# HTTP Request URL:
# http://localhost:3000/api/commands

# JSON Body:
# {
#   "action": "chat",
#   "message": "Your prompt here",
#   "stream": false
# }

# Add "Run PowerShell Script" action:
# Use Invoke-RestMethod with the Aartiq API endpoint
$body = @{"action"="search","query"="latest news"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/commands" -Method Post -ContentType "application/json" -Body $body
Write-Host $response.result`} language="powershell" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  HTTP API Endpoints
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span className="text-zinc-300 font-mono text-sm">{'POST /api/commands {action: "chat"}'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-zinc-300 font-mono text-sm">{'POST /api/commands {action: "schedule"}'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40">
                    <Share2 className="w-4 h-4 text-amber-400" />
                    <span className="text-zinc-300 font-mono text-sm">{'POST /api/commands {action: "search"}'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40">
                    <AppWindow className="w-4 h-4 text-amber-400" />
                    <span className="text-zinc-300 font-mono text-sm">{'POST /api/commands {action: "open-app"}'}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Setup Guide */}
            <section id="setup-guide" className="mb-16">
              <motion.div 
                id="setup-guide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 mb-8"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                  <Cog className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Setup Guide</h2>
                  <p className="text-zinc-400 leading-relaxed">
                    Register aartiq:// protocol handler on Windows. Source: src/lib/platform/WindowsIntegration.ts.
                  </p>
                </div>
              </motion.div>

              <div className="space-y-2 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-white mb-2">Register URL Scheme</h3>
                    <p className="text-zinc-400 text-sm mb-3">
                      Add aartiq:// to Windows Registry to enable deep linking from any application.
                    </p>
                    <CodeBlock code={`Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\\comet-ai]
@="URL:Aartiq Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\\comet-ai\\DefaultIcon]
@="C:\\\\Program Files\\\\Aartiq\\\\comet-ai.exe,0"

[HKEY_CLASSES_ROOT\\comet-ai\\shell]

[HKEY_CLASSES_ROOT\\comet-ai\\shell\\open]

[HKEY_CLASSES_ROOT\\comet-ai\\shell\\open\\command]
@="\\"C:\\\\\\\\Program Files\\\\\\\\Aartiq\\\\\\\\comet-ai.exe\\" \\"%1\\""`} />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-white mb-2">Enable Speech Recognition</h3>
                    <p className="text-zinc-400 text-sm">
                      Turn on Windows Speech Recognition for voice commands. Go to Settings &gt;
                      Privacy and Security &gt; Speech and enable "Online Speech Recognition".
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-white mb-2">Configure Power Automate (Optional)</h3>
                    <p className="text-zinc-400 text-sm">
                      Download Power Automate Desktop from Microsoft Store and create flows
                      that trigger Aartiq actions via HTTP requests.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-white mb-2">Test Integration</h3>
                    <p className="text-zinc-400 text-sm mb-3">
                      Run these commands to verify everything is working.
                    </p>
                    <CodeBlock code={`# Test URL scheme
Start-Process "aartiq://chat?message=Hello"

# Test voice (requires microphone)
# Say "Hey Comet, ask about artificial intelligence"

# Test Power Automate
# Open Power Automate Desktop > Run your flow`} />
                  </div>
                </motion.div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-700/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-400" />
                  Configuration Options
                </h3>
                <ParameterTable
                  params={[
                    { name: "voice.enabled", required: false, type: "boolean", desc: "Enable voice control" },
                    { name: "voice.wakeWord", required: false, type: "string", desc: "Custom wake word (default: Hey Comet)" },
                    { name: "voice.voice", required: false, type: "string", desc: "TTS voice name" },
                    { name: "voice.rate", required: false, type: "number", desc: "Speech rate (-10 to 10)" },
                    { name: "copilot.enabled", required: false, type: "boolean", desc: "Enable Copilot integration" },
                    { name: "copilot.defaultMode", required: false, type: "string", desc: "Default Copilot mode" },
                    { name: "automate.httpPort", required: false, type: "number", desc: "HTTP API port" },
                    { name: "automate.authToken", required: false, type: "string", desc: "API authentication token" }
                  ]}
                />
              </div>
            </section>

            {/* Quick Reference */}
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-900/20 border border-zinc-800/50"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-blue-400" />
                  Quick Reference
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">URL Actions</h3>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://chat</span>
                        <span className="text-zinc-500">- AI chat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://search</span>
                        <span className="text-zinc-500">- Web search</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://create-pdf</span>
                        <span className="text-zinc-500">- Generate PDF</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://run-command</span>
                        <span className="text-zinc-500">- Execute command</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://copilot</span>
                        <span className="text-zinc-500">- Copilot query</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://schedule</span>
                        <span className="text-zinc-500">- Schedule task</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://volume</span>
                        <span className="text-zinc-500">- Set volume</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400">aartiq://ocr</span>
                        <span className="text-zinc-500">- OCR scan</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Keyboard Shortcuts</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Toggle Copilot Panel</span>
                        <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">Ctrl+Shift+C</kbd>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Dual AI Chat</span>
                        <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">Ctrl+D</kbd>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Compare Responses</span>
                        <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">Ctrl+Shift+P</kbd>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Voice Input</span>
                        <kbd className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 font-mono">Ctrl+Shift+V</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}