"use client";
import React from "react";
import { motion } from "framer-motion";
import { Hexagon } from "lucide-react";
import Link from "next/link";

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export function Navbar() {
  const brandName = "PARALLEL".split("");

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo & Brand Area */}
        <Link href="/" className="flex items-center gap-3 group relative">
          {/* Futuristic Icon */}
          <div className="relative flex items-center justify-center w-10 h-10">
            <Hexagon className="absolute text-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500 w-8 h-8 rotate-90" />
            <Hexagon className="absolute text-emerald-400/50 w-6 h-6 animate-pulse group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="flex flex-col">
            {/* Animated Text Reveal */}
            <div className="flex overflow-hidden">
              {brandName.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 + (i * 0.05), type: "spring", stiffness: 150 }}
                  className="font-heading font-bold text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 group-hover:to-cyan-400 transition-all duration-500"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            {/* Brand Statement (Hidden on Mobile) */}
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-[10px] font-mono text-neutral-500 hidden sm:block tracking-wider"
            >
              Experience your future before choosing it.
            </motion.span>
          </div>
        </Link>

        {/* Minimal Nav Items */}
        <div className="flex items-center gap-8">
          <Link href="/#timeline" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300">
            Careers
          </Link>
          <Link href="/discovery" className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300 relative group">
            Start Simulation
            <div className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
