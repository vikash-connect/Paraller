"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

export function Navbar() {
  const { name } = useUserStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
        scrolled 
          ? "bg-black/60 backdrop-blur-xl border-white/10 py-4 shadow-2xl" 
          : "bg-transparent border-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.5)] group-hover:rotate-12 transition-transform duration-500">
            <div className="w-4 h-4 bg-black rounded-sm rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading tracking-tighter text-white group-hover:text-primary transition-colors">PARALLEL</span>
            <span className="text-[8px] font-mono tracking-[0.4em] text-neutral-500 uppercase leading-none">Experience Your Future</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {["Simulations", "Specializations", "Timeline", "DNA"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`}
              className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-colors uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {name ? (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-white tracking-widest">{name.toUpperCase()}</span>
            </div>
          ) : (
            <Link href="/onboarding">
              <button className="px-6 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-all uppercase tracking-widest">
                Initialize
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
