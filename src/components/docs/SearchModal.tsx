"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Command, Code2, BookOpen, ChevronRight, Hash, ArrowRight } from "lucide-react";
import type { SearchResult } from "@/lib/search-index";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<SearchResult["type"], React.ElementType> = {
  page: FileText,
  section: BookOpen,
  command: Command,
  api: Code2,
  guide: ArrowRight,
};

const typeColors: Record<SearchResult["type"], string> = {
  page: "text-sky-400 bg-sky-400/10",
  section: "text-purple-400 bg-purple-400/10",
  command: "text-amber-400 bg-amber-400/10",
  api: "text-emerald-400 bg-emerald-400/10",
  guide: "text-cyan-400 bg-cyan-400/10",
};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=8`);
      const data = await response.json();
      setResults(data.results || []);
      setSelectedIndex(0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 150);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].url);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[15vh] z-50 w-full max-w-2xl -translate-x-1/2"
          >
            <div className="mx-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl">
              <div className="flex items-center gap-4 border-b border-white/5 px-6 py-4">
                <Search size={20} className="text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-lg text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={onClose}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/40 transition hover:bg-white/10 hover:text-white"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/10 border-t-sky-400" />
                  </div>
                )}

                {!isLoading && query.length >= 2 && results.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-white/40">No results found for &quot;{query}&quot;</p>
                    <p className="mt-2 text-sm text-white/20">Try different keywords or check spelling</p>
                  </div>
                )}

                {!isLoading && query.length < 2 && (
                  <div className="py-8 px-4">
                    <p className="mb-4 text-center text-sm text-white/30">Quick links</p>
                    <div className="space-y-1">
                      {[
                        { title: "Getting Started", url: "/docs/getting-started", desc: "Installation and setup" },
                        { title: "AI Commands", url: "/docs/ai-commands", desc: "Command reference" },
                        { title: "Security", url: "/docs/security", desc: "Security model" },
                        { title: "API Reference", url: "/docs/api-reference", desc: "Full API docs" },
                      ].map((link) => (
                        <button
                          key={link.url}
                          onClick={() => {
                            router.push(link.url);
                            onClose();
                          }}
                          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-white/5"
                        >
                          <FileText size={18} className="text-white/30" />
                          <div>
                            <p className="font-medium text-white">{link.title}</p>
                            <p className="text-xs text-white/30">{link.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="space-y-1 p-2">
                    <p className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                      {results.length} result{results.length !== 1 ? "s" : ""}
                    </p>
                    {results.map((result, index) => {
                      const Icon = typeIcons[result.type];
                      const colorClass = typeColors[result.type];
                      
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-start gap-4 rounded-xl px-4 py-4 text-left transition ${
                            index === selectedIndex
                              ? "bg-sky-500/10 border border-sky-500/20"
                              : "hover:bg-white/5 border border-transparent"
                          }`}
                        >
                          <div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-white truncate">{result.title}</p>
                              {result.section && (
                                <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/40">
                                  {result.section}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-white/40 line-clamp-2">{result.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {result.keywords.slice(0, 4).map((keyword) => (
                                <span
                                  key={keyword}
                                  className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/30"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ChevronRight
                            size={16}
                            className={`mt-1 shrink-0 transition-colors ${
                              index === selectedIndex ? "text-sky-400" : "text-white/20"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-white/5 px-6 py-3">
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">↑</kbd>
                    <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">↓</kbd>
                    <span className="ml-1">Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">↵</kbd>
                    <span>Select</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/20">
                  <span>Powered by Aartiq</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
