"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NeuralSphere } from "@/components/ui/neural-sphere";
import { useRouter } from "next/navigation";
import { BrainCircuit, PenTool, BugOff, Cpu, LineChart, Target, Zap, Microscope, Users, Clock, Monitor } from "lucide-react";

// Questions Database
const questions = [
  {
    id: 1,
    question: "What excites you most?",
    options: [
      { text: "Solving logical problems", icon: <BrainCircuit />, color: "border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_20px_#3b82f640]" },
      { text: "Designing interfaces", icon: <PenTool />, color: "border-pink-500/50 hover:border-pink-400 hover:shadow-[0_0_20px_#ec489940]" },
      { text: "Breaking systems", icon: <BugOff />, color: "border-red-500/50 hover:border-red-400 hover:shadow-[0_0_20px_#ef444440]" },
      { text: "Building AI", icon: <Cpu />, color: "border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_#06b6d440]" },
      { text: "Managing products", icon: <LineChart />, color: "border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_20px_#10b98140]" },
    ]
  },
  {
    id: 2,
    question: "How do you approach problems?",
    options: [
      { text: "Deep analysis", icon: <Microscope />, color: "border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_20px_#3b82f640]" },
      { text: "Creativity", icon: <PenTool />, color: "border-pink-500/50 hover:border-pink-400 hover:shadow-[0_0_20px_#ec489940]" },
      { text: "Experimentation", icon: <Zap />, color: "border-yellow-500/50 hover:border-yellow-400 hover:shadow-[0_0_20px_#eab30840]" },
      { text: "Leadership", icon: <Target />, color: "border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_20px_#10b98140]" },
      { text: "Optimization", icon: <Monitor />, color: "border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_#06b6d440]" },
    ]
  },
  {
    id: 3,
    question: "Which work environment fits you?",
    options: [
      { text: "Fast startup", icon: <Zap />, color: "border-yellow-500/50 hover:border-yellow-400 hover:shadow-[0_0_20px_#eab30840]" },
      { text: "Deep solo work", icon: <Monitor />, color: "border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_20px_#3b82f640]" },
      { text: "Team collaboration", icon: <Users />, color: "border-emerald-500/50 hover:border-emerald-400 hover:shadow-[0_0_20px_#10b98140]" },
      { text: "High-pressure response", icon: <Clock />, color: "border-red-500/50 hover:border-red-400 hover:shadow-[0_0_20px_#ef444440]" },
      { text: "Research-driven", icon: <Microscope />, color: "border-purple-500/50 hover:border-purple-400 hover:shadow-[0_0_20px_#a855f740]" },
    ]
  }
];

const loadingTexts = [
  "Analyzing behavioral patterns...",
  "Mapping cognitive preferences...",
  "Aligning with industry domains...",
  "Calibrating simulation parameters...",
  "Initializing your future..."
];

export default function DiscoveryPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const router = useRouter();

  const handleOptionClick = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsAnalyzing(true);
    }
  };

  useEffect(() => {
    if (isAnalyzing) {
      const textInterval = setInterval(() => {
        setLoadingTextIndex((prev) => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
      }, 1200);

      const redirectTimeout = setTimeout(() => {
        // Redirect back home for now, as planned
        router.push("/");
      }, 6500);

      return () => {
        clearInterval(textInterval);
        clearTimeout(redirectTimeout);
      };
    }
  }, [isAnalyzing, router]);

  const progressPercentage = ((currentStep) / questions.length) * 100;

  if (isAnalyzing) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,50,255,0.05)_0%,black_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-12"
        >
          <NeuralSphere />
          
          <div className="h-8 overflow-hidden relative w-full text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-primary font-mono tracking-widest text-lg absolute w-full"
              >
                {loadingTexts[loadingTextIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="bg-black min-h-screen font-sans text-white flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header & Progress Bar */}
      <header className="w-full max-w-4xl mx-auto pt-12 px-6 relative z-10 flex flex-col gap-6">
        <button 
          onClick={() => router.push("/")}
          className="text-neutral-500 hover:text-white transition-colors self-start font-medium text-sm flex items-center gap-2"
        >
          <span className="text-lg leading-none mb-[2px]">←</span> Abort Sequence
        </button>
        
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-500 font-mono">
          <span>SYSTEM_CALIBRATION</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </header>

      {/* Main Question Area */}
      <main className="flex-1 flex items-center justify-center px-6 relative z-10 py-12">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring", bounce: 0 }}
              className="flex flex-col gap-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-white/90">
                {currentQ.question}
              </h1>

              <div className="flex flex-col gap-4">
                {currentQ.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    onClick={handleOptionClick}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group w-full flex items-center gap-6 p-6 rounded-2xl bg-white/5 border ${option.color} transition-all duration-300 backdrop-blur-sm text-left`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      {option.icon}
                    </div>
                    <span className="text-xl font-medium text-neutral-300 group-hover:text-white transition-colors duration-300">
                      {option.text}
                    </span>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">
                      →
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
