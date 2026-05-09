"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterEffect } from "./typewriter-effect";
import { Brain, Target, Sparkles, ChevronRight } from "lucide-react";

interface Insight {
  title: string;
  text: string;
  icon: React.ReactNode;
}

interface AIReflectionPanelProps {
  userName: string;
  traits: string[];
  onComplete: () => void;
}

export function AIReflectionPanel({ userName, traits, onComplete }: AIReflectionPanelProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);

  // Generate dynamic insights based on traits
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];
    
    // Logic for Analytical/Precision
    if (traits.some(t => t.includes("Precision") || t.includes("Calculated") || t.includes("Analytical"))) {
      insights.push({
        title: "Analytical Depth",
        text: `${userName}, you consistently prioritized precision over panic. In high-stakes moments, your mind naturally seeks the surgical solution rather than the blunt one.`,
        icon: <Target className="text-cyan-400" size={20} />
      });
    }

    // Logic for Ethics/Integrity
    if (traits.some(t => t.includes("Ethically") || t.includes("Moral") || t.includes("Integrity") || t.includes("User Advocate"))) {
      insights.push({
        title: "Ethical Anchor",
        text: `Your decisions reveal a strong internal compass. Even when profit or speed was on the line, you chose to protect the human element.`,
        icon: <Sparkles className="text-emerald-400" size={20} />
      });
    }

    // Logic for Stress/Reckless (Growth)
    if (traits.some(t => t.includes("Reckless") || t.includes("Pressure") || t.includes("Over-Confident"))) {
      insights.push({
        title: "Growth: Tactical Calm",
        text: `At times, the pressure pushed you toward impulsive actions. Learning to breathe through the 'red alert' will turn your speed into a weapon.`,
        icon: <Brain className="text-orange-400" size={20} />
      });
    }

    // Default Fallback if none match
    if (insights.length === 0) {
      insights.push({
        title: "Processing Signature",
        text: `Your decision-making style is unique, ${userName}. You handle complex data with a focus on immediate resolution and system stability.`,
        icon: <Brain className="text-primary" size={20} />
      });
    }

    return insights;
  };

  const insights = generateInsights();

  const handleNext = () => {
    if (currentStep < insights.length - 1) {
      setCurrentStep(prev => prev + 1);
      setIsTypewriterDone(false);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full flex flex-col gap-10 relative z-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary animate-pulse">
            <Brain size={32} />
          </div>
          <span className="font-mono text-xs tracking-[0.4em] text-primary uppercase">Neural Reflection // Phase 0{currentStep + 1}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] min-h-[250px] flex flex-col gap-6 shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                {insights[currentStep].icon}
              </div>
              <h3 className="text-xl font-bold font-heading">{insights[currentStep].title}</h3>
            </div>

            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed font-light italic">
              <TypewriterEffect 
                text={insights[currentStep].text} 
                speed={25} 
                onComplete={() => setIsTypewriterDone(true)} 
              />
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypewriterDone ? 1 : 0 }}
          className="flex justify-center"
        >
          <button
            onClick={handleNext}
            className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all flex items-center gap-2 group"
          >
            {currentStep < insights.length - 1 ? "Next Insight" : "View Final Analysis"}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 flex gap-2">
        {insights.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-500 rounded-full ${i === currentStep ? "w-8 bg-primary" : "w-2 bg-white/10"}`} 
          />
        ))}
      </div>
    </motion.div>
  );
}
