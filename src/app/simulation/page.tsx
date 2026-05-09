"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { simulations, Choice } from "@/data/simulations";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Terminal, ShieldAlert, Cpu, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

type Phase = "PRESENTATION" | "DECISION" | "CONSEQUENCE" | "SUMMARY";

export default function SimulationPage() {
  const sim = simulations.cybersecurity; // Hardcoded to cybersecurity for now
  
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("PRESENTATION");
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [collectedTraits, setCollectedTraits] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const scenario = sim.scenarios[currentScenarioIdx];

  useEffect(() => {
    // Reset state when scenario changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase("PRESENTATION");
    setShowOptions(false);
    setSelectedChoice(null);
  }, [currentScenarioIdx]);

  const handlePresentationComplete = () => {
    setPhase("DECISION");
    setTimeout(() => setShowOptions(true), 500);
  };

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice);
    setCollectedTraits(prev => [...prev, choice.trait]);
    setPhase("CONSEQUENCE");
  };

  const handleNext = () => {
    if (currentScenarioIdx < sim.scenarios.length - 1) {
      setCurrentScenarioIdx(prev => prev + 1);
    } else {
      setPhase("SUMMARY");
    }
  };

  if (phase === "SUMMARY") {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="max-w-2xl w-full bg-black/40 border border-white/10 p-10 rounded-3xl backdrop-blur-2xl relative z-10 text-center"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-bold font-heading mb-4 tracking-tight">Mission Debrief</h1>
          <p className="text-neutral-400 mb-8 text-lg">
            Simulation complete. Analyzing your decision matrix...
          </p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-left mb-8">
            <h3 className="text-sm font-mono text-cyan-400 mb-4 uppercase tracking-wider">Identified Traits:</h3>
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
              View Future Projection
            </GlowingButton>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      {/* Dynamic Background Based on Phase */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05)_0%,black_80%)]" />
      
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-black/50 backdrop-blur-md p-4 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="text-cyan-400" size={20} />
          <span className="font-mono text-sm tracking-wider text-neutral-300">PARALLEL // SIM_OS v2.4</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-neutral-500">ROLE: {sim.role.toUpperCase()}</span>
          <span className="px-2 py-1 bg-white/10 rounded-md text-cyan-400">SCENARIO {currentScenarioIdx + 1}/{sim.scenarios.length}</span>
        </div>
      </header>

      {/* Main Terminal Window */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-6 lg:p-12 relative z-10">
        
        {/* Scenario Display */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="text-red-400 animate-pulse" size={24} />
            <h2 className="text-xl font-bold font-mono text-red-400 tracking-wider">
              {scenario.title}
            </h2>
          </div>
          
          <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md min-h-[120px] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
            <p className="text-lg md:text-xl text-neutral-200 leading-relaxed font-mono">
              <TypewriterEffect 
                text={scenario.description} 
                speed={20} 
                onComplete={handlePresentationComplete} 
              />
            </p>
          </div>
        </div>

        {/* Options / Consequences Area */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* Choices */}
            {(phase === "DECISION" || phase === "PRESENTATION") && showOptions && (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {scenario.choices.map((choice, idx) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice)}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="p-6 text-left border border-white/10 rounded-2xl bg-white/5 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="font-mono text-cyan-500 text-xs mb-2 block opacity-50">OPTION_0{idx + 1}</span>
                    <span className="text-lg font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {choice.text}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Consequence Analysis */}
            {phase === "CONSEQUENCE" && selectedChoice && (
              <motion.div
                key="consequence"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <div className={`w-full max-w-2xl border p-8 rounded-3xl bg-black/60 backdrop-blur-xl relative overflow-hidden ${
                  selectedChoice.isOptimal ? "border-emerald-500/30" : "border-red-500/30"
                }`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                    selectedChoice.isOptimal ? "from-emerald-400 to-green-600" : "from-red-400 to-orange-600"
                  }`} />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <Cpu className={selectedChoice.isOptimal ? "text-emerald-400" : "text-red-400"} size={24} />
                    <span className="font-mono text-sm tracking-widest text-neutral-400 uppercase">System Analysis</span>
                  </div>

                  <p className="text-xl leading-relaxed text-white mb-8">
                    <TypewriterEffect text={selectedChoice.consequence} speed={30} />
                  </p>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm font-mono">
                      <span className="text-neutral-500">Trait Logged:</span>
                      <span className={selectedChoice.isOptimal ? "text-emerald-400" : "text-orange-400"}>
                        [{selectedChoice.trait}]
                      </span>
                    </div>
                    
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      onClick={handleNext}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors flex items-center gap-2"
                    >
                      {currentScenarioIdx < sim.scenarios.length - 1 ? "Next Scenario" : "Finalize Report"}
                      <ChevronRight size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
