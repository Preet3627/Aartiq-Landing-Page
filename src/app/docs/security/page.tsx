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
  FileText,
  Layers,
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
    description: "The AI perceives web pages through screenshots + OCR and a sanitized secure-DOM extractor rather than raw, unprocessed HTML. This significantly reduces DOM-based manipulation attacks, but it is a mitigation, not an absolute guarantee.",
    howItWorks: [
      "Primary input is the rendered page: Electron webContents.capturePage() screenshots (src/main/handlers/browser-handlers.js) and Tesseract.js OCR (src/lib/tesseract-service.js). The AI never runs inside the page's JavaScript realm.",
      "SecureDOMReader (src/components/ai/SecureDOMReader.ts) provides a text fallback path. It blocks script/style/iframe/object/embed/form/input/button tags and nav/footer/header/modal/overlay/ads classes before text extraction.",
      "PII redaction: emails, phone numbers, card numbers, bearer tokens, session IDs, and password/api-key assignments are replaced with [REDACTED] placeholders before content reaches the model.",
      "SecureDOMParser (src/lib/Security.ts) runs the extracted content against shell-primitive, encoding, and injection pattern groups, decodes base64/hex payloads, and rewrites dangerous matches to [BLOCKED: LAYER].",
      "AI Fortress masks API keys and secrets before content reaches the LLM (src/lib/Security.ts, src/components/AIChatSidebar.tsx).",
      "The AI context is explicitly built as read-only: the model cannot modify the DOM; interaction is limited to approved click/fill commands (FIND_AND_CLICK / CLICK_ELEMENT).",
      "Source files: src/lib/Security.ts, src/lib/html-sanitizer.js, src/components/ai/SecureDOMReader.ts"
    ],
    benefits: [
      "Significantly reduces prompt-injection via DOM manipulation — hidden, scripted, or style-obfuscated content is stripped before it reaches the model",
      "Page JavaScript cannot directly invoke the AI's execution layer (Electron context isolation + no DOM-write access); scripts are stripped from AI-visible content",
      "Hidden elements and blocked tags/classes never appear in AI-visible content",
      "Malicious scripts, event handlers (on*=), javascript:, data:, vbscript:, iframe/embed/object are removed from the AI's reading path"
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
      "Commands are scanned for destructive shell primitives and blocked commands (rm, sudo, su, passwd, chgrp, dd if=, mkfs, fork-bomb, command substitution)",
      "Encoded payloads and obfuscation (hex, base64, HTML entities) are decoded via extractBase64Strings and re-checked against injection patterns",
      "Jailbreak patterns ('ignore all previous instructions', etc.) are blocked before content reaches the model",
      "Network-triggering commands (curl, wget) are flagged, and the OS sandbox denies network by default",
      "This layer is explicitly documented as a fast first-pass reject — not sufficient on its own (SecurityValidator.js header)",
      "Source files: src/lib/SecurityValidator.js, src/lib/Security.ts, src/core/command-validator.js"
    ],
    patterns: {
      blocked: [
        { pattern: "rm -rf /", description: "Recursive delete of root" },
        { pattern: "sudo", description: "Blocked command (privilege escalation)" },
        { pattern: "dd if=", description: "Direct disk write" },
        { pattern: ":(){ :|:& };:", description: "Fork bomb" },
        { pattern: "$( ... )", description: "Command substitution" },
        { pattern: "\\x.. hex / chmod 777", description: "Encoded payload / permissive mode" },
        { pattern: "curl / wget", description: "Network download (flagged; sandbox denies net)" }
      ],
      monitored: [
        { pattern: "rm ", description: "File deletion (requires approval)" },
        { pattern: "chmod / chown", description: "Permission change (requires approval)" },
        { pattern: "kill / shutdown / mount", description: "Process/system change (requires approval)" }
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
      "Each directory in the allowlist specifies an access level (Read Only or Read & Write) and recursive flag (src/lib/permission-store.js)",
      "Path canonicalization resolves symlinks via fs.realpathSync before checking against the allowlist — the resolved path is checked, never the user-supplied string (src/core/directory-allowlist.js)",
      "Just-in-time permission prompts request approval before accessing new directories",
      "Batched multi-directory approval allows granting access to multiple paths at once",
      "File management operations (move, copy, open, print) are routed around the shell sandbox",
      "Read/write separation: a read grant must never allow deleting/overwriting — enforced in isPathAllowed() for both read and write operations",
      "Source files: src/core/directory-allowlist.js, src/lib/permission-store.js, src/main/handlers/permission-handlers.js"
    ],
    benefits: [
      "Scopes AI file access to an explicit allowlist — any path outside it is denied with a structured reason",
      "Note: the legacy default allowlist includes the user's home, Desktop, Documents, and Downloads (read-write). Remove or downgrade these in Settings for a stricter posture; the newer directory-allowlist.js default ships with only the app data directory + temp",
      "Symlink traversal attacks are blocked via realpath resolution",
      "Read-only entries never receive write access — enforced in the sandbox profile (macOS/Linux) and by isPathAllowed() on all platforms",
      "Audit trail of all directory access grants with timestamps (comet-audit.jsonl)"
    ],
  },
  {
    name: "OS-Level Sandboxing",
    icon: ShieldOff,
    color: "from-red-500/20 to-rose-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
    level: 5,
    description: "Shell commands execute inside platform-specific OS sandboxes that enforce process, filesystem, and network boundaries. Execution is FAIL-CLOSED: if the sandbox cannot be built and verified, the command is never run — there is no automatic fallback to unsandboxed execution.",
    howItWorks: [
      "macOS: Seatbelt (sandbox-exec) with a closed-by-default profile — (deny file-read*) and (deny file-write*) then re-allow only system paths + allowlisted directories, (deny network*), and (deny process-exec*) with allowlisted exec paths",
      "The Seatbelt profile is written to a temp file and validated with a pre-flight `sandbox-exec -f <profile> /usr/bin/true` run; if the profile fails to compile, the command is rejected (SANDBOX_POLICY_INVALID)",
      "Linux: bubblewrap (bwrap) with unshared pid/net/ipc/uts namespaces, read-only system mounts (/usr, /bin, /sbin, /lib, /lib64, /etc), private /tmp, and --unshare-net",
      "Windows: Job Object containment (src/core/win-job-runner.ps1) — the target is created SUSPENDED, assigned to a Job Object, verified via IsProcessInJob, then resumed; limits (KILL_ON_JOB_CLOSE, active-process cap, job memory, die-on-unhandled-exception) are applied and verified before the target runs a single instruction",
      "Windows explicitly does NOT provide OS-level filesystem or network isolation in this release — the directory allowlist is enforced at the application layer (isPathAllowed), and requesting a per-process network policy fails closed (SANDBOX_UNAVAILABLE)",
      "All platforms: environment is sanitized — only allowlisted variables (PATH, HOME, USER, LANG, LC_ALL, TMPDIR, SHELL, TERM, etc.) pass through; API keys and tokens never reach the sandboxed process (buildSafeEnv)",
      "Network inside the sandbox is denied by default on macOS (deny network*) and Linux (--unshare-net). Per-domain network allowlisting is NOT supported on any platform — requesting it fails closed. Windows cannot enforce per-process network policy in this release",
      "Source files: src/core/sandbox-executor.js, src/core/win-job-runner.ps1, src/core/directory-allowlist.js"
    ],
    benefits: [
      "Defense in depth: even if the regex blocklist is bypassed, the OS sandbox still confines what the command can read, write, execute, and reach on the network",
      "On macOS/Linux the sandbox physically prevents writes outside the workspace + allowlisted write directories; on Windows this is enforced at the application layer by isPathAllowed()",
      "Credential leakage via ambient environment variables is prevented by the env allowlist",
      "Network exfiltration is blocked by default-deny networking inside the sandbox (macOS/Linux), not by firewall rules"
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
    defense: "OS-level sandboxing strips all ambient environment variables. Only explicitly allowlisted variables (PATH, HOME, USER, LANG, LC_ALL, TMPDIR, SHELL, TERM, etc.) are passed to child processes; on Windows only non-credential system variables (SystemRoot, TEMP, USERPROFILE, etc.) pass through.",
    layer: "OS-Level Sandboxing"
  },
  {
    threat: "Network Exfiltration via Shell",
    scenario: "AI is tricked into executing curl to upload sensitive data to an attacker's server",
    defense: "The sandbox denies network by default: macOS Seatbelt emits (deny network*) and Linux bubblewrap runs with --unshare-net. curl/wget downloads are additionally flagged by the command validator, and all shell execution requires human approval. Per-domain allowlisting is not supported; Windows cannot enforce per-process network policy in this release.",
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
            <Layers size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">5</h3>
            <p className="text-sm text-white/50">Enforcement Layers Beyond The Firewall</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <Key size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-3xl font-black text-amber-400">600K</h3>
            <p className="text-sm text-white/50">PBKDF2 Key-Derivation Iterations</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-sm leading-relaxed text-white/40">
          <p>
            The regex blocklist in SecurityValidator.js is documented as a <em>fast first-pass reject layer only</em> —
            not the primary defense. Primary enforcement continues through the remaining layers: the risk-tiered permission store
            (checkShellPermission), the capability controller's ticket-based approval (capability-controller.js), and
            the fail-closed OS sandbox (sandbox-executor.js). The six-layer model cited below reflects this defense-in-depth design.
          </p>
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

      {/* Risk Levels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Risk Assessment
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Risk <span className="text-white/20">Levels</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Every command is classified into one of four risk tiers before it reaches the permission gate. Higher tiers require stronger, more explicit approval.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "Low Risk",
              risk: "Auto-approved",
              icon: ShieldCheck,
              color: "text-emerald-400",
              border: "border-emerald-500/20",
              bg: "bg-emerald-500/5",
              description: "Read-only actions and navigation",
              examples: ["Reading tabs", "Navigating to URLs", "Performing searches"],
              approval: "Auto-approved based on user preferences"
            },
            {
              name: "Medium Risk",
              risk: "Per-action approval",
              icon: ShieldAlert,
              color: "text-amber-400",
              border: "border-amber-500/20",
              bg: "bg-amber-500/5",
              description: "Actions that modify state or affect the system",
              examples: ["Shell commands", "File writes", "Clipboard access"],
              approval: "Per-action approval dialog"
            },
            {
              name: "High Risk",
              risk: "Biometric confirmation",
              icon: ShieldAlert,
              color: "text-red-400",
              border: "border-red-500/20",
              bg: "bg-red-500/5",
              description: "Destructive or irreversible operations",
              examples: ["rm -rf", "dd if=", "Deleting files"],
              approval: "Biometric confirmation (Touch ID / Windows Hello), falling back to OS password prompt; QR/PIN mobile approval for remote-origin commands"
            },
            {
              name: "Critical Risk",
              risk: "Always explicit",
              icon: ShieldOff,
              color: "text-rose-400",
              border: "border-rose-500/30",
              bg: "bg-rose-500/5",
              description: "Remote or privileged operations — never auto-approved",
              examples: ["Remote shell commands", "Privilege escalation (sudo)", "System-level changes"],
              approval: "Always requires explicit approval; never auto-approved. Routed through the capability controller's ticket-based flow."
            }
          ].map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col gap-6 rounded-2xl border ${tier.border} ${tier.bg} p-8 lg:flex-row lg:items-center lg:justify-between`}
            >
              <div className="flex items-start gap-4">
                <tier.icon size={24} className={`mt-1 shrink-0 ${tier.color}`} />
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-white">{tier.name}</h4>
                    <span className={`rounded-full ${tier.bg} px-3 py-1 text-[10px] font-black uppercase tracking-wider ${tier.color}`}>
                      {tier.risk}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/40">{tier.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tier.examples.map((ex) => (
                      <code key={ex} className="rounded bg-black/30 px-2 py-1 text-xs text-white/50">{ex}</code>
                    ))}
                  </div>
                </div>
              </div>
              <div className="max-w-sm lg:text-right">
                <p className="text-xs font-black uppercase tracking-wider text-white/30">Approval</p>
                <p className="mt-1 text-sm text-white/60">{tier.approval}</p>
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

      {/* Remote Device Security */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Remote Access
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Remote Device <span className="text-white/20">Security</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Commands originating from a paired mobile device receive the same validation as local commands — plus additional scrutiny because the origin is remote.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Smartphone size={40} className="mb-6 text-sky-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Elevated Risk for Remote Origin</h3>
            <p className="mb-6 text-white/50">
              WiFi Sync commands from paired mobile devices pass through the exact same validation and permission checks as local commands, with one difference: the remote origin elevates the risk tier by one level.
            </p>
            <ul className="space-y-3">
              {[
                "low → medium",
                "medium → high",
                "high → critical (never auto-approved)",
                "Critical-risk commands are never auto-approved, regardless of origin"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-emerald-400" />
                  <span className="text-white/60">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-10">
            <Shield size={40} className="mb-6 text-emerald-400" />
            <h3 className="mb-4 text-xl font-black uppercase tracking-wider">High-Risk Remote Actions</h3>
            <p className="mb-6 text-white/50">
              Power actions and shell commands from a remote device require QR/PIN approval before execution, matching the on-device high-risk flow.
            </p>
            <ul className="space-y-3">
              {[
                "Shutdown, restart, sleep, and lock require QR/PIN approval",
                "Remote shell commands are validated by SecurityValidator, routed through the capability controller, and executed via execFile (no shell interpretation)",
                "The MCP server binds to 127.0.0.1 only — no external network exposure",
                "Pairing tokens expire after 10 minutes"
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

        {/* Vault Migration */}
        <div className="mt-8 rounded-[2rem] border border-sky-500/20 bg-sky-500/5 p-10">
          <FileKey size={40} className="mb-6 text-sky-400" />
          <h3 className="mb-4 text-xl font-black uppercase tracking-wider">Vault Migration</h3>
          <p className="mb-6 text-white/50">
            Legacy vault entries are automatically detected and re-encrypted to the modern E2EE2 format — the older formats used weaker key derivation.
          </p>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                format: "LCL:",
                desc: "Plaintext base64 — no encryption, no salt",
                status: "Legacy"
              },
              {
                format: "E2EE:",
                desc: "PBKDF2 100K iterations, no salt",
                status: "Legacy"
              },
              {
                format: "E2EE2:",
                desc: "PBKDF2 600K iterations, per-entry random salt + IV",
                status: "Current"
              }
            ].map((v) => (
              <div key={v.format} className="rounded-xl bg-black/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <code className="font-mono text-sky-300">{v.format}</code>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                    v.status === "Current"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-xs text-white/40">{v.desc}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "Atomic vault writes — backup before migration, rollback on failure",
              "Proactive migration re-encrypts LCL: and E2EE: entries to E2EE2: on demand",
              "Migration requires biometric / native verification before re-encryption begins"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 text-emerald-400" />
                <span className="text-white/60">{item}</span>
              </li>
            ))}
          </ul>
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

      {/* Security Test Coverage */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Verification
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Security <span className="text-white/20">Test Coverage</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/40">
            Every layer above is backed by automated regression tests. The suite runs in CI on every push and protects the security invariants from silent regressions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
            <Bug size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">488</h3>
            <p className="text-sm text-white/50">Total Jest tests passing</p>
          </div>
          <div className="rounded-[2rem] border border-sky-500/20 bg-sky-500/5 p-8 text-center">
            <ShieldCheck size={32} className="mx-auto mb-4 text-sky-400" />
            <h3 className="text-3xl font-black text-sky-400">17</h3>
            <p className="text-sm text-white/50">Approval-ticket regression tests</p>
          </div>
          <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-8 text-center">
            <Layers size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-3xl font-black text-amber-400">6</h3>
            <p className="text-sm text-white/50">Security layers under test</p>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-black uppercase tracking-wider text-white/70">
            <FileText size={18} className="text-emerald-400" /> New: approval-ticket-security.test.js
          </h4>
          <p className="mb-4 text-sm text-white/50">
            A dedicated regression suite for the ticket-based approval + capability-controller system. It locks in the fixes for the audit findings and fails if any invariant regresses.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Red 1 — redeemTicket verifies the params/context hash (tamper → 'tampered')",
              "Red 2 — persistent grant cannot override an 'always' approval",
              "Red 3 — 'first-time-per-session' never becomes a persistent grant",
              "Red 4 — call-shape hashing agrees on context at register + verify",
              "Red 5 / Orange 6 — missing params fail constraints; 'optional' allows absence",
              "Orange 7/8 — registration gated to a ticket; pattern validates the action",
              "Orange 9 — regex patterns length-limited against catastrophic backtracking",
              "Orange 10 — unknown ticket IDs are rejected",
              "Yellow 11 — tickets bound to capabilityVersion; replaceAction invalidates them",
              "Yellow 12 — returned ticket params are defensive clones",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-xs text-white/60">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/30">
            Source: <code className="font-mono">aartiq-browser/tests/approval-ticket-security.test.js</code>
          </p>
        </div>
      </motion.section>
    </div>
  );
}