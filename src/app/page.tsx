"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { APP_INFO } from "@/lib/version";
import { useVersion } from "@/lib/useVersion";
import { GitHubRelease, getReleaseDownloadLinks } from "@/lib/github-release";
import {
  Bot,
  ShieldCheck,
  Layers,
  ArrowRight,
  ExternalLink,
  Globe,
  Cpu,
  Github,
  Download,
  BookOpen,
  Zap,
  Monitor,
  Smartphone,
  Star,
  GitPullRequest,
  Terminal,
  MessageSquare,
  FileText,
  Users,
  Video,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

interface GitHubStats {
  stars: number;
  forks: number;
  open_issues: number;
  contributors: number;
  pull_requests: number;
}

const featureHighlights = [
  {
    name: "Autonomous Agent",
    description: "Multi-step autonomous tasks with RAG memory. Source: src/components/AIChatSidebar.tsx, src/lib/AICommandParser.ts",
    icon: Bot,
    color: "from-blue-500/20 to-cyan-500/20",
    glow: "rgba(59, 130, 246, 0.4)"
  },
  {
    name: "Document Engine",
    description: "PDF/Excel/PPTX generation. Source: src/lib/AdvancedDocumentEngine.ts, src/lib/PDFCommandParser.ts",
    icon: FileText,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168, 85, 247, 0.4)"
  },
  {
    name: "Screenshot & OCR",
    description: "Visual analysis. Source: src/lib/tesseract-service.js, src/lib/screen-vision-service.js",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16, 185, 129, 0.4)"
  },
  {
    name: "Low-Spec Optimized",
    description: "Runs on Electron with configurable GPU flags in main.js",
    icon: Zap,
    color: "from-yellow-500/20 to-amber-500/20",
    glow: "rgba(245, 158, 11, 0.4)"
  },
  {
    name: "Triple-Lock Security",
    description: "src/lib/Security.ts, src/lib/SecurityValidator.js, src/main/handlers/permission-handlers.js",
    icon: Layers,
    color: "from-indigo-500/20 to-blue-500/20",
    glow: "rgba(99, 102, 241, 0.4)"
  },
  {
    name: "Multi-Platform",
    description: "macOS (src/lib/native-panels/), Windows (src/lib/platform/WindowsIntegration.ts), Linux (src/lib/platform/LinuxIntegration.ts), Android (flutter_browser_app/)",
    icon: Globe,
    color: "from-pink-500/20 to-rose-500/20",
    glow: "rgba(244, 114, 182, 0.4)"
  },
];

const metrics = [
  { label: "Components", value: "179" },
  { label: "Lines of Code", value: "40,709" },
  { label: "Platforms", value: "4" },
  { label: "AI Commands", value: "25" },
];

function ClickToLoadYouTube() {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative mx-auto overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0c14]/60 shadow-[0_50px_100px_rgba(0,0,0,0.6)] cursor-pointer group"
      style={{ maxWidth: '900px' }}
      onClick={() => setLoaded(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-sky-500/10 pointer-events-none" />
      <div className="relative" style={{ paddingTop: '65.29%' }}>
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/QWdeUURLRjo?si=fZPLFzwcx_j5KobL&autoplay=1"
            title="Aartiq Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0c14]">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
              <Video size={40} className="text-white ml-1" />
            </div>
            <p className="mt-6 text-sm font-medium text-white/40">Click to load video</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const AuthModal = ({ onClose, user }: { onClose: () => void, user: any }) => {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    onClose();
  };

  const handleOpenMobileApp = () => {
    const deepLink = 'aartiq://auth?source=landing';
    window.location.href = deepLink;
  };

  const handleDownloadMobile = () => {
    window.location.href = '/downloads';
  };

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-[101] w-full max-w-lg overflow-hidden rounded-[40px] border border-white/10 bg-[#06080f]/95 p-1px shadow-[0_50px_150px_rgba(0,0,0,0.8)]"
      >
        <div className="bg-[#06080f] p-10">
          <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-lg shadow-sky-500/20">
                <Image
                  src="/logo-transparent.png"
                  alt="Aartiq Logo"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-widest">{user ? "Aartiq ID" : "Sign in"}</h2>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">{user ? user.email : isMobile ? "Mobile Auth" : "Secure Authentication"}</p>
              </div>
            </div>
            <button onClick={onClose} className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white text-2xl">
              ×
            </button>
          </div>

          <p className="mb-8 text-sm leading-relaxed text-white/60">
            {user
              ? "You are signed in to the Aartiq ecosystem. Your history, automations, and cloud settings are synchronized across all devices."
              : isMobile
                ? "Sign in to sync your Aartiq experience across all your devices. Use the mobile app for the best experience."
                : "Access Aartiq features including multi-model support, cross-device sync, and autonomous scheduling. Secure OAuth ensures your data remains private."
            }
          </p>

          <div className="space-y-4">
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-3 rounded-[20px] border border-red-500/20 bg-red-500/5 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-red-400 transition hover:bg-red-500/10"
              >
                Sign Out from Aartiq
              </button>
            ) : isMobile ? (
              <>
                <button
                  onClick={handleOpenMobileApp}
                  className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:opacity-90"
                >
                  <Smartphone size={18} /> Open Aartiq App
                </button>
                <button
                  onClick={handleDownloadMobile}
                  className="flex w-full items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/5 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/10"
                >
                  <Download size={18} /> Download Mobile App
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase">
                    <span className="bg-[#06080f] px-4 text-white/30">or continue on web</span>
                  </div>
                </div>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-sky-400 hover:text-white disabled:opacity-50"
                >
                  {loading ? "Initializing..." : <><Globe size={18} /> Continue with Google (Web)</>}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:bg-sky-400 hover:text-white disabled:opacity-50"
                >
                  {loading ? "Initializing..." : <><Globe size={18} /> Continue with Google</>}
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/5 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-white/30 hover:bg-white/10">
                  Launch as Guest
                </button>
              </>
            )}
          </div>

          <div className="mt-8 border-t border-white/5 pt-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              {isMobile ? "Authenticate via Aartiq Mobile App for best experience" : "Authenticated with Firebase Security Shield"}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

import { Navbar } from "@/components/Navbar";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [latestRelease, setLatestRelease] = useState<GitHubRelease | null>(null);
  const [githubStats, setGithubStats] = useState<GitHubStats>({ stars: 0, forks: 0, open_issues: 0, contributors: 0, pull_requests: 0 });
  const { version, channel } = useVersion();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    fetch("https://api.github.com/repos/Preet3627/Aartiq/releases/latest")
      .then(res => res.json())
      .then(data => setLatestRelease(data))
      .catch(err => console.error("Release fetch failed:", err));

    Promise.all([
      fetch("https://api.github.com/repos/Preet3627/Aartiq").then(res => res.json()),
      fetch("https://api.github.com/repos/Preet3627/Aartiq/contributors?per_page=100").then(res => res.json()),
      fetch("https://api.github.com/search/issues?q=repo:Preet3627/Aartiq+is:pr").then(res => res.json())
    ])
    .then(([repoData, contributorsData, prData]) => {
      setGithubStats({
        stars: repoData.stargazers_count || 0,
        forks: repoData.forks_count || 0,
        open_issues: repoData.open_issues_count || 0,
        contributors: Array.isArray(contributorsData) ? contributorsData.length : 0,
        pull_requests: prData.total_count || 0
      });
    })
    .catch(err => console.error("Stats fetch failed:", err));

    return () => unsubscribe();
  }, []);

  const downloadLinks = useMemo(() => {
    return getReleaseDownloadLinks(latestRelease).map((item) => ({
      ...item,
      icon: item.platform === "windows"
        ? Monitor
        : item.platform === "linux"
          ? Terminal
          : Smartphone,
    }));
  }, [latestRelease]);

  return (
    <div className="relative min-h-screen bg-[#03040b] font-outfit text-white selection:bg-sky-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] left-1/2 aspect-square w-[120vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-[20%] -left-[10%] aspect-square w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_60%)] blur-[80px]" />
        <div className="absolute bottom-[10%] -right-[10%] aspect-square w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.1)_0%,transparent_60%)] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <Navbar onOpenAuth={() => setShowAuth(true)} user={user} />

      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} user={user} />}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">

        {/* HERO */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-5 py-2"
          >
            <div className="flex h-2 w-2 rounded-full bg-sky-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400">
              {latestRelease ? `v${latestRelease.tag_name}` : version ? `v${version} ${channel}` : "..."}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-6xl text-7xl font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-8xl lg:text-[11rem]"
          >
            Aartiq <br />
            <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Intelligent Browser</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-16 max-w-3xl text-xl font-medium leading-relaxed text-white/40 sm:text-2xl"
          >
            An open-source, AI-native browser with permission-gated OS automation. Electron + Next.js + React.
            <br />
            <span className="mt-4 block text-sm font-black uppercase tracking-[0.4em] text-white/20">
              Built by <span className="text-sky-400">Preet3627</span> & <span className="text-purple-400">Latestinssan</span> — v{version || '...'} {channel}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
          >
            <Link
               href="/downloads"
               className="group flex items-center gap-4 rounded-[2.5rem] bg-white px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:bg-sky-400 hover:text-white"
            >
              Download <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
               href="/docs"
               className="flex items-center gap-4 rounded-[2.5rem] border border-white/10 bg-white/5 px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              Documentation
            </Link>
            <Link
               href="/mcp-settings"
               className="flex items-center gap-4 rounded-[2.5rem] border border-sky-500/20 bg-sky-500/5 px-12 py-7 text-sm font-black uppercase tracking-[0.2em] text-sky-400 transition hover:bg-sky-500/20"
            >
              <Cpu size={18} /> MCP Setup
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-28 grid w-full max-w-4xl grid-cols-2 gap-5 sm:grid-cols-4"
          >
            {metrics.map((metric, i) => (
              <div key={metric.label} className="group relative overflow-hidden rounded-[36px] border border-white/5 bg-white/5 p-9 text-left transition hover:bg-white/10">
                <div className="absolute -right-6 -top-6 opacity-[0.02] transition-transform group-hover:scale-125">
                   <Zap size={120} />
                </div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">{metric.label}</p>
                <p className="text-4xl font-black text-sky-400">{metric.value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* VIDEO DEMO */}
        <section id="demo" className="py-20 scroll-mt-24">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">
              <Video size={14} /> Demo
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl">
              See It In <span className="text-white/40">Action.</span>
            </h2>
          </div>

          <ClickToLoadYouTube />
        </section>

        {/* FEATURES */}
        <section id="features" className="py-40">
          <div className="mb-24 text-center">
             <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
               <Cpu size={14} /> Core Technologies
             </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl lg:text-8xl">
              Core <br /> <span className="text-white/40">Features.</span>
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featureHighlights.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-[45px] border border-white/5 bg-[#0a0c10]/50 p-12 transition-all hover:bg-[#0a0c10]/80 hover:border-white/10"
              >
                <div className={`mb-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${feature.color} text-white shadow-2xl`}>
                  <feature.icon size={36} />
                </div>
                <h3 className="mb-5 text-2xl font-black uppercase tracking-[0.1em] text-white leading-tight">{feature.name}</h3>
                <p className="text-base font-medium leading-relaxed text-white/40">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GITHUB */}
        <section id="github" className="py-40">
          <div className="rounded-[60px] border border-white/5 bg-gradient-to-br from-[#0a0c14]/60 to-transparent p-12 lg:p-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/[0.03] blur-[120px] rounded-full sm:block hidden" />

            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div>
                <div className="mb-10 inline-flex items-center gap-4 rounded-3xl bg-white/5 p-4 text-white ring-1 ring-white/10 shadow-2xl">
                  <Github size={40} />
                </div>
                <h2 className="mb-8 text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl lg:text-8xl leading-[0.85]">
                  Open <br /> <span className="text-white/40">Source.</span>
                </h2>
                <p className="mb-12 text-xl font-medium leading-relaxed text-white/40 max-w-xl">
                  MIT-licensed. Source at github.com/Preet3627/Aartiq
                </p>

                <div className="flex flex-wrap gap-5">
                  <a
                    href="https://github.com/Preet3627/Aartiq"
                    target="_blank"
                    className="flex items-center gap-4 rounded-full bg-white/5 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                  >
                    View Source <ExternalLink size={18} />
                  </a>
                  <a
                    href="https://github.com/Preet3627/Aartiq/fork"
                    target="_blank"
                    className="flex items-center gap-4 rounded-full border border-white/10 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white/40 transition hover:border-white hover:text-white"
                  >
                    Fork Project <GitPullRequest size={18} />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                 {[
                    { icon: Star, label: "Stars", value: githubStats.stars, color: "text-amber-400" },
                    { icon: Users, label: "Contributors", value: githubStats.contributors, color: "text-sky-400" },
                    { icon: GitPullRequest, label: "Pull Requests", value: githubStats.pull_requests, color: "text-purple-400" },
                    { icon: MessageSquare, label: "Issues", value: githubStats.open_issues, color: "text-emerald-400" },
                 ].map((stat, i) => (
                    <div key={i} className="rounded-[3rem] border border-white/5 bg-[#03040b]/60 p-10 hover:border-white/10 transition">
                       <div className="mb-4 flex items-center justify-between">
                          <stat.icon size={24} className={stat.color} />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{stat.label}</span>
                       </div>
                       <p className="text-4xl font-black">{stat.value}</p>
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section id="downloads" className="py-40 scroll-mt-24">
           <div className="mb-24 flex flex-col items-center justify-between gap-10 md:flex-row">
              <h2 className="text-5xl font-black uppercase tracking-tighter sm:text-6xl lg:text-8xl">
                 Downloads
              </h2>
              <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-400 mb-2">Build</p>
                  <p className="text-2xl font-black">{latestRelease?.tag_name || (version ? `v${version} ${channel}` : '...')}</p>
              </div>
           </div>

           <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
              {downloadLinks.length > 0 ? downloadLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative h-72 flex flex-col justify-between rounded-[50px] border border-white/5 bg-[#0a0c10]/40 p-10 transition-all hover:bg-white/5 hover:-translate-y-2"
                >
                  <div>
                    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white/40 ring-1 ring-white/10 transition-colors group-hover:text-sky-400 group-hover:ring-sky-500/30">
                       <item.icon size={28} />
                    </div>
                    <h3 className="mb-3 text-xl font-black uppercase tracking-[0.2em]">{item.label}</h3>
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400/70">{item.arch}</p>
                    <p className="text-[11px] text-white/20 font-medium truncate max-w-full">{item.file}</p>
                  </div>
                </motion.a>
              )) : (
                [1,2,3,4].map((i) => (
                   <div key={i} className="animate-pulse rounded-[50px] border border-white/5 bg-white/5 p-10 h-72" />
                ))
              )}
             </div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mt-12 flex justify-center"
             >
              <div dangerouslySetInnerHTML={{
                __html: `<ms-store-badge
                  productid="9nd6wg2rp7cm"
                  productname="Aartiq"
                  window-mode="direct"
                  theme="dark"
                  size="large"
                  language="en-gb"
                  animation="on">
                </ms-store-badge>`
              }} />
            </motion.div>
          </section>

        {/* DOCS */}
        <section id="docs" className="py-40 scroll-mt-24">
           <div className="overflow-hidden rounded-[60px] border border-white/5 bg-gradient-to-br from-[#0a0c14] to-[#04060b] shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
              <div className="grid lg:grid-cols-[1.2fr_2fr]">
                 <div className="border-b border-white/5 p-16 lg:border-b-0 lg:border-r">
                    <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500/10 text-sky-400 shadow-2xl">
                       <BookOpen size={32} />
                    </div>
                    <h2 className="mb-10 text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl">Documentation</h2>

                    <div className="space-y-3">
                       <Link
                         href="/docs/ai-commands"
                         className="group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all text-white/40 hover:bg-white/5 hover:text-white"
                       >
                         <span className="text-[12px] font-black uppercase tracking-[0.3em]">AI Commands</span>
                         <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                       </Link>
                       <Link
                         href="/docs/overview"
                         className="group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all text-white/40 hover:bg-white/5 hover:text-white"
                       >
                         <span className="text-[12px] font-black uppercase tracking-[0.3em]">Architecture Overview</span>
                         <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                       </Link>
                       <Link
                         href="/docs/security"
                         className="group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all text-white/40 hover:bg-white/5 hover:text-white"
                       >
                         <span className="text-[12px] font-black uppercase tracking-[0.3em]">Security Model</span>
                         <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                       </Link>
                       <Link
                         href="/docs/automation"
                         className="group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all text-white/40 hover:bg-white/5 hover:text-white"
                       >
                         <span className="text-[12px] font-black uppercase tracking-[0.3em]">Automation</span>
                         <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                       </Link>
                       <Link
                         href="/docs/getting-started"
                         className="group flex w-full items-center justify-between rounded-3xl px-8 py-5 text-left transition-all text-white/40 hover:bg-white/5 hover:text-white"
                       >
                         <span className="text-[12px] font-black uppercase tracking-[0.3em]">Getting Started</span>
                         <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                       </Link>
                    </div>
                 </div>

                 <div className="p-16 lg:p-28">
                   <p className="mb-3 text-[10px] font-black uppercase tracking-[0.6em] text-sky-400">Reference</p>
                   <h3 className="mb-10 text-5xl font-black text-white leading-tight">Documentation</h3>
                   <p className="mb-14 text-xl font-medium leading-relaxed text-white/40">
                     Core documentation for AI command reference, automation API, security architecture, and cross-platform deployment.
                   </p>

                   <div className="grid gap-6">
                     <Link href="/docs/ai-commands" className="flex gap-6 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-colors group">
                       <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-colors">
                         <CheckCircle2 size={16} />
                       </div>
                       <span className="text-base font-medium leading-relaxed text-white/60">AI command catalog with risk indicators and multi-model orchestration. Source: src/lib/AICommandParser.ts</span>
                     </Link>
                     <Link href="/docs/security" className="flex gap-6 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-colors group">
                       <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-colors">
                         <CheckCircle2 size={16} />
                       </div>
                       <span className="text-base font-medium leading-relaxed text-white/60">Visual sandbox, syntactic firewall, and human-in-the-loop authorization. Source: src/lib/Security.ts</span>
                     </Link>
                     <Link href="/docs/getting-started" className="flex gap-6 rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-colors group">
                       <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-colors">
                         <CheckCircle2 size={16} />
                       </div>
                       <span className="text-base font-medium leading-relaxed text-white/60">Installation and configuration for all platforms. Source: github.com/Preet3627/Aartiq</span>
                     </Link>
                   </div>
                 </div>
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 pt-40 pb-20">
           <div className="grid gap-20 sm:grid-cols-2 lg:grid-cols-5">
               <div className="lg:col-span-2">
                  <div className="mb-10 flex items-center gap-4">
                     <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-lg shadow-sky-500/20">
                       <Image
                          src="/logo-transparent.png"
                          alt="Aartiq Logo"
                          width={48}
                          height={48}
                          className="h-full w-full object-contain"
                       />
                     </div>
                     <span className="text-2xl font-black uppercase tracking-tighter">Aartiq</span>
                  </div>
                 <p className="max-w-md text-lg font-medium leading-relaxed text-white/30">
                     An open-source browser with autonomous AI agents for workflow automation,
                     document generation, and background task scheduling.
                 </p>
               </div>

               <div>
                   <p className="mb-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/40">Source Code</p>
                   <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/40">
                      <li><a href="https://github.com/Preet3627/Aartiq/tree/main/aartiq-browser" target="_blank" className="hover:text-sky-400 transition">aartiq-browser/</a></li>
                     <li><a href="https://github.com/Preet3627/Aartiq/tree/main/aartiq-browser/src/lib" target="_blank" className="hover:text-sky-400 transition">src/lib/</a></li>
                     <li><a href="https://github.com/Preet3627/Aartiq/tree/main/aartiq-browser/src/components" target="_blank" className="hover:text-sky-400 transition">src/components/</a></li>
                     <li><a href="https://github.com/Preet3627/Aartiq/tree/main/aartiq-browser/src/lib/native-panels" target="_blank" className="hover:text-sky-400 transition">native-panels/</a></li>
                     <li><a href="https://github.com/Preet3627/Aartiq/tree/main/flutter_browser_app" target="_blank" className="hover:text-sky-400 transition">flutter_browser_app/</a></li>
                  </ul>
               </div>

               <div>
                   <p className="mb-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/40">Ecosystem</p>
                  <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/40">
                     <li><a href="#" className="hover:text-sky-400 transition">Aartiq Web Client</a></li>
                     <li><a href="#" className="hover:text-sky-400 transition">Raycast Extension</a></li>
                     <li><a href="#" className="hover:text-sky-400 transition">Mobile Verifier</a></li>
                  </ul>
               </div>

               <div>
                   <p className="mb-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/40">Support</p>
                  <ul className="space-y-5 text-xs font-black uppercase tracking-widest text-white/40">
                     <li><a href="/docs" className="hover:text-sky-400 transition">Documentation</a></li>
                     <li><a href="https://github.com/Preet3627/Aartiq/security" className="hover:text-sky-400 transition">Security</a></li>
                  </ul>
               </div>
           </div>

           <div className="mt-40 flex flex-col items-center justify-between gap-10 border-t border-white/5 pt-20 md:flex-row">
              <div className="flex flex-col gap-2">
                  <p className="text-xs font-black uppercase tracking-[0.5em] text-white/30">
                     © 2026 Aartiq. MIT License.
                  </p>
                 <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
                   Built by <span className="text-white/20">Preet3627</span> — v{version || '...'}
                 </p>
              </div>
              <div className="flex items-center gap-10">
                 <a href="https://github.com/Preet3627/Aartiq" aria-label="Aartiq on GitHub" className="text-white/40 hover:text-white transition transform hover:scale-110"><Github size={24} /></a>
                  <div className="flex h-12 px-6 items-center rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ring-1 ring-white/10">
                    v{latestRelease?.tag_name?.replace('v', '') || version || '...'}
                  </div>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}