"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/user-store";
import { DNAScanner } from "@/components/ui/dna-scanner";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";
import { RadarChart } from "@/components/ui/radar-chart";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Dna, Fingerprint, Activity, Brain, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DecisionDNAPage() {
  const { name, decisionDNA } = useUserStore();
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const metrics = [
    { label: "Analytical Thinking", value: decisionDNA.analytical, color: "cyan", icon: <Activity size={14} /> },
    { label: "Creativity", value: decisionDNA.creativity, color: "purple", icon: <Fingerprint size={14} /> },
    { label: "Leadership", value: decisionDNA.leadership, color: "emerald", icon: <Shield size={14} /> },
    { label: "Risk Tolerance", value: decisionDNA.risk, color: "red", icon: <Activity size={14} /> },
    { label: "Stress Handling", value: decisionDNA.stress, color: "orange", icon: <Activity size={14} /> },
    { label: "Problem Solving", value: decisionDNA.problemSolving, color: "blue", icon: <Brain size={14} /> },
    { label: "Collaboration", value: decisionDNA.collaboration, color: "yellow", icon: <Dna size={14} /> },
  ];

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans overflow-x-hidden relative flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-cyan-500/5 blur-[180px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {isScanning ? (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="flex-1 flex flex-col items-center justify-center z-10 p-6"
          >
            <div className="relative w-48 h-48 mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-cyan-400/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Dna className="text-cyan-400 animate-pulse" size={64} />
              </div>
              {/* Scan Bar */}
              <motion.div 
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4] z-20"
              />
            </div>
            <h1 className="text-2xl font-mono tracking-[0.5em] text-cyan-400 uppercase mb-4">Decoding Decision DNA</h1>
            <p className="text-neutral-500 font-mono text-sm animate-pulse">ANALYZING NEURAL PATTERNS FOR: {name?.toUpperCase() || "AGENT"}</p>
          </motion.div>
        ) : (
          <motion.main
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex-1 max-w-7xl mx-auto w-full p-6 lg:p-12"
          >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <span className="font-mono text-xs tracking-[0.3em] text-cyan-500 uppercase mb-2 block">Behavioral Intelligence v4.0</span>
                <h1 className="text-4xl md:text-5xl font-bold font-heading tracking-tight">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Decision DNA</span></h1>
              </div>
              <Link href="/onboarding">
                <button className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-mono text-neutral-400">
                  RE-CALIBRATE
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: DNA Visualization */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
                  <div className="flex items-center gap-3 mb-8">
                    <Dna className="text-cyan-400" size={24} />
                    <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">Neural Signature Mapping</span>
                  </div>

                  <div className="flex justify-center py-6">
                    <RadarChart 
                      data={[
                        decisionDNA.analytical, 
                        decisionDNA.creativity, 
                        decisionDNA.problemSolving, 
                        decisionDNA.leadership, 
                        decisionDNA.stress
                      ]} 
                      labels={["Logic", "Vision", "Solve", "Lead", "Calm"]} 
                      size={300}
                    />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <span className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">Core Archetype</span>
                      <span className="text-cyan-400 font-bold tracking-tight">The Architect</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <span className="block text-[10px] font-mono text-neutral-500 uppercase mb-1">Primary Drive</span>
                      <span className="text-purple-400 font-bold tracking-tight">Precision</span>
                    </div>
                  </div>
                </div>

                <AIMentorBubble 
                  message={`I've decoded your signature, ${name}. Your high Analytical score paired with exceptional Stress Handling suggests you don't just solve problems—you thrive when they are at their most complex.`}
                  speed={25}
                />
              </div>

              {/* Right Column: Detailed Metrics */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl flex-1">
                  <h3 className="text-xl font-bold font-heading mb-8 flex items-center gap-3">
                    <Activity className="text-primary" size={20} /> Behavioral Metrics
                  </h3>
                  
                  <div className="space-y-8">
                    {metrics.map((m, idx) => (
                      <DNAScanner 
                        key={m.label} 
                        label={m.label} 
                        value={m.value} 
                        color={m.color} 
                        delay={idx * 0.1}
                      />
                    ))}
                  </div>

                  <div className="mt-12 pt-10 border-t border-white/5">
                    <h4 className="text-sm font-mono text-neutral-500 mb-6 uppercase tracking-widest">Optimized Career Channels</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { role: "Cybersecurity Analyst", match: "98% Aligned", desc: "Your calm under pressure fits threat response." },
                        { role: "AI Research Engineer", match: "94% Aligned", desc: "Your analytical depth supports neural modeling." }
                      ].map((role) => (
                        <div key={role.role} className="p-5 rounded-2xl bg-primary/5 border border-primary/20 group hover:border-primary/50 transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-white group-hover:text-primary transition-colors">{role.role}</h5>
                            <span className="text-[10px] font-mono text-primary">{role.match}</span>
                          </div>
                          <p className="text-xs text-neutral-400 leading-relaxed">{role.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/projection">
                  <GlowingButton className="w-full py-6 text-xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                    Project My 10-Year Timeline <ChevronRight className="inline ml-2" />
                  </GlowingButton>
                </Link>
              </div>

            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
