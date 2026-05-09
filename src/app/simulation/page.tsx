"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { simulations, Choice } from "@/data/simulations";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlowingButton } from "@/components/ui/glowing-button";
import { ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";

type Phase = "PRESENTATION" | "ACKNOWLEDGE" | "DECISION" | "PROCESSING" | "CONSEQUENCE" | "SUMMARY";

export default function SimulationPage() {
  const { name } = useUserStore();
  const sim = simulations.cybersecurity; // Hardcoded to cybersecurity for now
  
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("PRESENTATION");
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [collectedTraits, setCollectedTraits] = useState<string[]>([]);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(false);

  const scenario = sim.scenarios[currentScenarioIdx];

  const handlePresentationComplete = () => {
    setIsTypewriterComplete(true);
  };

  const handleAcknowledge = () => {
    setPhase("DECISION");
  };

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setPhase("PROCESSING");
    
    // Simulate AI Processing delay
    setTimeout(() => {
      setCollectedTraits(prev => [...prev, choice.trait]);
      setPhase("CONSEQUENCE");
    }, 2000);
  };

  const handleNext = () => {
    if (currentScenarioIdx < sim.scenarios.length - 1) {
      setCurrentScenarioIdx(prev => prev + 1);
      setPhase("PRESENTATION");
      setIsTypewriterComplete(false);
      setSelectedChoice(null);
    } else {
      setPhase("SUMMARY");
    }
  };

  if (phase === "SUMMARY") {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
          className="max-w-2xl w-full bg-black/40 border border-white/10 p-10 rounded-3xl backdrop-blur-2xl relative z-10 text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">Simulation Finalized</h1>
          <p className="text-neutral-400 mb-8 text-lg font-mono">
            Analysis complete, {name || "Agent"}. Decision matrix logged.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-8">
            <h3 className="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider">Psychometric Profile:</h3>
            <ul className="space-y-3">
              {collectedTraits.map((trait, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="flex items-center gap-3 text-white text-lg font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {trait}
                </motion.li>
              ))}
            </ul>
          </div>

          <Link href="/projection">
            <GlowingButton className="w-full py-4 text-lg">
              Project My Future
            </GlowingButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,black_80%)]" />
      
      {/* Cinematic Letterbox */}
      <div className="absolute top-0 left-0 w-full h-[10vh] bg-black z-40" />
      <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-black z-40" />

      {/* Header */}
      <header className="w-full border-b border-white/5 bg-black/50 backdrop-blur-md p-4 relative z-10 flex items-center justify-between mt-[10vh]">
        <div className="flex items-center gap-3">
          <div className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase">Interactive // Session</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest text-neutral-500">
          <span>PROGRESS: {currentScenarioIdx + 1}/{sim.scenarios.length}</span>
        </div>
      </header>

      {/* Main Terminal Window */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-8 lg:p-16 relative z-10">
        
        <AnimatePresence mode="wait">
          {/* Phase: PRESENTATION & ACKNOWLEDGE */}
          {(phase === "PRESENTATION" || phase === "DECISION" || phase === "ACKNOWLEDGE") && (
            <motion.div
              key={`scen-${currentScenarioIdx}`}
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-10"
            >
              <div className="flex flex-col gap-4">
                <span className="text-cyan-500 font-mono text-sm tracking-widest">SYSTEM_INPUT_DETECTED</span>
                <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight leading-tight">
                  {scenario.title}
                </h2>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md min-h-[160px] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]">
                <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light italic opacity-90">
                  <TypewriterEffect 
                    text={currentScenarioIdx === 0 ? `${name || "Agent"}, the systems are compromised. ${scenario.description}` : scenario.description} 
                    speed={25} 
                    onComplete={handlePresentationComplete} 
                  />
                </p>
              </div>

              {/* Step: Acknowledge Situation */}
              {phase === "PRESENTATION" && isTypewriterComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center pt-8">
                  <button 
                    onClick={handleAcknowledge}
                    className="px-10 py-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono tracking-widest hover:bg-cyan-500/20 transition-all uppercase text-sm"
                  >
                    Acknowledge Situation
                  </button>
                </motion.div>
              )}

              {/* Step: Decision Making */}
              {phase === "DECISION" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-10 mt-8"
                >
                  <AIMentorBubble 
                    message={`Analyze the vectors, ${name}. Every decision carries a consequence for the infrastructure. What is your response?`}
                    speed={25}
                    className="max-w-xl mx-auto"
                  />

                  <div className="grid grid-cols-1 gap-4">
                    {scenario.choices.map((choice, idx) => (
                      <motion.button
                        key={choice.id}
                        onClick={() => handleChoiceSelect(choice)}
                        whileHover={{ scale: 1.01, x: 10 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-6 text-left border border-white/10 rounded-2xl bg-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 group flex items-center gap-6"
                      >
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-xs text-neutral-500 group-hover:border-cyan-500 group-hover:text-cyan-400">
                          0{idx + 1}
                        </div>
                        <span className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors">
                          {choice.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Phase: PROCESSING */}
          {phase === "PROCESSING" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center gap-8"
            >
              <div className="relative w-24 h-24">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-t-2 border-r-2 border-cyan-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-cyan-400 tracking-tighter">
                  ANALYTICS
                </div>
              </div>
              <p className="text-cyan-400 font-mono tracking-widest animate-pulse text-sm">
                CALCULATING CONSEQUENCES...
              </p>
            </motion.div>
          )}

          {/* Phase: CONSEQUENCE */}
          {phase === "CONSEQUENCE" && selectedChoice && (
            <motion.div
              key="consequence"
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(20px)" }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className={`w-full max-w-2xl border p-10 rounded-[2.5rem] bg-black/60 backdrop-blur-xl relative overflow-hidden ${
                selectedChoice.isOptimal ? "border-emerald-500/30" : "border-red-500/30"
              }`}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-3 rounded-2xl ${selectedChoice.isOptimal ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                    {selectedChoice.isOptimal ? <CheckCircle2 size={28} /> : <ShieldAlert size={28} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-500 uppercase">Post-Action Report</span>
                    <h3 className="text-xl font-bold font-heading">{selectedChoice.isOptimal ? "Successful Integration" : "System Deviation"}</h3>
                  </div>
                </div>

                <p className="text-xl md:text-2xl leading-relaxed text-white font-light italic mb-10 opacity-90">
                  <TypewriterEffect text={selectedChoice.consequence} speed={25} />
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 font-mono text-[10px] tracking-widest text-neutral-400">
                    TRAIT_LOGGED: <span className="text-white">[{selectedChoice.trait}]</span>
                  </div>
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    onClick={handleNext}
                    className="px-8 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-bold transition-all flex items-center gap-2 group"
                  >
                    {currentScenarioIdx < sim.scenarios.length - 1 ? "Proceed to Next Incident" : "View Final Report"}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
