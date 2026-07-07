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
  Import,
  Box,
  FunctionSquare,
  Workflow,
  Blocks,
  Plug,
  GanttChart,
  List,
  Grid3X3,
} from "lucide-react";
import componentData from "@/data/component-data.json";

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
}

interface InterfaceInfo {
  name: string;
  properties: PropInfo[];
}

interface CodeAnalysis {
  importsExternal: string[];
  importsInternal: string[];
  interfaces: InterfaceInfo[];
  hooks: string[];
  componentType: string;
  exports: string[];
  apiUsage: string[];
  keyFunctions: string[];
}

interface ScannerEntry {
  name: string;
  path: string;
  lines?: number;
  description: string;
  tags?: string[];
  lastModified?: string;
  codeAnalysis?: CodeAnalysis;
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

const COMPONENT_TYPE_COLORS: Record<string, string> = {
  "function-component": "text-sky-400 border-sky-500/30 bg-sky-500/10",
  "class-component": "text-violet-400 border-violet-500/30 bg-violet-500/10",
  "utility": "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  "service": "text-amber-400 border-amber-500/30 bg-amber-500/10",
  "react-utility": "text-teal-400 border-teal-500/30 bg-teal-500/10",
};

function ComponentTypeBadge({ type }: { type: string }) {
  const colorClass = COMPONENT_TYPE_COLORS[type] || "text-white/60 border-white/10 bg-white/5";
  const label = type === "function-component" ? "Function Component"
    : type === "class-component" ? "Class Component"
    : type === "react-utility" ? "React Utility"
    : type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${colorClass}`}>
      <Code2 size={12} />
      {label}
    </span>
  );
}

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = true }: {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <summary className="flex cursor-pointer items-center gap-3 p-4 text-sm font-black uppercase tracking-wider text-white/40 hover:text-white/60 transition-colors">
        <Icon size={16} className="shrink-0 text-sky-400" />
        {title}
        <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 transition-transform group-open:rotate-180 opacity-40" />
      </summary>
      <div className="border-t border-white/5 px-4 py-4">
        {children}
      </div>
    </details>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PropsTable({ interfaces }: { interfaces: InterfaceInfo[] }) {
  if (!interfaces.length) {
    return <p className="text-sm text-white/30 italic">No interfaces or type definitions</p>;
  }
  return (
    <div className="space-y-6">
      {interfaces.map((iface) => (
        <div key={iface.name}>
          <h4 className="mb-2 font-mono text-sm font-bold text-sky-400">{iface.name}</h4>
          {iface.properties.length === 0 ? (
            <p className="text-sm text-white/30 italic">No properties</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-white/5">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider text-white/30">Prop</th>
                    <th className="px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider text-white/30">Type</th>
                    <th className="px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider text-white/30">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {iface.properties.map((prop) => (
                    <tr key={prop.name} className="border-b border-white/5 last:border-0">
                      <td className="px-3 py-2 font-mono text-white/80">{prop.name}</td>
                      <td className="px-3 py-2 font-mono text-emerald-400">{prop.type}</td>
                      <td className="px-3 py-2">
                        {prop.required ? (
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">Yes</span>
                        ) : (
                          <span className="text-[10px] font-black uppercase tracking-wider text-white/20">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TagList({ items, color = "sky", icon: Icon }: { items: string[]; color?: string; icon?: any }) {
  if (!items.length) {
    return <p className="text-sm text-white/30 italic">None</p>;
  }
  const colorMap: Record<string, string> = {
    sky: "border-sky-500/20 bg-sky-500/10 text-sky-400",
    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-400",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    rose: "border-rose-500/20 bg-rose-500/10 text-rose-400",
    white: "border-white/10 bg-white/5 text-white/60",
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={`inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 font-mono text-xs ${colorMap[color] || colorMap.white}`}
        >
          {Icon && <Icon size={10} />}
          {item}
        </span>
      ))}
    </div>
  );
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
  const analysis = component.codeAnalysis;

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
        <div className="mb-6 flex items-center gap-4">
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

        <div className="mb-4 flex flex-wrap items-center gap-3">
          {analysis?.componentType && <ComponentTypeBadge type={analysis.componentType} />}
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
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
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

        {analysis && (
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-1 flex items-center gap-2 text-white/30">
              <Box size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Exports</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {analysis.exports.map((exp) => (
                <span key={exp} className="rounded bg-sky-500/10 px-1.5 py-0.5 font-mono text-xs text-sky-400">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {component.path && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
        >
          <div className="mb-1 flex items-center gap-2 text-white/30">
            <FolderTree size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">Source Path</span>
          </div>
          <p className="truncate font-mono text-sm text-white/80">
            {getSourcePrefix(component)}{component.path}
          </p>
        </motion.div>
      )}

      {component.tags && component.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
        >
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
        </motion.div>
      )}

      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
            <Workflow size={14} />
            Code Analysis
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {analysis.hooks.length > 0 && (
              <div className="rounded-xl border border-violet-500/10 bg-violet-500/[0.02] p-4">
                <div className="mb-3 flex items-center gap-2 text-violet-400">
                  <Box size={14} />
                  <span className="text-[10px] font-black uppercase tracking-wider">React Hooks</span>
                </div>
                <TagList items={analysis.hooks} color="violet" />
              </div>
            )}

            {analysis.apiUsage.length > 0 && (
              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-4">
                <div className="mb-3 flex items-center gap-2 text-emerald-400">
                  <Plug size={14} />
                  <span className="text-[10px] font-black uppercase tracking-wider">API / Library Usage</span>
                </div>
                <TagList items={analysis.apiUsage} color="emerald" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <CollapsibleSection title="External Dependencies" icon={Import} defaultOpen={false}>
              {analysis.importsExternal.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {analysis.importsExternal.map((imp) => (
                    <span key={imp} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-white/60">
                      {imp}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30 italic">No external dependencies</p>
              )}
            </CollapsibleSection>

            <CollapsibleSection title="Internal Imports" icon={Grid3X3} defaultOpen={false}>
              {analysis.importsInternal.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {analysis.importsInternal.map((imp) => (
                    <span key={imp} className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-white/60">
                      {imp}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30 italic">No internal imports</p>
              )}
            </CollapsibleSection>

            {analysis.interfaces.length > 0 && (
              <CollapsibleSection title="Props / Types" icon={GanttChart}>
                <PropsTable interfaces={analysis.interfaces} />
              </CollapsibleSection>
            )}

            {analysis.keyFunctions.length > 0 && (
              <CollapsibleSection title="Key Functions" icon={FunctionSquare}>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.keyFunctions.map((fn) => (
                    <span key={fn} className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-xs text-amber-400">
                      {fn}()
                    </span>
                  ))}
                </div>
              </CollapsibleSection>
            )}
          </div>
        </motion.div>
      )}

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
