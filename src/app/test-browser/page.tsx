"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bot, 
  Search, 
  Mic, 
  Image, 
  Plus, 
  Menu,
  User,
  Settings,
  Globe,
  History,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Terminal,
  FileText,
  Volume2,
  ImageIcon,
  Calendar,
  ChevronRight,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  AlertCircle,
  Shield,
  Zap
} from "lucide-react";

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  commands?: string[];
}

const fakeSearchResults: SearchResult[] = [
  { title: "Aartiq - AI-Powered Browser", url: "https://aartiq.vercel.app", description: "An open-source AI browser with automation, scheduling, and mobile sync." },
  { title: "GitHub - Aartiq", url: "https://github.com/Preet3627/Aartiq", description: "Cross-platform AI-powered browser with advanced automation capabilities." },
  { title: "Aartiq Documentation", url: "https://aartiq.vercel.app/docs", description: "Complete guide to AI commands, automation, and integration." },
  { title: "Download Aartiq", url: "https://aartiq.vercel.app/downloads", description: "Get the latest version for macOS, Windows, and Linux." },
];

const mockAIResponse = `Here's what I found for you:

**[NAVIGATE: https://github.com/Preet3627/Aartiq]**

Aartiq is a cross-platform AI-powered browser with:
- Advanced automation and scheduling
- Mobile sync via WiFi
- Native macOS UI with Liquid Glass theme
- End-to-end encryption for data protection

Let me also open the documentation for you:

**[NAVIGATE: https://aartiq.vercel.app/docs]**

Is there anything specific you'd like to explore?`;

const commandPatterns = [
  { command: "NAVIGATE", description: "Navigate to URL", example: "[NAVIGATE: https://github.com]" },
  { command: "SEARCH", description: "Search the web", example: "[SEARCH: AI news]" },
  { command: "SHELL_COMMAND", description: "Execute shell command", example: "[SHELL_COMMAND: ls -la]" },
  { command: "CREATE_PDF_JSON", description: "Generate PDF", example: "[CREATE_PDF_JSON: {...}]" },
  { command: "SET_VOLUME", description: "Set volume", example: "[SET_VOLUME: 50]" },
  { command: "SET_BRIGHTNESS", description: "Set brightness", example: "[SET_BRIGHTNESS: 80]" },
  { command: "OPEN_APP", description: "Open application", example: "[OPEN_APP: Calculator]" },
  { command: "OCR_SCREEN", description: "OCR screen", example: "[OCR_SCREEN]" },
  { command: "SCREENSHOT_AND_ANALYZE", description: "Screenshot & analyze", example: "[SCREENSHOT_AND_ANALYZE]" },
  { command: "SCHEDULE_TASK", description: "Schedule task", example: "[SCHEDULE_TASK: {...}]" },
];

const aiCommands = [
  "NAVIGATE", "SEARCH", "SHELL_COMMAND", "CREATE_PDF_JSON", 
  "SET_VOLUME", "SET_BRIGHTNESS", "OPEN_APP", "OCR_SCREEN",
  "SCREENSHOT_AND_ANALYZE", "SCHEDULE_TASK"
];

export default function TestBrowserPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"search" | "chat">("search");
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState([
    { id: "1", title: "New Tab", url: "" }
  ]);
  const [activeTabId, setActiveTabId] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowResults(true);
    setResults(fakeSearchResults);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const detectedCommands: string[] = [];
      const lowerInput = inputMessage.toLowerCase();
      
      if (lowerInput.includes('open') || lowerInput.includes('go to') || lowerInput.includes('navigate')) {
        detectedCommands.push("NAVIGATE");
      }
      if (lowerInput.includes('search')) {
        detectedCommands.push("SEARCH");
      }
      if (lowerInput.includes('pdf') || lowerInput.includes('generate') || lowerInput.includes('create')) {
        detectedCommands.push("CREATE_PDF_JSON");
      }
      if (lowerInput.includes('volume') || lowerInput.includes('sound')) {
        detectedCommands.push("SET_VOLUME");
      }
      if (lowerInput.includes('brightness') || lowerInput.includes('screen')) {
        detectedCommands.push("SET_BRIGHTNESS");
      }
      if (lowerInput.includes('open app') || lowerInput.includes('launch')) {
        detectedCommands.push("OPEN_APP");
      }
      if (lowerInput.includes('screenshot') || lowerInput.includes('capture') || lowerInput.includes('take')) {
        detectedCommands.push("SCREENSHOT_AND_ANALYZE");
      }
      if (lowerInput.includes('schedule') || lowerInput.includes('daily') || lowerInput.includes('hourly')) {
        detectedCommands.push("SCHEDULE_TASK");
      }
      if (lowerInput.includes('read') || lowerInput.includes('ocr')) {
        detectedCommands.push("OCR_SCREEN");
      }
      if (lowerInput.includes('terminal') || lowerInput.includes('shell') || lowerInput.includes('command')) {
        detectedCommands.push("SHELL_COMMAND");
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockAIResponse,
        timestamp: new Date(),
        commands: detectedCommands.length > 0 ? detectedCommands : undefined,
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0a0a0a]" : "bg-white"}`}>
      {/* Browser Chrome */}
      <div className={`border-b ${darkMode ? "border-white/10 bg-[#1a1a1a]" : "border-gray-200 bg-gray-100"}`}>
        {/* Tab Bar */}
        <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
          {openTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-sm transition-colors ${
                activeTabId === tab.id
                  ? darkMode ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"
                  : darkMode ? "bg-[#2a2a2a] text-white/60 hover:text-white" : "bg-gray-200 text-gray-600 hover:text-gray-900"
              }`}
            >
              <Globe size={14} />
              <span className="max-w-[100px] truncate">{tab.title}</span>
              {openTabs.length > 1 && (
                <X size={12} className="hover:text-red-400" onClick={(e) => {
                  e.stopPropagation();
                  setOpenTabs(openTabs.filter(t => t.id !== tab.id));
                  if (activeTabId === tab.id) setActiveTabId(openTabs[0].id);
                }} />
              )}
            </button>
          ))}
          <button
            onClick={() => {
              const newTab = { id: Date.now().toString(), title: "New Tab", url: "" };
              setOpenTabs([...openTabs, newTab]);
              setActiveTabId(newTab.id);
            }}
            className={`p-1.5 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}
          >
            <Plus size={16} className={darkMode ? "text-white/60" : "text-gray-600"} />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-2 px-4 py-2">
          <button className={`p-2 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}>
            <ArrowRight size={16} className={darkMode ? "text-white/60" : "text-gray-600"} />
          </button>
          <button className={`p-2 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}>
            <ArrowRight size={16} className={`rotate-180 ${darkMode ? "text-white/60" : "text-gray-600"}`} />
          </button>
          <button className={`p-2 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}>
            <RefreshCw width={16} height={16} className={darkMode ? "text-white/60" : "text-gray-600"} />
          </button>
          
          <div className={`flex-1 mx-2 px-3 py-1.5 rounded-full ${
            darkMode ? "bg-[#2a2a2a]" : "bg-gray-200"
          } flex items-center gap-2`}>
            <Lock width={12} height={12} className="text-green-500" />
            <span className={`text-sm ${darkMode ? "text-white/60" : "text-gray-600"}`}>
              aartiq.vercel.app
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}
          >
            {darkMode ? <Sun size={16} className="text-white/60" /> : <Moon size={16} className="text-gray-600" />}
          </button>
          <button className={`p-2 rounded ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-200"}`}>
            <Settings size={16} className={darkMode ? "text-white/60" : "text-gray-600"} />
          </button>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center py-4">
        <div className={`flex rounded-full p-1 ${darkMode ? "bg-[#2a2a2a]" : "bg-gray-200"}`}>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "search"
                ? "bg-sky-500 text-white"
                : darkMode ? "text-white/60" : "text-gray-600"
            }`}
          >
            <Search size={16} /> Search
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "chat"
                ? "bg-sky-500 text-white"
                : darkMode ? "text-white/60" : "text-gray-600"
            }`}
          >
            <Bot size={16} /> AI Chat
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        {activeTab === "search" ? (
          /* Search Mode */
          <div className="text-center pt-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-purple-500 flex items-center justify-center">
                <Bot size={28} className="text-white" />
              </div>
              <h1 className={`text-5xl font-black tracking-tighter ${darkMode ? "text-white" : "text-gray-900"}`}>
                Aartiq<span className="text-sky-500"></span>
              </h1>
            </div>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className={`flex items-center gap-4 px-6 py-4 rounded-full border ${
                darkMode ? "border-white/10 bg-[#1a1a1a]" : "border-gray-200 bg-white shadow-lg"
              }`}>
                <Search size={20} className={darkMode ? "text-white/40" : "text-gray-400"} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or ask AI..."
                  className={`flex-1 bg-transparent text-lg outline-none ${
                    darkMode ? "text-white placeholder-white/40" : "text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button type="button" className={`p-2 rounded-full ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
                  <Mic size={20} className={darkMode ? "text-white/40" : "text-gray-400"} />
                </button>
                <button type="button" className={`p-2 rounded-full ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
                  <ImageIcon size={20} className={darkMode ? "text-white/40" : "text-gray-400"} />
                </button>
              </div>
            </form>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm ${darkMode ? "text-white/40" : "text-gray-500"}`}>
                Try: "Open GitHub" or "Generate PDF"
              </span>
            </div>

            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                {results.map((result, i) => (
                  <a
                    key={i}
                    href={result.url}
                    className={`block p-4 rounded-xl border transition-all ${
                      darkMode ? "border-white/5 hover:border-sky-500/50 bg-[#1a1a1a]" : "border-gray-100 hover:border-sky-500/50 bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe size={14} className="text-sky-500" />
                      <span className="text-sm text-sky-500">{result.url}</span>
                    </div>
                    <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {result.title}
                    </h3>
                    <p className={`mt-1 ${darkMode ? "text-white/50" : "text-gray-600"}`}>
                      {result.description}
                    </p>
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          /* AI Chat Mode */
          <div className="pt-10">
            {/* Commands Demo Banner */}
            <div className={`rounded-2xl border p-6 mb-8 ${
              darkMode ? "border-purple-500/20 bg-purple-500/5" : "border-purple-200 bg-purple-50"
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-purple-400" />
                <h3 className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Try AI Commands
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Open GitHub", "Generate PDF", "Set volume 50%", "Take screenshot", "Schedule daily"].map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMessage(cmd)}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      darkMode ? "bg-white/5 text-white/60 hover:bg-white/10" : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="space-y-6 mb-8">
              {chatMessages.length === 0 && (
                <div className={`text-center py-12 ${darkMode ? "text-white/30" : "text-gray-400"}`}>
                  <Bot size={48} className="mx-auto mb-4 opacity-30" />
                  <p>Ask me anything or try a command above</p>
                </div>
              )}
              
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" ? "bg-sky-500" : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }`}>
                    {msg.role === "user" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${msg.role === "user" ? "text-right" : ""}`}>
                    <div className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-sky-500 text-white"
                        : darkMode ? "bg-[#1a1a1a] border border-white/10" : "bg-white border border-gray-200"
                    }`}>
                      <p className={msg.role === "user" ? "" : darkMode ? "text-white" : "text-gray-900"}>
                        {msg.content.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                    
                    {/* Extracted Commands */}
                    {msg.commands && msg.commands.length > 0 && (
                      <div className={`mt-3 flex flex-wrap gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
                        {msg.commands.map((cmd, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20"
                          >
                            <Terminal size={12} className="text-sky-400" />
                            <code className="text-xs font-mono text-sky-400">{cmd}</code>
                            <button
                              onClick={() => copyCommand(cmd)}
                              className="p-1 hover:bg-sky-500/20 rounded"
                            >
                              {copiedCommand === cmd ? (
                                <Check size={12} className="text-emerald-400" />
                              ) : (
                                <Copy size={12} className="text-sky-400/50" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className={`p-4 rounded-2xl ${darkMode ? "bg-[#1a1a1a] border border-white/10" : "bg-white border border-gray-200"}`}>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className={`flex items-center gap-3 p-3 rounded-2xl border ${
                darkMode ? "border-white/10 bg-[#1a1a1a]" : "border-gray-200 bg-white"
              }`}
            >
              <button type="button" className={`p-2 rounded-full ${darkMode ? "hover:bg-white/10" : "hover:bg-gray-100"}`}>
                <Plus size={20} className={darkMode ? "text-white/40" : "text-gray-400"} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask anything or type a command..."
                className={`flex-1 bg-transparent outline-none ${
                  darkMode ? "text-white placeholder-white/40" : "text-gray-900 placeholder-gray-400"
                }`}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 rounded-full bg-sky-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>

            {/* Command Reference */}
            <div className={`mt-12 p-6 rounded-2xl border ${
              darkMode ? "border-white/5 bg-white/[0.02]" : "border-gray-100 bg-gray-50"
            }`}>
              <h3 className={`font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Available Commands
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {commandPatterns.map((cmd, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Terminal size={14} className="text-sky-400 shrink-0" />
                    <code className={`text-xs font-mono ${darkMode ? "text-white/60" : "text-gray-600"}`}>
                      [{cmd.command}]
                    </code>
                    <span className={`text-xs ${darkMode ? "text-white/30" : "text-gray-400"}`}>
                      {cmd.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t py-4 text-center ${darkMode ? "border-white/10" : "border-gray-200"}`}>
        <p className={`text-sm ${darkMode ? "text-white/30" : "text-gray-400"}`}>
          Demo Mode — <a href="https://aartiq.vercel.app/downloads" className="text-sky-500 hover:underline">Download the full browser</a> for complete features
        </p>
      </div>
    </div>
  );
}

function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>
  );
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}