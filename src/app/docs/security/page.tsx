"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle,
  CheckCircle2,
  CircleX,
  Smartphone,
  Terminal,
  Key,
  Scan,
  ArrowRight,
  Layers,
  FileWarning,
  UserCheck,
  Bug,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  LockKeyhole,
  Server,
  FileKey
} from "lucide-react";

const securityLayers = [
  {
    name: "Visual Sandbox",
    icon: Eye,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    level: 1,
    description: "The AI perceives web pages through screenshots and OCR rather than raw HTML, significantly reducing DOM-based manipulation attacks.",
    howItWorks: [
      "Full-page screenshots provide visual context",
      "Tesseract.js OCR extracts visible text and layout",
      "SecureDOMParser analyzes content for injection patterns and strips executable code",
      "AI Fortress masks API keys and secrets before content reaches the LLM",
      "Source files: src/lib/Security.ts, src/lib/html-sanitizer.js, src/components/ai/SecureDOMReader.ts"
    ],
    benefits: [
      "Prevents prompt injection via DOM manipulation",
      "No JavaScript can influence AI behavior",
      "Hidden elements remain invisible to AI",
      "Malicious scripts cannot reach the AI layer"
    ],
    diagram: {
      browser: "Chrome / WebView",
      capture: "Screenshot Capture",
      process: "OCR Processing",
      ai: "AI Model",
      flow: ["browser", "capture", "process", "ai"]
    }
  },
  {
    name: "Syntactic Firewall",
    icon: Terminal,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    level: 2,
    description: "Every command is analyzed for dangerous patterns before execution.",
    howItWorks: [
      "Commands are scanned for shell primitives (rm -rf, sudo, dd)",
      "Encoded payloads and obfuscation are decoded and checked",
      "Jailbreak patterns and role-override attempts are blocked",
      "Network-based attacks (curl to malicious servers) are prevented",
      "Source files: src/lib/SecurityValidator.js, src/core/command-validator.js"
    ],
    patterns: {
      blocked: [
        { pattern: "rm -rf", description: "Recursive delete" },
        { pattern: "sudo ", description: "Privilege escalation" },
        { pattern: "dd if=", description: "Direct disk write" },
        { pattern: ":(){ :|:& };:", description: "Fork bomb" },
        { pattern: "eval(base64", description: "Encoded payload" },
        { pattern: "curl\\s+-", description: "Network request" },
        { pattern: "wget\\s+", description: "Network download" }
      ],
      monitored: [
        { pattern: "rm ", description: "File deletion" },
        { pattern: "chmod 777", description: "Permission change" },
        { pattern: "kill ", description: "Process termination" }
      ]
    },
    benefits: [
      "Stops known attack patterns at the gate",
      "Prevents accidental destructive commands",
      "Provides logging for security audits",
      "Custom rules can be added by administrators"
    ]
  },
  {
    name: "Human-in-the-Loop",
    icon: UserCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    level: 3,
    description: "Critical actions require explicit human approval before execution.",
    approvalTiers: [
      {
        name: "Low Risk",
        risk: "Instant / Shift+Tab",
        description: "Read-only actions, navigation, volume changes",
        examples: ["Taking screenshots", "Navigating to URLs", "Adjusting volume"]
      },
      {
        name: "Medium Risk",
        risk: "Shift+Tab Required",
        description: "Actions that modify browser state or open apps",
        examples: ["Filling forms", "Clicking buttons", "Opening applications"]
      },
      {
        name: "High Risk",
        risk: "QR Code + Mobile Approval",
        description: "Shell commands, external app clicks, system changes",
        examples: ["Shell command execution", "External app automation", "File modifications"]
      }
    ],
    howItWorks: [
      "AI generates a command with proposed action",
      "User sees the exact command before execution",
      "Medium risk: User can approve with keyboard shortcut",
      "High risk: User must scan QR code with mobile app",
      "Command only executes after explicit approval",
      "Source files: src/main/handlers/permission-handlers.js, src/components/ai/ClickPermissionModal.tsx, src/main/permission-store.js"
    ],
    benefits: [
      "No automated execution of destructive commands",
      "QR approval ensures physical presence",
      "Mobile app confirms identity",
      "User approval required for execution"
    ]
  },
  {
    name: "Directory Allowlist",
    icon: Lock,
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
    level: 4,
    description: "AI file access is restricted to explicitly approved directories with fine-grained read/write permissions.",
    howItWorks: [
      "Each directory in the allowlist specifies access level (Read Only or Read & Write)",
      "Path canonicalization resolves symlinks before checking against the allowlist",
      "Just-in-time permission prompts request approval before accessing new directories",
      "Batched multi-directory approval allows granting access to multiple paths at once",
      "File management operations (move, copy, open, print) are routed around the shell sandbox",
      "Read/write separation: a grant to read must not allow deleting/overwriting",
      "Source files: src/core/directory-allowlist.js, src/main/handlers/permission-handlers.js"
    ],
    benefits: [
      "Prevents AI from accessing sensitive directories (Documents, Desktop, etc.)",
      "Symlink traversal attacks are blocked via realpath resolution",
      "Write operations on read-only entries are denied at the kernel level",
      "Audit trail of all directory access grants with timestamps"
    ]
  },
  {
    name: "OS-Level Sandboxing",
    icon: ShieldOff,
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    level: 5,
    description: "Shell commands execute within platform-specific OS sandboxes that enforce filesystem, network, and process boundaries.",
    howItWorks: [
      "macOS: Seatbelt sandbox profiles restrict filesystem writes and network access",
      "Linux: bubblewrap (bwrap) creates isolated namespaces with read-only system paths",
      "Windows: Job Objects confine processes, ACLs restrict filesystem, Firewall blocks network",
      "All platforms: Environment variables are sanitized — API keys and tokens are never exposed",
      "Network domain allowlist: only explicitly approved destinations are reachable",
      "Source files: src/core/sandbox-executor.js, src/core/directory-allowlist.js"
    ],
    benefits: [
      "Even if regex blocklist misses a dangerous command, the OS sandbox blocks it",
      "Processes physically cannot write outside approved directories",
      "Credential leakage via ambient env vars is prevented",
      "Network exfiltration is blocked at the firewall level"
    ]
  },
  {
    name: "Capability-Scoped Execution",
    icon: ShieldCheck,
    color: "from-sky-500/20 to-indigo-500/20",
    borderColor: "border-sky-500/30",
    iconColor: "text-sky-400",
    level: 6,
    description: "Actions must be explicitly registered with a named handler and approval tier. Unregistered actions are rejected.",
    howItWorks: [
      "Each allowed action is registered with the CapabilityController",
      "Approval tiers: never (auto-approved), first-time-per-session, always (explicit confirm)",
      "Ticket-based authorization ensures single-use approval for high-risk actions",
      "Unregistered actions don't exist as callable surfaces — prompt injection cannot invoke them",
      "Source files: src/core/capability-controller.js, src/core/command-validator.js"
    ],
    benefits: [
      "Removes dangerous primitives from the attack surface entirely",
      "No amount of prompt injection can invoke an unregistered action",
      "Ticket system prevents replay attacks on approved actions",
      "Granular control over what the AI can and cannot do"
    ]
  }
];

const threatScenarios = [
  {
    threat: "Prompt Injection via Hidden Text",
    scenario: "A malicious webpage hides prompt injection instructions in invisible text",
    defense: "Visual Sandbox prevents the AI from seeing hidden DOM elements. OCR only captures visible, rendered text.",
    layer: "Visual Sandbox"
  },
  {
    threat: "Malicious JavaScript Redirect",
    scenario: "A webpage uses JavaScript to redirect the AI to a phishing site",
    defense: "The AI only sees screenshots of the actual rendered page. JavaScript execution is blocked from the AI's perspective.",
    layer: "Visual Sandbox"
  },
  {
    threat: "Social Engineering via Commands",
    scenario: "An attacker tricks the AI into running 'rm -rf /'",
    defense: "The Syntactic Firewall blocks execution of dangerous shell patterns regardless of how the command is phrased.",
    layer: "Syntactic Firewall"
  },
  {
    threat: "Context Injection via Context Switching",
    scenario: "A webpage contains instructions that attempt to override AI behavior",
    defense: "All user-provided content is filtered for injection patterns before reaching the AI context.",
    layer: "Syntactic Firewall"
  },
  {
    threat: "Unauthorized Shell Execution",
    scenario: "AI executes a destructive shell command",
    defense: "Human-in-the-Loop requires explicit approval for all shell commands. High-risk commands require QR approval.",
    layer: "HITL"
  },
  {
    threat: "Remote Code Execution",
    scenario: "AI is tricked into downloading and running malicious code",
    defense: "Shell commands requiring downloads are blocked by default. User approval ensures no unauthorized code execution.",
    layer: "HITL + Firewall"
  },
  {
    threat: "Symlink Traversal Attack",
    scenario: "Attacker creates a symlink in an allowed directory pointing to /etc/passwd or other sensitive files",
    defense: "Path canonicalization resolves all symlinks via fs.realpath() before checking against the directory allowlist. The resolved path is checked, not the user-supplied path.",
    layer: "Directory Allowlist"
  },
  {
    threat: "Credential Leakage via Environment Variables",
    scenario: "AI executes a command that inherits the parent process's environment with API keys and tokens",
    defense: "OS-level sandboxing strips all ambient environment variables. Only explicitly allowlisted variables (PATH, HOME, USER, LANG) are passed to child processes.",
    layer: "OS-Level Sandboxing"
  },
  {
    threat: "Network Exfiltration via Shell",
    scenario: "AI is tricked into executing curl to upload sensitive data to an attacker's server",
    defense: "Windows Firewall rules block all outbound connections by default. Only explicitly allowlisted domains are permitted. Network restrictions auto-expire after the execution window.",
    layer: "OS-Level Sandboxing"
  },
  {
    threat: "Unauthorized API Invocation",
    scenario: "Prompt injection attempts to invoke an unregistered shell command or system action",
    defense: "Capability-Scoped Execution rejects unregistered actions entirely. If there's no registered run_shell_command action, no amount of prompt injection can invoke one.",
    layer: "Capability-Scoped"
  }
];

const permissionLevels = [
  { name: "Screen Reading", description: "Required for AI to see page content", required: true },
  { name: "Shell Execution", description: "Required for terminal commands", highRisk: true },
  { name: "App Launching", description: "Required for opening applications", mediumRisk: true },
  { name: "File System Access", description: "Required for PDF generation and downloads", required: true },
  { name: "Network Access", description: "Required for web browsing and API calls", required: true },
  { name: "Clipboard Access", description: "Required for copy/paste functionality", mediumRisk: true },
  { name: "Directory Allowlist", description: "Controls which directories AI can access", highRisk: true },
  { name: "OS-Level Sandboxing", description: "Enforces filesystem and network boundaries", required: true }
];

const encryptionDetails = {
  algorithm: "AES-256-GCM",
  keyDerivation: "PBKDF2-SHA256",
  iterations: 600000,
  saltLength: 16,
  ivLength: 12,
  description: "All sensitive data at rest is encrypted using AES-256-GCM with authenticated encryption and PBKDF2 key derivation.",
  implementation: {
    browser: "Web Crypto API (crypto.subtle)",
    node: "Node.js crypto module",
    features: [
      "Authenticated encryption (GCM mode) — tampered ciphertext is rejected",
      "Random salt + IV per encryption operation",
      "PBKDF2 key derivation with 600,000 iterations (OWASP 2023+)",
      "No silent fallback — encryption requires a passphrase or throws",
      "encodeLocalOnly() as an explicit escape hatch for non-sensitive data"
    ]
  },
  useCases: [
    { data: "Sync credentials", method: "Encrypted with user passphrase" },
    { data: "API keys", method: "AES-256-GCM with derived key" },
    { data: "Chat history", method: "End-to-end encrypted sync" },
    { data: "File transfers", method: "P2P encrypted relay" },
    { data: "Vault passwords", method: "Field-level encryption with keychain" },
    { data: "Legacy data", method: "Proactive migration to E2EE2: format" }
  ]
};

const apiKeyProtection = {
  description: "API keys are protected through multiple layers of security.",
  mechanisms: [
    {
      name: "Key Redaction",
      description: "API keys are automatically masked in logs and console output",
      pattern: /Bearer|token|api[_-]?key|secret/i,
      replacement: "[REDACTED]"
    },
    {
      name: "Secure Storage",
      description: "Keys stored in encrypted electron-store with OS keychain integration",
      location: "~/.config/aartiq-browser/secure/"
    },
    {
      name: "Environment Isolation",
      description: "Keys are never exposed to renderer process without explicit access",
      method: "Context isolation + preload bridge"
    },
    {
      name: "Auto-Masking",
      description: "AI prompts are scrubbed for API keys before processing",
      patterns: ["sk-... (OpenAI)", "AIza... (Google)", "anthropic-... (Anthropic)", "gsk_... (Groq)"]
    }
  ],
  tokenGeneration: {
    method: "crypto.getRandomValues()",
    entropy: "256-bit CSPRNG",
    length: "6-digit PIN / 8-char alphanumeric",
    purpose: "Session tokens, pairing codes, QR verification"
  }
};

export default function SecurityPage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-5 py-2">
          <Shield size={14} className="text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
            Security Model
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Defense-in-Depth <span className="text-white/20">Security</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Aartiq uses a defense-in-depth model with six independent security layers: visual sandbox, syntactic firewall, human-in-the-loop authorization, directory allowlist, OS-level sandboxing, and capability-scoped execution. Source implementations: src/lib/Security.ts, src/lib/SecurityValidator.js, src/core/command-validator.js, src/core/directory-allowlist.js, src/core/sandbox-executor.js
        </p>

          {/* Security Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 text-center">
            <ShieldCheck size={32} className="mx-auto mb-4 text-sky-400" />
            <h3 className="text-3xl font-black text-sky-400">6</h3>
            <p className="text-sm text-white/50">Security Layers</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <Terminal size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">22</h3>
            <p className="text-sm text-white/50">Gated IPC Channels</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <FileWarning size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-3xl font-black text-amber-400">9</h3>
            <p className="text-sm text-white/50">Monitoring-Only Channels</p>
          </div>
        </div>
      </motion.section>

      {/* Security Layers */}
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
            The Six <span className="text-white/20">Layers</span>
          </h2>
        </div>

        <div className="relative space-y-8">
          {/* Connection Lines */}
          <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500/50 via-amber-500/50 to-emerald-500/50 hidden lg:block" />

          {securityLayers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Level Indicator */}
              <div className="absolute -left-4 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-black text-white shadow-lg lg:-left-16 lg:top-0">
                {layer.level}
              </div>

              <div className={`rounded-[2rem] border ${layer.borderColor} bg-gradient-to-br ${layer.color} p-10`}>
                <div className="mb-8 flex items-start gap-6">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/5 ${layer.iconColor} shadow-lg`}>
                    <layer.icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-wider">{layer.name}</h3>
                    <p className="mt-2 text-white/60">{layer.description}</p>
                  </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white/40">
                      <CheckCircle2 size={16} className={layer.iconColor} /> How It Works
                    </h4>
                    <ul className="space-y-3">
                      {layer.howItWorks.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full ${layer.iconColor.replace('text-', 'bg-')}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white/40">
                      <Shield size={16} className={layer.iconColor} /> Benefits
                    </h4>
                    <ul className="space-y-3">
                      {layer.benefits.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-white/60">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full ${layer.iconColor.replace('text-', 'bg-')}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pattern examples for Syntactic Firewall */}
                {layer.patterns && (
                  <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
                      <h5 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-red-400">
                        <CircleX size={16} /> Blocked Patterns
                      </h5>
                      <div className="space-y-2">
                        {layer.patterns.blocked.map((p) => (
                          <div key={p.pattern} className="flex items-center justify-between">
                            <code className="rounded bg-red-500/10 px-2 py-1 text-xs text-red-300">{p.pattern}</code>
                            <span className="text-xs text-white/40">{p.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
                      <h5 className="mb-4 flex items-center gap-2 text-sm font-black uppercase text-amber-400">
                        <AlertTriangle size={16} /> Monitored Patterns
                      </h5>
                      <div className="space-y-2">
                        {layer.patterns.monitored.map((p) => (
                          <div key={p.pattern} className="flex items-center justify-between">
                            <code className="rounded bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{p.pattern}</code>
                            <span className="text-xs text-white/40">{p.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Approval Tiers for HITL */}
                {layer.approvalTiers && (
                  <div className="mt-8">
                    <h4 className="mb-6 text-sm font-black uppercase tracking-wider text-white/40">Approval Tiers</h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {layer.approvalTiers.map((tier) => (
                        <div key={tier.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                          <div className="mb-3 flex items-center justify-between">
                            <h5 className="font-bold text-white">{tier.name}</h5>
                            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-black uppercase text-white/40">
                              {tier.risk}
                            </span>
                          </div>
                          <p className="mb-4 text-xs text-white/40">{tier.description}</p>
                          <div className="space-y-1">
                            {tier.examples.map((ex) => (
                              <p key={ex} className="text-xs text-white/30">• {ex}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Threat Scenarios */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Threat Model
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Threat <span className="text-white/20">Scenarios</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            See how each security layer protects against common attack vectors.
          </p>
        </div>

        <div className="space-y-4">
          {threatScenarios.map((threat, i) => (
            <motion.div
              key={threat.threat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-8 lg:grid-cols-[1fr_2fr_1fr]"
            >
              <div>
                <AlertTriangle size={20} className="mb-3 text-amber-400" />
                <h4 className="font-bold text-white">{threat.threat}</h4>
                <p className="mt-2 text-xs text-white/40">{threat.scenario}</p>
              </div>
              <div className="border-x border-white/5 px-6">
                <ShieldCheck size={20} className="mb-3 text-emerald-400" />
                <h4 className="font-bold text-white">Defense</h4>
                <p className="mt-2 text-sm text-white/60">{threat.defense}</p>
              </div>
              <div className="text-right">
                <span className="rounded-full bg-sky-500/10 px-4 py-2 text-xs font-black uppercase text-sky-400">
                  {threat.layer}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Permission Levels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Permissions
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Permission <span className="text-white/20">Levels</span>
          </h2>
        </div>

        <div className="space-y-4">
          {permissionLevels.map((perm, i) => (
            <motion.div
              key={perm.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="flex items-center gap-4">
                {perm.highRisk ? (
                  <ShieldAlert size={20} className="text-red-400" />
                ) : perm.mediumRisk ? (
                  <ShieldAlert size={20} className="text-amber-400" />
                ) : (
                  <ShieldCheck size={20} className="text-sky-400" />
                )}
                <div>
                  <h4 className="font-bold text-white">{perm.name}</h4>
                  <p className="text-sm text-white/40">{perm.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {perm.highRisk && (
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase text-red-400">
                    High Risk
                  </span>
                )}
                {perm.mediumRisk && (
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase text-amber-400">
                    Medium Risk
                  </span>
                )}
                {perm.required && (
                  <span className="rounded-full bg-sky-500/10 px-3 py-1 text-[10px] font-black uppercase text-sky-400">
                    Required
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Mobile Approval Process */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            High-Risk Actions
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            QR Code <span className="text-white/20">Approval</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Smartphone size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Mobile App Approval</h3>
            <p className="mb-8 text-white/50">
              High-risk actions require physical confirmation via the Aartiq mobile app.
            </p>
            
            <div className="space-y-6">
              {[
                { step: 1, title: "Action Triggered", desc: "AI attempts high-risk command" },
                { step: 2, title: "QR Displayed", desc: "Desktop shows unique QR code" },
                { step: 3, title: "Scan & Verify", desc: "Mobile app scans QR" },
                { step: 4, title: "PIN Confirmation", desc: "Enter 6-digit verification code" },
                { step: 5, title: "Command Executed", desc: "Action proceeds after approval" }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sm font-black text-sky-400">
                    {item.step}
                  </span>
                  <div>
                    <h5 className="font-bold text-white">{item.title}</h5>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Scan size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Security Guarantees</h3>
            
            <ul className="space-y-4">
              {[
                "QR codes are single-use only",
                "Each QR code is cryptographically unique",
                "PIN codes are generated per-session",
                "Mobile must be paired via secure handshake",
                "Failed attempts are logged with timestamps",
                "All approvals are logged with timestamps"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-emerald-400" />
                  <span className="text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Encryption Details */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Encryption
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            E2E <span className="text-white/20">Encryption</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-purple-500/20 bg-purple-500/5 p-10">
            <LockKeyhole size={40} className="mb-6 text-purple-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">AES-256-GCM</h3>
            <p className="mb-6 text-white/50">
              {encryptionDetails.description}
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="text-sm text-white/60">Algorithm</span>
                <code className="text-sm font-mono text-purple-400">{encryptionDetails.algorithm}</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="text-sm text-white/60">Key Derivation</span>
                <code className="text-sm font-mono text-purple-400">{encryptionDetails.keyDerivation}</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="text-sm text-white/60">Iterations</span>
                <code className="text-sm font-mono text-purple-400">{encryptionDetails.iterations.toLocaleString('en-US')}</code>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                <span className="text-sm text-white/60">IV Length</span>
                <code className="text-sm font-mono text-purple-400">{encryptionDetails.ivLength} bytes</code>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Server size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Implementation</h3>
            
            <div className="mb-6 space-y-3">
              {encryptionDetails.implementation.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <span className="text-sm text-white/60">{feature}</span>
                </div>
              ))}
            </div>

            <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-white/40">Use Cases</h4>
            <div className="space-y-3">
              {encryptionDetails.useCases.map((useCase, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <span className="text-sm text-white/60">{useCase.data}</span>
                  <span className="text-xs text-white/40">{useCase.method}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
              <p className="text-xs text-purple-300">Source: src/lib/crypto-utils.ts</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* API Key Protection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            API Key Storage
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            API Key <span className="text-white/20">Protection</span>
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {apiKeyProtection.mechanisms.slice(0, 2).map((mechanism, i) => (
              <div key={i} className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8">
                <FileKey size={32} className="mb-4 text-amber-400" />
                <h3 className="mb-3 text-lg font-black uppercase tracking-wider">{mechanism.name}</h3>
                <p className="text-sm text-white/50">{mechanism.description}</p>
                {mechanism.pattern && (
                  <div className="mt-4 rounded-lg bg-white/5 p-3">
                    <code className="text-xs font-mono text-amber-300">{mechanism.pattern.source}</code>
                    <span className="ml-2 text-xs text-white/40">→ {mechanism.replacement}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="grid gap-6 lg:grid-cols-2">
            {apiKeyProtection.mechanisms.slice(2, 4).map((mechanism, i) => (
              <div key={i} className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
                <Lock size={32} className="mb-4 text-sky-400" />
                <h3 className="mb-3 text-lg font-black uppercase tracking-wider">{mechanism.name}</h3>
                <p className="text-sm text-white/50">{mechanism.description}</p>
                {mechanism.patterns && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mechanism.patterns.map((pattern, j) => (
                      <code key={j} className="rounded bg-white/5 px-2 py-1 text-xs text-white/40">
                        {pattern}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8">
            <FileKey size={32} className="mb-4 text-amber-400" />
            <h3 className="mb-3 text-lg font-black uppercase tracking-wider">Source Files</h3>
            <p className="text-sm text-white/50">src/lib/firebaseConfigStorage.ts, src/lib/shared-keychain.js</p>
          </div>

          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8">
            <Key size={32} className="mb-4 text-emerald-400" />
            <h3 className="mb-4 text-lg font-black uppercase tracking-wider">Token Generation</h3>
            <div className="grid gap-6 lg:grid-cols-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white/30">Method</p>
                <code className="mt-2 block text-sm font-mono text-emerald-400">
                  crypto.getRandomValues()
                </code>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white/30">Entropy</p>
                <code className="mt-2 block text-sm font-mono text-emerald-400">
                  256-bit CSPRNG
                </code>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-white/30">Uses</p>
                <p className="mt-2 text-sm text-white/60">
                  Session tokens, pairing codes, QR verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Capability-Scoped Execution */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Capability Model
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Capability-<span className="text-white/20">Scoped</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Instead of trying to detect dangerous requests via regex, the system constrains what actions the AI can invoke at all — each with its own approval policy.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-sky-500/20 bg-sky-500/5 p-10">
            <Shield size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Register</h3>
          <p className="mb-6 text-white/50">
                Each allowed action is explicitly registered with a named handler and an approval tier. If an action isn't registered, it doesn't exist as a callable surface. The controller is wired into both the main process (<code className="text-sky-300">main.js</code>) and the command executor (<code className="text-sky-300">command-executor.js</code>).
              </p>
              <div className="rounded-xl bg-black/20 p-4 font-mono text-sm">
                <div className="text-sky-400">registerAction({'{'}</div>
                <div className="ml-4 text-white/60">name: "click_element",</div>
                <div className="ml-4 text-white/60">requiresApproval: "first-time-per-session"</div>
                <div className="text-sky-400">{'}'})</div>
              </div>
          </div>

          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-10">
            <UserCheck size={40} className="mb-6 text-amber-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Execute</h3>
            <p className="mb-6 text-white/50">
              Execution is gated by the controller. Unregistered actions are rejected outright. Registered actions are allowed or queued for approval based on their tier.
            </p>
            <div className="space-y-3">
              {[
                { tier: "never", desc: "Approved automatically (read-only)" },
                { tier: "first-time-per-session", desc: "Approved once per session" },
                { tier: "always", desc: "Requires explicit confirmation each time" }
              ].map((tier) => (
                <div key={tier.tier} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <code className="text-xs font-mono text-amber-300">{tier.tier}</code>
                  <span className="text-xs text-white/40">{tier.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck size={24} className="mt-1 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Why this matters</h4>
              <p className="text-sm text-white/60">
                Regex-based threat detection can be bypassed — obfuscation, synonyms, and encoding all defeat pattern matching. 
                A capability-scoped model doesn't try to detect danger in text; it removes the dangerous primitive from the 
                attack surface entirely. If there's no registered <code className="text-emerald-300">run_shell_command</code> action, 
                no amount of prompt injection can invoke one.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}