"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Keyboard, 
  Search, 
  Command,
  ArrowLeft,
  ArrowRight,
  CornerDownLeft,
  CornerUpLeft,
  CornerDownRight,
  RefreshCw,
  Volume2,
  Monitor,
  Smartphone,
  Globe,
  Terminal,
  FileText,
  Bot,
  Calendar,
  Shield,
  Wifi,
  Settings,
  BookOpen
} from "lucide-react";

const shortcutCategories = [
  {
    title: "Documentation",
    icon: BookOpen,
    shortcuts: [
      { keys: ["⌘", "K"], description: "Open search", platform: "Mac" },
      { keys: ["Ctrl", "K"], description: "Open search", platform: "Windows/Linux" },
      { keys: ["Esc"], description: "Close search / Go back", platform: "All" },
      { keys: ["↑", "↓"], description: "Navigate search results", platform: "All" },
      { keys: ["Enter"], description: "Select search result", platform: "All" },
    ]
  },
  {
    title: "Browser Control",
    icon: Monitor,
    shortcuts: [
      { keys: ["Alt", "←"], description: "Go back", platform: "All" },
      { keys: ["Alt", "→"], description: "Go forward", platform: "All" },
      { keys: ["Ctrl", "R"], description: "Reload page", platform: "Windows/Linux" },
      { keys: ["⌘", "R"], description: "Reload page", platform: "Mac" },
      { keys: ["Ctrl", "L"], description: "Focus address bar", platform: "Windows/Linux" },
      { keys: ["⌘", "L"], description: "Focus address bar", platform: "Mac" },
    ]
  },
  {
    title: "AI Commands",
    icon: Bot,
    shortcuts: [
      { keys: ["AI", "Command"], description: "Any AI command via chat", platform: "All" },
      { keys: ["Shift", "Tab"], description: "Approve medium-risk action", platform: "All" },
      { keys: ["QR", "Code"], description: "Approve high-risk action", platform: "Mobile" },
    ]
  },
  {
    title: "Navigation",
    icon: Globe,
    shortcuts: [
      { keys: ["Ctrl", "T"], description: "New tab", platform: "Windows/Linux" },
      { keys: ["⌘", "T"], description: "New tab", platform: "Mac" },
      { keys: ["Ctrl", "W"], description: "Close tab", platform: "Windows/Linux" },
      { keys: ["⌘", "W"], description: "Close tab", platform: "Mac" },
      { keys: ["Ctrl", "Tab"], description: "Next tab", platform: "Windows/Linux" },
      { keys: ["⌘", "Tab"], description: "Next tab", platform: "Mac" },
    ]
  },
  {
    title: "System Control",
    icon: Settings,
    shortcuts: [
      { keys: ["Vol", "Cmd"], description: "Set volume via AI", platform: "All" },
      { keys: ["Brightness"], description: "Set brightness via AI", platform: "All" },
    ]
  },
  {
    title: "Automation",
    icon: Calendar,
    shortcuts: [
      { keys: ["Schedule"], description: "Schedule task via AI", platform: "All" },
      { keys: ["Daily", "Weekly"], description: "Set recurrence", platform: "All" },
    ]
  },
  {
    title: "Security",
    icon: Shield,
    shortcuts: [
      { keys: ["Shift", "Tab"], description: "Approve medium-risk action", platform: "All" },
      { keys: ["Mobile", "QR"], description: "Approve high-risk action", platform: "All" },
    ]
  },
  {
    title: "Mobile Sync",
    icon: Wifi,
    shortcuts: [
      { keys: ["QR", "Scan"], description: "Connect mobile app", platform: "Mobile" },
      { keys: ["6-digit"], description: "Verify connection", platform: "Mobile" },
    ]
  }
];

export default function KeyboardShortcutsPage() {
  return (
    <div className="space-y-24">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <Keyboard size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Reference
          </span>
        </div>
        
        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Keyboard <span className="text-white/20">Shortcuts</span>
        </h1>
        
        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Keyboard shortcut reference for Aartiq. System implemented in src/lib/KeyboardShortcutService.ts, src/components/KeyboardShortcutSettings.tsx
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/docs/getting-started"
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} /> Back to Docs
          </Link>
        </div>
      </motion.section>

      <section className="grid gap-8 md:grid-cols-2">
        {shortcutCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                <category.icon size={24} />
              </div>
              <h2 className="text-xl font-black uppercase tracking-wider">{category.title}</h2>
            </div>
            
            <div className="space-y-3">
              {category.shortcuts.map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-sm text-white/60">{shortcut.description}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, keyIndex) => (
                      <span key={keyIndex}>
                        <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/80">
                          {key}
                        </kbd>
                        {keyIndex < shortcut.keys.length - 1 && (
                          <span className="mx-1 text-white/30">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
