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
  { file: "sandbox-security.test.js", count: 65, focus: "Fail-closed sandboxing (Seatbelt / bubblewrap / AppContainer + Job Objects), macOS adversarial OS-enforcement (AF_UNIX + signal confinement), command tokenizer, env sanitization" },
  { file: "windows-job-sandbox.test.js", count: 31, focus: "Windows AppContainer JS contract + runtime matrix (suspended AppContainer start, OS-enforced ACL allowlist, verified job, grandchild containment, secret isolation, KILL_ON_JOB_CLOSE)" },
  { file: "linux-bwrap-sandbox.test.js", count: 14, focus: "bubblewrap arg generation, namespace/unshare flags (pid/net/ipc/uts/user/cgroup), capability pre-flight fail-closed, Linux runtime enforcement" },
  { file: "security-fixes.test.js", count: 40, focus: "Regression suite for applied security fixes" },
  { file: "security-validator.test.js", count: 42, focus: "Blocklist / injection detection / risk classification" },
  { file: "directory-allowlist.test.js", count: 36, focus: "Path canonicalization, symlink traversal, read/write separation" },
  { file: "approval-ticket-security.test.js", count: 25, focus: "Ticket-based approval + capability-controller regression (audit findings)" },
  { file: "skill-loading.test.js", count: 54, focus: "Dynamic skill loading, validation allowlist, require-path resolution" },
  { file: "extraction.test.js", count: 15, focus: "Web extractor, DOM parsing, content extraction edge cases (declared test blocks; it.each expands case count)" },
  { file: "tab-intelligence.test.ts", count: 51, focus: "Tab intelligence, domain grouping, smart icons" },
  { file: "dom-engine.test.js", count: 40, focus: "DOM interaction engine, click/fill strategies" },
  { file: "component-tests.test.js", count: 37, focus: "React component behavior and props" },
  { file: "webauthn-service.test.js", count: 26, focus: "WebAuthn / FIDO2 challenge-response flow" },
  { file: "automation.test.js", count: 16, focus: "OS automation layer (click / scroll / app launch)" },
  { file: "dom-handlers.test.js", count: 16, focus: "Browser DOM IPC handlers" },
  { file: "home-intelligence.test.ts", count: 4, focus: "Home intelligence logic" },
];

const covered = [
  "Fail-closed by construction: every sandbox setup, validation, or policy failure returns a structured SANDBOX_* error and the command is never silently run unsandboxed — there is no automatic fallback path",
  "macOS Seatbelt — real OS enforcement: writing outside the directory allowlist is denied by the kernel and the file is verified absent; reading a secret outside the allowlist is denied; /tmp is writable; an IP network bind is denied; an AF_UNIX socket bind is denied; signalling a host process is denied while self-signal works; reading/writing through a symlink that escapes the allowlist is denied; a child process spawned by the target is still contained",
  "Linux bubblewrap — closed-by-default namespaces (pid/net/ipc/uts/user/cgroup + new session), correct --bind (write) vs --ro-bind (read-only) mapping, network denied by default, and fail-closed when bwrap is missing OR present-but-incapable of creating the required namespaces (the capability pre-flight)",
  "Windows AppContainer — policy fail-closed (missing runner, invalid allowlist, network-allowlist requests), result parsing, explicit isolation flags ({ filesystem:true, network:true, process:true }), plus a runtime matrix proving suspended AppContainer start + OS-enforced ACL allowlist + verified job assignment + grandchild containment + secret isolation + KILL_ON_JOB_CLOSE",
  "Explicit isolation contract — every result carries { filesystem, network, process }; macOS/Linux/Windows all report all-true when their platform sandbox is active, and any setup failure or unsandboxed run reports all-false",
  "Directory allowlist — fs.realpath() canonicalization, ../ traversal, symlink escape, read-only vs read-write separation, and invalid/missing-path rejection (never silently skipped)",
  "Command execution — the tokenizer preserves quoted arguments verbatim, separates direct execution from explicit shell mode, and never reconstructs a command via a string-joined sh -c; it is documented as a classifier, not a security parser",
  "Environment sanitization — API keys, tokens, and secrets are stripped from every sandboxed process; only an allowlisted set of non-credential variables passes through",
  "Security regressions — a 40-test regression suite re-verifying each applied security fix, plus approval-ticket tests that lock in the audit remediation",
];

const limitations = [
  "Runtime enforcement tests only EXECUTE on their own OS. CI runs all three: macOS Seatbelt enforcement on macos-latest and Linux bubblewrap on ubuntu-latest (where runtime blocks may be skipped if the runner restricts user namespaces — the fail-closed contract tests still run). The Windows AppContainer runtime matrix runs on windows-latest and currently PASSES there — the three-platform Jest sandbox run linked below is green (Windows 91 tests, 61 passed / 30 platform-skipped; macOS 104 passed; Linux 57 passed / 21 skipped). Suspended AppContainer start, OS-enforced ACL allowlist, verified job assignment, grandchild containment, secret isolation, and KILL_ON_JOB_CLOSE all return verified sandbox results; the Windows JS-contract and policy-fail-closed tests pass on every platform.",
  "macOS Seatbelt OS-enforcement tests execute only on macOS; they pass on this machine and run in CI on macos-latest. The profile-generation and fail-closed config paths are asserted on every platform.",
  "These are unit and integration tests for core modules. They do NOT cover the full Electron UI, installers, MSIX/MSI packaging, or complete end-to-end user flows.",
  "A sandbox confines what code can do; it is not a proof that the AI's decisions are safe, nor a substitute for least-privilege OS accounts, patched dependencies, or simply not running untrusted code. See the security page's 'What this does NOT guarantee'.",
  "Counts above are declared it()/test() blocks as of the last sync; suites using it.each expand into more executed cases. Run npx jest (or check the CI run for jest.yml) for exact pass/skip/fail numbers.",
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
            <Layers size={32} className="mx-auto mb-4 text-sky-400" />
            <h3 className="text-3xl font-black text-sky-400">{totalTests}</h3>
            <p className="text-sm text-white/50">Total Tests</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
            <CheckCircle2 size={32} className="mx-auto mb-4 text-emerald-400" />
            <h3 className="text-3xl font-black text-emerald-400">514</h3>
            <p className="text-sm text-white/50">Passing</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
            <Activity size={32} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-3xl font-black text-amber-400">11</h3>
            <p className="text-sm text-white/50">Platform-skipped · 0 failing</p>
          </div>
        </div>

        <a
          href="https://github.com/Latestinssan/Aartiq/actions/runs/34761077425"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20"
        >
          <ShieldCheck size={16} />
          Windows AppContainer + macOS Seatbelt + Linux bubblewrap CI — PASSING (3/3 jobs)
          <ExternalLink size={16} />
        </a>
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
            href="https://github.com/Latestinssan/Aartiq/tree/main/aartiq-browser/tests"
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
