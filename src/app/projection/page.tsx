"use client";
import React from "react";
import { FutureTimeline } from "@/components/ui/future-timeline";
import { GlowingButton } from "@/components/ui/glowing-button";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ProjectionPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden relative">
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_right,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-8 font-mono text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <Sparkles size={16} /> Projection Initialized
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight leading-tight">
              A glimpse into your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-400">
                possible future.
              </span>
            </h1>
            
            <p className="text-xl text-neutral-400 leading-relaxed font-light max-w-2xl mx-auto">
              Based on your decisions, problem-solving approach, and psychological traits, the simulation has generated your most probable career trajectory.
            </p>
          </motion.div>
        </section>

        {/* The Timeline */}
        <section className="w-full">
          <FutureTimeline />
        </section>

        {/* Final CTA Section */}
        <section className="py-32 px-6 w-full text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative z-10 max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">
              The future isn&apos;t written yet.
            </h2>
            <p className="text-xl text-neutral-400 mb-12 font-light">
              This is just one timeline. Want to see what happens if you choose a different path?
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/">
                <GlowingButton className="px-10 py-4 text-lg flex items-center gap-2">
                  <RotateCcw size={20} /> Restart Journey
                </GlowingButton>
              </Link>
              <button className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                Save Profile
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
