"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  FileText, 
  Terminal, 
  Globe,
  MousePointer,
  Volume2,
  Calendar,
  Download,
  Copy,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Code2,
  ArrowRight,
  Shield,
  Image,
  Hash,
  Layout,
  Maximize2,
  Smartphone
} from "lucide-react";

const commandCategories = [
  {
    id: "navigation",
    name: "Navigation",
    icon: Globe,
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    commands: ["NAVIGATE", "SEARCH", "WEB_SEARCH", "RELOAD", "GO_BACK", "GO_FORWARD"],
    source: "src/lib/browser-navigation-service.js"
  },
  {
    id: "browser",
    name: "Browser Control",
    icon: Globe,
    color: "from-sky-500/20 to-cyan-500/20",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
    commands: ["READ_PAGE_CONTENT", "LIST_OPEN_TABS", "CLICK_ELEMENT", "FIND_AND_CLICK", "FILL_FORM"],
    source: "src/core/window-manager.js, src/components/BrowserViewContainer.tsx"
  },
  {
    id: "pdf",
    name: "PDF & Files",
    icon: FileText,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    commands: ["CREATE_PDF_JSON", "CREATE_FILE_JSON"],
    source: "src/lib/PDFCommandParser.ts, src/core/pdf-generator.js"
  },
  {
    id: "shell",
    name: "Shell Commands",
    icon: Terminal,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    commands: ["SHELL_COMMAND"],
    source: "src/lib/ShellCommandParser.ts, src/core/shell-executor.js"
  },
  {
    id: "system",
    name: "System Control",
    icon: Volume2,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    commands: ["SET_VOLUME", "SET_BRIGHTNESS", "OPEN_APP"],
    source: "src/core/system-controls.js"
  },
  {
    id: "ocr",
    name: "Visual Intelligence",
    icon: Image,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    commands: ["OCR_SCREEN", "OCR_COORDINATES", "CLICK_APP_ELEMENT"],
    source: "src/lib/tesseract-service.js, src/lib/screen-vision-service.js"
  },
  {
    id: "automation",
    name: "Automation",
    icon: Calendar,
    color: "from-cyan-500/20 to-sky-500/20",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    commands: ["LIST_AUTOMATIONS", "DELETE_AUTOMATION"]
  },
  {
    id: "scheduling",
    name: "Scheduling",
    icon: Calendar,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    commands: ["SCHEDULE_TASK"],
    source: "src/service/scheduler.js"
  },
  {
    id: "meta",
    name: "Meta Commands",
    icon: Bot,
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
    commands: ["THINK", "PLAN"]
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: Maximize2,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
    commands: ["PLUGIN_COMMAND"],
    source: "src/lib/plugin-manager.js, src/lib/plugin-sdk.js"
  }
];

const commands = [
  // Navigation Commands
  {
    name: "NAVIGATE",
    category: "navigation",
    description: "Navigate to a specific URL. Supports HTTP, HTTPS, and file:// URLs.",
    format: "Bracket/JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "url", type: "string", required: true, description: "Target URL" }
    ],
    example: {
      json: `[NAVIGATE: https://github.com/Preet3627/Aartiq]`,
      natural: "Go to the Aartiq GitHub repository"
    }
  },
  {
    name: "SEARCH",
    category: "navigation",
    description: "Perform a web search using the default search engine.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "query", type: "string", required: true, description: "Search query" }
    ],
    example: {
      json: `[SEARCH: latest AI news]`,
      natural: "Search for the latest AI news"
    }
  },
  {
    name: "WEB_SEARCH",
    category: "navigation",
    description: "Perform a real-time web search with RAG (Retrieval Augmented Generation) for up-to-date information.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "query", type: "string", required: true, description: "Search query for real-time data" }
    ],
    example: {
      json: `[WEB_SEARCH: today's stock prices]`,
      natural: "What's the current stock price of Apple?"
    }
  },
  {
    name: "RELOAD",
    category: "navigation",
    description: "Refresh the current browser tab.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[RELOAD]`,
      natural: "Refresh this page"
    }
  },
  {
    name: "GO_BACK",
    category: "navigation",
    description: "Navigate back in browser history.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[GO_BACK]`,
      natural: "Go back to the previous page"
    }
  },
  {
    name: "GO_FORWARD",
    category: "navigation",
    description: "Navigate forward in browser history.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[GO_FORWARD]`,
      natural: "Go forward to the next page"
    }
  },

  // Browser Commands
  {
    name: "READ_PAGE_CONTENT",
    category: "browser",
    description: "Extract and read text content from the active browser tab.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[READ_PAGE_CONTENT]`,
      natural: "Read the content of this page"
    }
  },
  {
    name: "LIST_OPEN_TABS",
    category: "browser",
    description: "List all currently open browser tabs with their titles and URLs.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[LIST_OPEN_TABS]`,
      natural: "Show me all open tabs"
    }
  },
  // PDF Commands
  {
    name: "CREATE_PDF_JSON",
    category: "pdf",
    description: "Generate a structured, multi-page PDF document with advanced formatting options. PREFERRED method.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "title", type: "string", required: true, description: "Document title" },
      { name: "template", type: "string", required: false, description: "Template name (professional, executive, academic, minimalist, dark)" },
      { name: "content", type: "array", required: true, description: "Array of page objects" },
      { name: "branding", type: "object", required: false, description: "Header, footer, logo options" },
      { name: "include_toc", type: "boolean", required: false, description: "Generate table of contents" }
    ],
    example: {
      json: `{
  "command": "CREATE_PDF_JSON",
  "title": "Q4 Financial Report",
  "template": "executive",
  "include_toc": true,
  "content": [
    {"type": "header", "text": "Executive Summary"},
    {"type": "text", "content": "This quarter showed remarkable growth..."},
    {"type": "table", "headers": ["Metric", "Value", "Change"], "rows": [["Revenue", "$2.4M", "+15%"]]}
  ]
}`,
      natural: "Generate an executive summary PDF with a table of contents"
    }
  },
  {
    name: "CREATE_FILE_JSON",
    category: "pdf",
    description: "Create various file formats (PDF, PPTX, DOCX) using structured JSON. Supports rich media slides.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "format", type: "string", required: true, description: "File format: pdf, pptx, or docx" },
      { name: "title", type: "string", required: true, description: "Document title" },
      { name: "slides", type: "array", required: true, description: "Array of slide/page objects" }
    ],
    example: {
      json: `{
  "command": "CREATE_FILE_JSON",
  "format": "pptx",
  "title": "Q4 Presentation",
  "slides": [
    {"title": "Overview", "content": "Key metrics and achievements"},
    {"title": "Revenue", "chart": "bar", "data": [10, 20, 30]}
  ]
}`,
      natural: "Create a PowerPoint presentation for Q4"
    }
  },
  // Shell Commands
  {
    name: "SHELL_COMMAND",
    category: "shell",
    description: "Execute terminal commands on the host operating system. All shell commands require explicit user approval.",
    format: "JSON",
    riskLevel: "High",
    requiresApproval: true,
    approvalType: "QR / Shift+Tab",
    parameters: [
      { name: "command", type: "string", required: true, description: "The shell command to execute" },
      { name: "shell", type: "string", required: false, description: "Shell type: bash, zsh, powershell, cmd" }
    ],
    safetyFeatures: [
      "Syntactic firewall filters dangerous patterns",
      "Command is displayed for user review before execution",
      "High-risk commands require QR code approval via mobile",
      "Commands are logged for audit purposes"
    ],
    example: {
      json: `{
  "command": "SHELL_COMMAND",
  "params": {
    "command": "system_profiler SPNetworkDataType",
    "shell": "bash"
  }
}`,
      natural: "Show me my network information"
    },
    safeCommands: [
      "system_profiler", "ifconfig", "ipconfig", "netstat", "ping",
      "curl (GET requests only)", "git status", "ls", "pwd", "df"
    ],
    blockedCommands: [
      "rm -rf", "sudo", "dd", "mkfs", ":(){:|:&};:", ">/dev/sda"
    ]
  },

  // System Commands
  {
    name: "SET_VOLUME",
    category: "system",
    description: "Adjust the system volume level.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "level", type: "number", required: true, description: "Volume level 0-100" }
    ],
    example: {
      json: `[SET_VOLUME: 50]`,
      natural: "Set volume to 50%"
    }
  },
  {
    name: "SET_BRIGHTNESS",
    category: "system",
    description: "Adjust the display brightness level.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "level", type: "number", required: true, description: "Brightness level 0-100" }
    ],
    example: {
      json: `[SET_BRIGHTNESS: 75]`,
      natural: "Increase brightness to 75%"
    }
  },
  {
    name: "OPEN_APP",
    category: "system",
    description: "Launch an application on the host system.",
    format: "Bracket",
    riskLevel: "Medium",
    requiresApproval: true,
    approvalType: "Shift+Tab",
    parameters: [
      { name: "app", type: "string", required: true, description: "Application name or bundle ID" },
      { name: "url", type: "string", required: false, description: "URL or deep link to open" }
    ],
    example: {
      json: `[OPEN_APP: Calculator]`,
      natural: "Open the Calculator app"
    }
  },

  // OCR Commands
  {
    name: "OCR_SCREEN",
    category: "ocr",
    description: "Capture the screen or a region and extract text. Comet uses native OS OCR and accessibility providers first, with image OCR as a fallback path.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "region", type: "object", required: false, description: "Region to capture: {x, y, width, height}" }
    ],
    example: {
      json: `{
  "command": "OCR_SCREEN",
  "region": {"x": 0, "y": 0, "width": 1920, "height": 1080}
}`,
      natural: "Read the text on my screen"
    }
  },
  {
    name: "OCR_COORDINATES",
    category: "ocr",
    description: "Resolve coordinates for visible text in desktop apps so Comet can target external UI reliably.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "text", type: "string", required: true, description: "Text to find" },
      { name: "threshold", type: "number", required: false, description: "Match confidence threshold 0-1" }
    ],
    example: {
      json: `{
  "command": "OCR_COORDINATES",
  "text": "Submit Button"
}`,
      natural: "Find the coordinates of the Submit Button"
    }
  },
  {
    name: "CLICK_APP_ELEMENT",
    category: "ocr",
    description: "Click on an element in an external application using native-first visual matching and coordinate resolution.",
    format: "JSON",
    riskLevel: "High",
    requiresApproval: true,
    approvalType: "QR",
    parameters: [
      { name: "app", type: "string", required: true, description: "Application name" },
      { name: "text", type: "string", required: true, description: "Text of element to click" },
      { name: "x", type: "number", required: false, description: "X coordinate override" },
      { name: "y", type: "number", required: false, description: "Y coordinate override" }
    ],
    example: {
      json: `{
  "command": "CLICK_APP_ELEMENT",
  "app": "Terminal",
  "text": "Run"
}`,
      natural: "Click the Run button in Terminal"
    }
  },

  // Automation Commands
  {
    name: "LIST_AUTOMATIONS",
    category: "automation",
    description: "List all scheduled automation tasks with their status and schedules.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [],
    example: {
      json: `[LIST_AUTOMATIONS]`,
      natural: "Show all my scheduled automations"
    }
  },
  {
    name: "DELETE_AUTOMATION",
    category: "automation",
    description: "Delete an automation task using its ID.",
    format: "Bracket",
    riskLevel: "Low",
    requiresApproval: true,
    parameters: [
      { name: "taskId", type: "string", required: true, description: "ID of the automation to delete" }
    ],
    example: {
      json: `[DELETE_AUTOMATION: task-123]`,
      natural: "Delete the automation with ID task-123"
    }
  },
  // Scheduling Commands
  {
    name: "SCHEDULE_TASK",
    category: "scheduling",
    description: "Schedule a recurring automation task that runs through the background service even when the browser is closed.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "schedule", type: "string", required: true, description: "Cron expression" },
      { name: "type", type: "string", required: true, description: "Task type: pdf-generate, scrape, prompt, workflow" },
      { name: "name", type: "string", required: true, description: "Task name" }
    ],
    schedulePresets: [
      { name: "daily", expression: "0 8 * * *", description: "Every day at 8 AM" },
      { name: "hourly", expression: "0 * * * *", description: "Every hour" },
      { name: "weekdays", expression: "0 9 * * 1-5", description: "Monday to Friday at 9 AM" },
      { name: "weekly", expression: "0 10 * * 1", description: "Every Monday at 10 AM" }
    ],
    example: {
      json: `{
  "command": "SCHEDULE_TASK",
  "params": {
    "schedule": "0 8 * * *",
    "type": "pdf-generate",
    "name": "Daily Report"
  }
}`,
      natural: "Schedule a daily news summary at 8 AM"
    }
  },

  // Meta Commands
  {
    name: "THINK",
    category: "meta",
    description: "Expose the model's reasoning or intermediate thinking to the user for complex tasks.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "reasoning", type: "string", required: true, description: "The AI's thought process" }
    ],
    example: {
      json: `{
  "command": "THINK",
  "params": {
    "reasoning": "Calculating the optimal approach by comparing multiple search results..."
  }
}`,
      natural: "Let me think through this problem step by step"
    }
  },
  {
    name: "PLAN",
    category: "meta",
    description: "Show the intended execution steps for a multi-step task before or during execution.",
    format: "JSON",
    riskLevel: "Low",
    requiresApproval: false,
    parameters: [
      { name: "steps", type: "string", required: true, description: "List of planned steps" }
    ],
    example: {
      json: `{
  "command": "PLAN",
  "params": {
    "steps": "Step 1: Search, Step 2: Read results, Step 3: Generate summary"
  }
}`,
      natural: "Here's my plan to complete this task"
    }
  },

  // Integration Commands
  {
    name: "PLUGIN_COMMAND",
    category: "integrations",
    description: "Execute a command defined by a plugin. Format: pluginId.commandName | params.",
    format: "Bracket",
    riskLevel: "Medium",
    requiresApproval: true,
    parameters: [
      { name: "pluginCommand", type: "string", required: true, description: "Plugin ID and command name" },
      { name: "params", type: "object", required: false, description: "Command parameters as JSON" }
    ],
    example: {
      json: `[PLUGIN_COMMAND: weather.get-forecast | {"city": "San Francisco"}]`,
      natural: "Get the weather forecast for San Francisco"
    }
  },

  // Browser Automation Commands (remaining)
  {
    name: "CLICK_ELEMENT",
    category: "browser",
    description: "Click on a visible DOM element using visual intelligence (OCR + coordinate mapping).",
    format: "JSON/Bracket",
    riskLevel: "Medium",
    requiresApproval: true,
    approvalType: "Shift+Tab (auto-approve if low-risk)",
    parameters: [
      { name: "text", type: "string", required: true, description: "Text of the element to click" },
      { name: "matchType", type: "string", required: false, description: "exact, contains, startsWith" },
      { name: "index", type: "number", required: false, description: "Index if multiple matches" }
    ],
    example: {
      json: `{
  "command": "CLICK_ELEMENT",
  "text": "Submit",
  "matchType": "contains",
  "index": 0
}`,
      natural: "Click the login button"
    }
  },
  {
    name: "FIND_AND_CLICK",
    category: "browser",
    description: "Find text on the current page and click nearby elements. Uses OCR for text detection.",
    format: "JSON/Bracket",
    riskLevel: "Medium",
    requiresApproval: true,
    parameters: [
      { name: "findText", type: "string", required: true, description: "Text to search for" },
      { name: "clickText", type: "string", required: false, description: "Text of element to click near found text" }
    ],
    example: {
      json: `[FIND_AND_CLICK: Settings | Open]`,
      natural: "Find the word Settings and click Open next to it"
    }
  },
  {
    name: "FILL_FORM",
    category: "browser",
    description: "Fill in form fields identified by label, placeholder, or name.",
    format: "JSON/Bracket",
    riskLevel: "Medium",
    requiresApproval: true,
    parameters: [
      { name: "fields", type: "array", required: true, description: "Array of field objects" },
      { name: "fields[].label", type: "string", required: false, description: "Field label text" },
      { name: "fields[].name", type: "string", required: false, description: "Input name attribute" },
      { name: "fields[].value", type: "string", required: true, description: "Value to enter" }
    ],
    example: {
      json: `{
  "command": "FILL_FORM",
  "fields": [
    {"label": "Email", "value": "user@example.com"},
    {"label": "Password", "value": "secret123"}
  ]
}`,
      natural: "Fill in the login form with email and password"
    }
  }
];

const commandStatus = {
  Low: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Medium: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  High: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" }
};

export default function AICommandsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCommand, setSelectedCommand] = useState<typeof commands[0] | null>(null);
  const [copiedExample, setCopiedExample] = useState<string | null>(null);

  const filteredCommands = selectedCategory 
    ? commands.filter(cmd => cmd.category === selectedCategory)
    : commands;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedExample(id);
    setTimeout(() => setCopiedExample(null), 2000);
  };

  const selectedCatData = selectedCategory ? commandCategories.find(c => c.id === selectedCategory) : null;

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <Bot size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Command Reference
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Command <span className="text-white/20">Reference</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Structured JSON commands for browser control, system automation, and AI orchestration.
          Source: src/lib/AICommandParser.ts, src/components/ai/AIConstants.ts, src/components/ai/AIUtils.ts
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/docs/native-api"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Native API
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/docs/api-reference"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            API Reference
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Risk Level Legend */}
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <p className="text-xs font-black uppercase tracking-wider text-white/30">Risk:</p>
          {Object.entries(commandStatus).map(([level, styles]) => (
            <div key={level} className={`flex items-center gap-2 rounded-full border px-4 py-2 ${styles.bg}`}>
              <div className={`h-2 w-2 rounded-full ${styles.color.replace('text-', 'bg-')}`} />
              <span className={`text-xs font-black uppercase ${styles.color}`}>{level}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
              !selectedCategory
                ? "bg-white text-black"
                : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            All Commands
          </button>
          {commandCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`group flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-black"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <cat.icon size={16} className={selectedCategory === cat.id ? "" : cat.iconColor} />
              <span className="hidden sm:inline">{cat.name}</span>
            </button>
          ))}
        </div>

        {selectedCatData?.source && (
          <div className="mb-6">
            <code className="rounded bg-white/5 px-3 py-1.5 text-xs font-mono text-white/40">
              Source: {selectedCatData.source}
            </code>
          </div>
        )}
      </motion.section>

      {/* Commands Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredCommands.map((cmd, i) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedCommand(cmd)}
              className={`group cursor-pointer rounded-[2rem] border p-8 transition-all hover:scale-[1.01] ${
                commandCategories.find(c => c.id === cmd.category)?.borderColor || "border-white/5"
              } bg-gradient-to-br ${
                commandCategories.find(c => c.id === cmd.category)?.color || "from-white/5 to-transparent"
              }`}
            >
              <div className="mb-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${
                    commandCategories.find(c => c.id === cmd.category)?.iconColor || "text-white"
                  }`}>
                    {cmd.name.includes("PDF") ? <FileText size={24} /> :
                     cmd.name.includes("SHELL") ? <Terminal size={24} /> :
                     cmd.name.includes("NAVIGATE") ? <Globe size={24} /> :
                     cmd.name.includes("OCR") ? <Image size={24} /> :
                     cmd.name.includes("SCHEDULE") ? <Calendar size={24} /> :
                     cmd.name.includes("CLICK") ? <MousePointer size={24} /> :
                     cmd.name.includes("VOLUME") || cmd.name.includes("BRIGHTNESS") ? <Volume2 size={24} /> :
                     <Code2 size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-black uppercase tracking-wider">{cmd.name}</h3>
                    </div>
                    <p className="mt-1 text-xs text-white/30">{cmd.format} Format</p>
                  </div>
                </div>
                <div className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase ${
                  commandStatus[cmd.riskLevel as keyof typeof commandStatus].bg
                } ${commandStatus[cmd.riskLevel as keyof typeof commandStatus].color}`}>
                  {cmd.riskLevel} Risk
                </div>
              </div>

              <p className="mb-6 text-sm font-medium leading-relaxed text-white/60">{cmd.description}</p>

              {cmd.parameters && (
                <div className="mb-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                    Parameters ({cmd.parameters.filter(p => p.required).length} required)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cmd.parameters.slice(0, 4).map((param) => (
                      <code
                        key={param.name}
                        className={`rounded-lg px-3 py-1 text-xs font-mono ${
                          param.required 
                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" 
                            : "bg-white/5 text-white/40 border border-white/5"
                        }`}
                      >
                        {param.name}
                      </code>
                    ))}
                    {cmd.parameters.length > 4 && (
                      <span className="px-3 py-1 text-xs text-white/30">
                        +{cmd.parameters.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {cmd.requiresApproval ? (
                    <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5">
                      <Shield size={12} className="text-red-400" />
                      <span className="text-[10px] font-bold uppercase text-red-400">
                        Requires Approval
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span className="text-[10px] font-bold uppercase text-emerald-400">
                        Instant
                      </span>
                    </div>
                  )}
                </div>
                <ChevronRight size={18} className="text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Command Detail Modal */}
      {selectedCommand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCommand(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a0c14] p-10 shadow-2xl"
          >
            <button
              onClick={() => setSelectedCommand(null)}
              className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>

            <div className="mb-8 flex items-start gap-6">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/5 ${
                commandCategories.find(c => c.id === selectedCommand.category)?.iconColor || "text-white"
              }`}>
                <Code2 size={32} />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-black uppercase tracking-wider">{selectedCommand.name}</h2>
                  <div className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
                    commandStatus[selectedCommand.riskLevel as keyof typeof commandStatus].bg
                  } ${commandStatus[selectedCommand.riskLevel as keyof typeof commandStatus].color}`}>
                    {selectedCommand.riskLevel} Risk
                  </div>
                </div>
                <p className="mt-2 text-white/50">{selectedCommand.description}</p>
              </div>
            </div>

            {/* Parameters */}
            {selectedCommand.parameters && (
              <div className="mb-10">
                <h3 className="mb-6 text-lg font-black uppercase tracking-wider">Parameters</h3>
                <div className="space-y-3">
                  {selectedCommand.parameters.map((param) => (
                    <div key={param.name} className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <code className="rounded bg-sky-500/10 px-2 py-0.5 text-sm font-mono text-sky-400">{param.name}</code>
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-black uppercase text-white/30">{param.type}</span>
                          {param.required && (
                            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-black uppercase text-red-400">Required</span>
                          )}
                        </div>
                        <p className="mt-2 text-sm text-white/40">{param.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Example */}
            <div className="mb-10">
              <h3 className="mb-6 text-lg font-black uppercase tracking-wider">Example</h3>
              <div className="relative">
                <button
                  onClick={() => handleCopy(selectedCommand.example.json, selectedCommand.name)}
                  className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-bold text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  {copiedExample === selectedCommand.name ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  {copiedExample === selectedCommand.name ? "Copied!" : "Copy"}
                </button>
                <pre className="overflow-x-auto rounded-xl bg-black/60 p-6 pt-12 font-mono text-sm text-white/80">
                  {selectedCommand.example.json}
                </pre>
              </div>
              <div className="mt-4 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
                <p className="text-sm text-white/60">
                  <strong className="text-sky-400">Natural Language:</strong> "{selectedCommand.example.natural}"
                </p>
              </div>
            </div>

            {/* Safety Features */}
            {selectedCommand.safetyFeatures && (
              <div className="mb-10">
                <h3 className="mb-6 text-lg font-black uppercase tracking-wider">Safety Features</h3>
                <ul className="space-y-3">
                  {selectedCommand.safetyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <Shield size={18} className="text-sky-400" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safe/Blocked Commands */}
            {selectedCommand.safeCommands && (
              <div className="mb-10 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-emerald-400">Allowed Commands</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommand.safeCommands.map((cmd) => (
                      <code key={cmd} className="rounded bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">
                        {cmd}
                      </code>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-red-400">Blocked Patterns</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCommand.blockedCommands.map((cmd) => (
                      <code key={cmd} className="rounded bg-red-500/10 px-2 py-1 text-xs text-red-400">
                        {cmd}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Presets */}
            {selectedCommand.schedulePresets && (
              <div className="mb-10">
                <h3 className="mb-6 text-lg font-black uppercase tracking-wider">Schedule Presets</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedCommand.schedulePresets.map((preset) => (
                    <div key={preset.name} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div>
                        <p className="font-bold text-white">{preset.name}</p>
                        <p className="text-xs text-white/40">{preset.description}</p>
                      </div>
                      <code className="rounded bg-white/5 px-2 py-1 text-xs text-white/60">{preset.expression}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Quick Reference */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
          <h2 className="mb-8 text-2xl font-black uppercase tracking-wider">Quick Command Reference</h2>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commands.slice(0, 9).map((cmd) => (
              <div key={cmd.name} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <code className="text-sm font-mono text-sky-400">{cmd.name}</code>
                {cmd.requiresApproval && (
                  <Shield size={12} className="ml-auto text-red-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}