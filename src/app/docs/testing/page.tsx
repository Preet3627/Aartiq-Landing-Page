"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TestTube,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  FileText,
  BarChart3,
  FlaskConical,
  Bug,
  Activity,
  ArrowRight,
  Layers,
  Cpu,
  ExternalLink
} from "lucide-react";

const testSuites = [
  { file: "skill-loading.test.js", count: 54, focus: "Dynamic skill loading, validation allowlist, require-path resolution" },
  { file: "extraction.test.js", count: 58, focus: "Web extractor, DOM parsing, content extraction edge cases" },
  { file: "tab-intelligence.test.ts", count: 51, focus: "Tab intelligence, domain grouping, smart icons" },
  { file: "sandbox-security.test.js", count: 51, focus: "Fail-closed sandboxing (Seatbelt / bubblewrap / Job Objects), command tokenizer, env sanitization" },
  { file: "component-tests.test.js", count: 37, focus: "React component behavior and props" },
  { file: "security-validator.test.js", count: 42, focus: "Blocklist / injection detection / risk classification" },
  { file: "directory-allowlist.test.js", count: 36, focus: "Path canonicalization, symlink traversal, read/write separation" },
  { file: "dom-engine.test.js", count: 40, focus: "DOM interaction engine, click/fill strategies" },
  { file: "webauthn-service.test.js", count: 26, focus: "WebAuthn / FIDO2 challenge-response flow" },
  { file: "security-fixes.test.js", count: 40, focus: "Regression suite for applied security fixes" },
  { file: "automation.test.js", count: 16, focus: "OS automation layer (click / scroll / app launch)" },
  { file: "dom-handlers.test.js", count: 16, focus: "Browser DOM IPC handlers" },
  { file: "home-intelligence.test.ts", count: 4, focus: "Home intelligence logic" },
];

const covered = [
  "Fail-closed sandbox behavior: every sandbox setup/validation/policy failure returns a structured SANDBOX_* error and the command is never silently run unsandboxed",
  "macOS Seatbelt: real OS-level enforcement tests — writing outside the directory allowlist is denied by the kernel and the file is verified absent",
  "Linux bubblewrap: closed-by-default namespaces, correct --bind vs --ro-bind mapping, network denied by default, bwrap-unavailable fail-closed",
  "Windows Job Object containment: policy fail-closed (network policy rejected as SANDBOX_UNAVAILABLE), runner result parsing, missing-runner fail-closed",
  "Directory allowlist: fs.realpath() canonicalization, ../ traversal, symlink escape, read-only vs read-write separation, invalid-path rejection",
  "Command execution: tokenizer preserves quoted arguments verbatim, direct execution vs explicit shell mode, no string-reconstructed sh -c",
  "Environment sanitization: API keys, tokens, and secrets are stripped from every sandboxed process",
  "Security regressions: 40-test regression suite re-verifying each applied security fix",
];

const limitations = [
  "The Windows Job Object runner (win-job-runner.ps1 / C# P/Invoke) has been reviewed and its result protocol is covered by tests, but it has NOT been executed on real Windows hardware as part of this suite. That verification requires a Windows CI runner.",
  "Seatbelt OS-enforcement tests execute only on macOS; bubblewrap OS-enforcement tests only on Linux hosts where bwrap is installed. The profile-generation and fail-closed config paths are asserted on every platform.",
  "These are unit and integration tests for core modules. They do NOT cover the full Electron UI, installers, MSIX/MSI packaging, or complete end-to-end user flows.",
  "automation.test.js exercises OS-level actions that require macOS automation permissions; on hosts without them the OS calls degrade gracefully and the assertions still pass — the suite records warnings, not failures.",
  "Test counts reflect the repository state at the time this page was generated. Always run npx jest to get current numbers.",
];

export default function TestingPage() {
  const totalTests = testSuites.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-24">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2">
          <TestTube size={14} className="text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">
            Testing &amp; Test Series
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black uppercase tracking-tighter sm:text-7xl">
          Test <span className="text-white/20">Series</span>
        </h1>

        <p className="max-w-3xl text-xl font-medium leading-relaxed text-white/50">
          Aartiq&apos;s core modules are verified with an automated Jest test suite. This page reports
          the real numbers, what is covered, and — honestly — what is not.
        </p>

        {/* Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <BarChart3 size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">{testSuites.length}</h3>
            <p className="text-sm text-white/50">Test Suites</p>
          </div>
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6 text-center">
            <CheckCircle2 size={32} className="mx-auto mb-4 text-sky-400" />
            <h3 className="text-3xl font-black text-sky-400">{totalTests}</h3>
            <p className="text-sm text-white/50">Tests Passing</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <ShieldCheck size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">0</h3>
            <p className="text-sm text-white/50">Failures</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
            <Activity size={32} className="mx-auto mb-4 text-white/40" />
            <h3 className="text-3xl font-black text-white/60">0</h3>
            <p className="text-sm text-white/50">Skipped / Pending</p>
          </div>
        </div>
      </motion.section>

      {/* Per-suite breakdown */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Breakdown
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Test <span className="text-white/20">Suites</span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <th className="px-6 py-4">Suite</th>
                <th className="px-6 py-4">Tests</th>
                <th className="hidden px-6 py-4 md:table-cell">What it verifies</th>
              </tr>
            </thead>
            <tbody>
              {testSuites.map((s, i) => (
                <tr
                  key={s.file}
                  className={`border-b border-white/5 transition hover:bg-white/[0.02] ${
                    i === testSuites.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4 font-mono text-sm text-sky-400">{s.file}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                      {s.count}
                    </span>
                  </td>
                  <td className="hidden px-6 py-4 text-sm text-white/50 md:table-cell">{s.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* What's covered */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Coverage
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            What&apos;s <span className="text-white/20">Covered</span>
          </h2>
        </div>

        <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-10">
          <ul className="space-y-4">
            {covered.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-white/60">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Honest limits */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Honesty First
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Known <span className="text-amber-400">Limits</span>
          </h2>
        </div>

        <div className="rounded-[2rem] border border-amber-500/20 bg-amber-500/5 p-10">
          <div className="mb-8 flex items-center gap-4">
            <AlertTriangle size={40} className="text-amber-400" />
            <div>
              <h3 className="text-xl font-black uppercase tracking-wider">
                What this suite does NOT prove
              </h3>
              <p className="text-sm text-white/50">
                We would rather state these limits plainly than overstate coverage.
              </p>
            </div>
          </div>

          <ul className="space-y-4">
            {limitations.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-white/60">
                <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Run the tests */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="mb-16">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Reproduce
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter sm:text-5xl">
            Run the <span className="text-white/20">Tests</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
            <div className="mb-4 flex items-center gap-3">
              <Terminal size={20} className="text-sky-400" />
              <h3 className="font-bold text-white">Install</h3>
            </div>
            <code className="block rounded-lg bg-black/40 px-4 py-3 font-mono text-sm text-sky-400">
              cd aartiq-browser<br />npm install
            </code>
          </div>
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
            <div className="mb-4 flex items-center gap-3">
              <FlaskConical size={20} className="text-purple-400" />
              <h3 className="font-bold text-white">Run full suite</h3>
            </div>
            <code className="block rounded-lg bg-black/40 px-4 py-3 font-mono text-sm text-purple-400">
              npx jest
            </code>
          </div>
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8">
            <div className="mb-4 flex items-center gap-3">
              <FileText size={20} className="text-emerald-400" />
              <h3 className="font-bold text-white">Run one suite</h3>
            </div>
            <code className="block rounded-lg bg-black/40 px-4 py-3 font-mono text-sm text-emerald-400">
              npx jest tests/sandbox-security.test.js
            </code>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/Preet3627/Aartiq/tree/main/aartiq-browser/tests"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-sky-400 hover:text-white"
          >
            <ExternalLink size={18} />
            View Test Sources
          </a>
          <Link
            href="/docs/security"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-wider text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <Layers size={18} />
            Security Model
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
