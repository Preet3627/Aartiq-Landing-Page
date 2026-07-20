"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Globe, 
  Terminal, 
  Cpu, 
  Database,
  Search,
  MessageSquare,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  FileText
} from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

const features = [
  {
    category: "AI Task Automation",
    items: [
      {
        name: "Multi-Step AI Agent",
        description: "An AI agent that plans, searches, and executes multi-step tasks with chain-of-thought reasoning.",
        icon: Bot,
        color: "from-blue-500 to-cyan-400"
      },
      {
        name: "RAG & Memory",
        description: "Retrieval-Augmented Generation allows the AI to fetch real-time web data and remember previous steps in a multi-action chain.",
        icon: Database,
        color: "from-indigo-500 to-blue-400"
      },
      {
        name: "Local Intelligence",
        description: "Full Ollama integration. Run local models with privacy-focused inference and low latency.",
        icon: Cpu,
        color: "from-purple-500 to-pink-400"
      }
    ]
  },
  {
    category: "Workflow Automation",
    items: [
      {
        name: "Advanced Document Engine",
        description: "Generate PDFs, automated Excel reports, and PowerPoint decks directly from AI analysis.",
        icon: FileText,
        color: "from-amber-500 to-orange-400"
      },
      {
        name: "Background Scheduler",
        description: "Schedule tasks to run even when the browser is closed. Runs as an OS-level service for reliable automation.",
        icon: Zap,
        color: "from-yellow-400 to-amber-300"
      },
      {
        name: "Raycast Integration",
        description: "Control your browser and trigger automation directly from Raycast or external shell scripts using our secure API.",
        icon: Terminal,
        color: "from-slate-600 to-slate-400"
      }
    ]
  },
  {
    category: "Hardened Security",
    items: [
      {
        name: "Three-Layer Security",
        description: "OCR-only visual reading, a syntactic firewall, and human-in-the-loop permission checks.",
        icon: Layers,
        color: "from-emerald-500 to-teal-400"
      },
      {
        name: "QR Authorization",
        description: "High-risk shell commands require a real-time QR scan and pin confirmation from your mobile device.",
        icon: Lock,
        color: "from-rose-500 to-pink-400"
      },
      {
        name: "OCR-Only Vision",
        description: "Optional 'Privacy Vision' mode allows the AI to only 'see' the screen through OCR, never touching your raw source code.",
        icon: Search,
        color: "from-sky-500 to-blue-400"
      }
    ]
  }
];

export default function FeaturesPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <div className="min-h-screen bg-[#03040b] text-white font-outfit">
      <Navbar onOpenAuth={() => {}} user={user} />
      
      <main className="pt-32 pb-20 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400">
              <Zap size={14} /> Full Capabilities
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter sm:text-8xl leading-none mb-8">
              Built for <br /> <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Automation.</span>
            </h1>
            <p className="text-xl font-medium text-white/40 leading-relaxed max-w-2xl">
               Aartiq is a browser with integrated AI task automation, background scheduling, and multi-format document generation.
            </p>
          </motion.div>
        </section>

        <div className="space-y-32">
          {features.map((group, groupIndex) => (
            <section key={group.category} className="relative">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 whitespace-nowrap">{group.category}</h2>
                <div className="h-[1px] w-full bg-white/5" />
              </div>

              <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((feature, i) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                  >
                    <div className={`mb-8 flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-gradient-to-br ${feature.color} shadow-[0_20px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10 transition-transform group-hover:scale-110`}>
                      <feature.icon size={36} className="text-white" />
                    </div>
                    <h3 className="mb-5 text-2xl font-black uppercase tracking-tight text-white">{feature.name}</h3>
                    <p className="text-base font-medium leading-relaxed text-white/40">{feature.description}</p>
                    
                    <div className="mt-8 flex items-center gap-2 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Feature</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-40 rounded-[60px] border border-white/5 bg-white/[0.02] p-12 lg:p-24 text-center overflow-hidden relative">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/[0.03] blur-[100px] rounded-full" />
           <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Ready to automate?</h2>
           <p className="text-xl font-medium text-white/40 mb-12 max-w-xl mx-auto">Get started with Aartiq today and extend its capabilities.</p>
           <button className="rounded-full bg-white px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-black transition hover:bg-sky-400 hover:text-white">
              Download Latest Stable
           </button>
        </section>
      </main>
    </div>
  );
}
