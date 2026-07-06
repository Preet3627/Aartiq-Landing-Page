"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Tag,
  FolderTree,
  Code2,
  Monitor,
  Smartphone,
  Server,
  Clock,
  Package,
} from "lucide-react";
import componentData from "@/data/component-data.json";

interface ScannerEntry {
  name: string;
  path: string;
  lines?: number;
  description: string;
  tags?: string[];
  lastModified?: string;
}

const fallbackComponents: ScannerEntry[] = [
  { name: "service-main.js", path: "aartiq-browser/src/service/service-main.js", lines: 375, description: "Entry point for background service, initializes all modules with system tray.", tags: ["Main"] },
  { name: "scheduler.js", path: "aartiq-browser/src/service/scheduler.js", lines: 383, description: "Cron-based task scheduler using node-cron library with timezone support.", tags: ["Scheduler"] },
  { name: "task-queue.js", path: "aartiq-browser/src/service/task-queue.js", lines: 437, description: "Priority queue with retry logic, dead letter handling, and concurrent limiting.", tags: ["Queue"] },
  { name: "pdf-sync.js", path: "aartiq-browser/src/service/pdf-sync.js", lines: 449, description: "PDF file sync server for mobile access with automatic file discovery.", tags: ["Sync"] },
  { name: "model-selector.js", path: "aartiq-browser/src/service/model-selector.js", lines: 244, description: "AI model picker with Ollama, Gemini, OpenAI, Anthropic, Groq options.", tags: ["AI"] },
  { name: "ollama-manager.js", path: "aartiq-browser/src/service/ollama-manager.js", lines: 212, description: "Ollama API integration for local model management with caching.", tags: ["AI"] },
  { name: "notifications.js", path: "aartiq-browser/src/service/notifications.js", lines: 231, description: "Desktop notifications for task completion and errors with icons.", tags: ["Notify"] },
  { name: "ipc-service.js", path: "aartiq-browser/src/service/ipc-service.js", lines: 289, description: "IPC bridge between browser and background service via WebSocket.", tags: ["IPC"] },
  { name: "storage.js", path: "aartiq-browser/src/service/storage.js", lines: 253, description: "File management for task outputs, logs, and generated files.", tags: ["Storage"] },
  { name: "tray-manager.js", path: "aartiq-browser/src/service/tray-manager.js", lines: 246, description: "System tray integration with context menu and status updates.", tags: ["Tray"] },
  { name: "mobile-notifier.js", path: "aartiq-browser/src/service/mobile-notifier.js", lines: 178, description: "Mobile push notification bridge via sync service.", tags: ["Notify"] },
  { name: "sleep-handler.js", path: "aartiq-browser/src/service/sleep-handler.js", lines: 127, description: "System sleep/wake recovery with task resumption.", tags: ["System"] },
];

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function getPlatformIcon(component: ScannerEntry) {
  if (component.path?.includes(".dart")) return Smartphone;
  if (component.path?.startsWith("aartiq-browser/src/service")) return Server;
  return Monitor;
}

function getPlatformLabel(component: ScannerEntry) {
  if (component.path?.includes(".dart")) return "Flutter (Mobile)";
  if (component.path?.startsWith("aartiq-browser/src/service")) return "Background Service";
  return "Desktop (Electron)";
}

function getSourcePrefix(component: ScannerEntry) {
  if (component.path?.includes(".dart")) return "flutter_browser_app/lib/";
  if (component.path?.startsWith("aartiq-browser/src/service")) return "";
  return "aartiq-browser/src/";
}

export default function ComponentDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const allComponents: ScannerEntry[] = [
    ...(componentData.desktop?.components || []),
    ...(componentData.flutter?.components || []),
    ...fallbackComponents,
  ];

  const component = allComponents.find((c) => slugify(c.name) === id);

  if (!component) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2">
          <Package size={14} className="text-white/40" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
            Not Found
          </span>
        </div>
        <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter">
          Component Not Found
        </h1>
        <p className="mb-8 text-lg text-white/40">
          No component found with ID &ldquo;{id}&rdquo;
        </p>
        <Link
          href="/docs/components"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-sky-400"
        >
          <ArrowLeft size={16} /> Back to Components
        </Link>
      </div>
    );
  }

  const Icon = getPlatformIcon(component);
  const platformLabel = getPlatformLabel(component);

  return (
    <div className="space-y-12">
      <Link
        href="/docs/components"
        className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-sky-400"
      >
        <ArrowLeft size={14} /> Back to Components
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/20 to-cyan-500/20">
            <Icon size={28} className="text-sky-400" />
          </div>
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
              {platformLabel}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
              {component.name.replace(/\.[^/.]+$/, "")}
            </h1>
          </div>
        </div>

        {component.description && (
          <p className="max-w-3xl text-lg leading-relaxed text-white/60">
            {component.description}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {component.lines && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-1 flex items-center gap-2 text-white/30">
              <FileText size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Lines</span>
            </div>
            <p className="text-2xl font-black">{component.lines.toLocaleString()}</p>
          </div>
        )}

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <div className="mb-1 flex items-center gap-2 text-white/30">
            <Code2 size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">File</span>
          </div>
          <p className="truncate font-mono text-sm text-white/80">{component.name}</p>
        </div>

        {component.lastModified && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-1 flex items-center gap-2 text-white/30">
              <Calendar size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Last Modified</span>
            </div>
            <p className="text-sm text-white/80">{component.lastModified}</p>
          </div>
        )}

        {component.path && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:col-span-2">
            <div className="mb-1 flex items-center gap-2 text-white/30">
              <FolderTree size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Source Path</span>
            </div>
            <p className="truncate font-mono text-sm text-white/80">
              {getSourcePrefix(component)}{component.path}
            </p>
          </div>
        )}

        {component.tags && component.tags.length > 0 && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 sm:col-span-2">
            <div className="mb-3 flex items-center gap-2 text-white/30">
              <Tag size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
      >
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
          Related Components
        </p>
        <div className="flex items-center gap-2 text-sm text-white/40">
          <Clock size={14} className="shrink-0 text-sky-400" />
          <span>
            Browse all components in the{" "}
            <Link
              href="/docs/components"
              className="font-medium text-sky-400 transition hover:text-sky-300"
            >
              Component Inventory
            </Link>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-8"
      >
        <div className="flex items-center gap-4">
          <Code2 size={24} className="shrink-0 text-sky-400" />
          <div>
            <h3 className="mb-1 text-lg font-black uppercase tracking-wider">
              Auto-Generated Documentation
            </h3>
            <p className="text-sm text-white/40">
              Component metadata is auto-generated by{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-sky-400">
                aartiq-browser/scripts/component-scanner.js
              </code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
