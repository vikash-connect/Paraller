"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Terminal, ChevronRight, User, BookOpen, GraduationCap, Target, Sparkles } from "lucide-react";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";

type Step = "INIT" | "NAME" | "NAME_LOADING" | "NAME_CONFIRM" | "CLASS" | "STREAM" | "CAREER" | "INTERESTS" | "COMPLETE";

const INTEREST_OPTIONS = [
  "Coding", "Design", "Business", "Security", "AI/ML", 
  "Hardware", "Data Analysis", "Psychology", "Mathematics", "Writing"
];

export default function OnboardingPage() {
  const router = useRouter();
  const { name, isDemoMode, interests, setName, setClassLevel, setStream, setDreamCareer, addInterest, removeInterest } = useUserStore();
  
  const [step, setStep] = useState<Step>("INIT");
  const [showInput, setShowInput] = useState(false);
  const [tempInput, setTempInput] = useState("");

  // INIT Sequence
  useEffect(() => {
    if (step === "INIT") {
      const timer = setTimeout(() => {
        setStep("NAME");
        setShowInput(false);
      }, isDemoMode ? 500 : 2500);
      return () => clearTimeout(timer);
    }
  }, [step, isDemoMode]);

  const handleNext = (nextStep: Step) => {
    setShowInput(false);
    setTempInput("");
    setStep(nextStep);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempInput.trim()) return;
    setName(tempInput.trim());
    handleNext("NAME_LOADING");
  };

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempInput.trim()) return;
    setDreamCareer(tempInput.trim());
    handleNext("INTERESTS");
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      removeInterest(interest);
    } else {
      if (interests.length < 3) addInterest(interest);
    }
  };

  const getStepNumber = () => {
    switch (step) {
      case "NAME": return 1;
      case "CLASS": return 2;
      case "STREAM": return 3;
      case "CAREER": return 4;
      case "INTERESTS": return 5;
      default: return 0;
    }
  };

  const renderContent = () => {
    switch (step) {
      case "INIT":
        return (
          <div className="flex flex-col items-center gap-4 text-cyan-400 font-mono">
            <Terminal className="animate-pulse" size={32} />
            <TypewriterEffect text="Establishing secure connection..." speed={30} className="text-xl" />
          </div>
        );

      case "NAME":
        return (
          <div className="flex flex-col max-w-xl w-full gap-8">
            <AIMentorBubble 
              message="Hi there. I'm your Parallel AI Guide. I'll help you discover which technology role truly fits your thinking style. First, what should I call you?"
              speed={25}
              onComplete={() => setShowInput(true)}
            />
            <AnimatePresence>
              {showInput && (
                <motion.form 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleNameSubmit} 
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                  <div className="relative flex flex-col gap-4 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl">
                    <input
                      type="text"
                      autoFocus
                      value={tempInput}
                      onChange={(e) => setTempInput(e.target.value)}
                      placeholder="Enter your name..."
                      className="bg-transparent outline-none px-4 py-4 text-xl md:text-2xl text-white placeholder:text-white/20 font-light"
                    />
                    {tempInput.trim() && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end p-2">
                        <button type="submit" className="px-6 py-2 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all text-sm uppercase tracking-widest">
                          Continue <ChevronRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        );

      case "NAME_LOADING":
        return (
          <div className="flex flex-col items-center gap-8 py-12">
            <div className="relative w-24 h-24">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-primary/20 border-t-primary rounded-full"
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 bg-primary/20 rounded-full blur-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <TypewriterEffect 
                text="Initializing your future profile..." 
                speed={40} 
                className="text-lg font-mono text-primary uppercase tracking-[0.2em]" 
                onComplete={() => setTimeout(() => handleNext("NAME_CONFIRM"), 1500)}
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent w-48 opacity-50"
              />
            </div>
          </div>
        );

      case "NAME_CONFIRM":
        return (
          <div className="flex flex-col max-w-xl w-full gap-8">
            <AIMentorBubble 
              message={`It's a pleasure to meet you, ${name}. I'm initializing your neural profile now.`}
              speed={25}
              onComplete={() => setTimeout(() => handleNext("CLASS"), 1500)}
            />
          </div>
        );

      case "CLASS":
        return (
          <div className="flex flex-col max-w-xl w-full gap-8">
            <AIMentorBubble 
              message={`It's a pleasure to meet you, ${name}. To tailor your experience, I need to know your current academic level.`}
              speed={25}
              onComplete={() => setShowInput(true)}
            />
            <AnimatePresence>
              {showInput && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4">
                  {["Class 11", "Class 12", "Other"].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => { setClassLevel(cls); handleNext("STREAM"); }}
                      className="p-6 text-xl bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/50 transition-all font-medium"
                    >
                      {cls}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "STREAM":
        return (
          <div className="flex flex-col max-w-xl w-full gap-8">
            <AIMentorBubble 
              message={`Understood. And which academic stream are you pursuing, ${name}? This helps me understand your foundational strengths.`}
              speed={25}
              onComplete={() => setShowInput(true)}
            />
            <AnimatePresence>
              {showInput && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Science", "Commerce", "Arts"].map((str) => (
                    <button
                      key={str}
                      onClick={() => { setStream(str); handleNext("CAREER"); }}
                      className="p-6 text-lg bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-emerald-400/50 transition-all font-medium"
                    >
                      {str}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "CAREER":
        return (
          <div className="flex flex-col max-w-xl w-full gap-8">
            <AIMentorBubble 
              message={`We all have a vision of the future. ${name}, what is your dream career field at this moment?`}
              speed={25}
              onComplete={() => setShowInput(true)}
            />
            <AnimatePresence>
              {showInput && (
                <motion.form 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleCareerSubmit} 
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
                  <div className="relative flex flex-col gap-4 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl">
                    <input
                      type="text"
                      autoFocus
                      value={tempInput}
                      onChange={(e) => setTempInput(e.target.value)}
                      placeholder="e.g. Software Engineer, AI Specialist..."
                      className="bg-transparent outline-none px-4 py-4 text-xl md:text-2xl text-white placeholder:text-white/20 font-light"
                    />
                    {tempInput.trim() && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end p-2">
                        <button type="submit" className="px-6 py-2 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:bg-neutral-200 transition-all text-sm uppercase tracking-widest">
                          Continue <ChevronRight size={16} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        );

      case "INTERESTS":
        return (
          <div className="flex flex-col max-w-2xl w-full gap-8">
            <AIMentorBubble 
              message={`Last question for now, ${name}. Tell me what excites you. Select up to 3 core interests to help me tailor your discovery simulation.`}
              speed={25}
              onComplete={() => setShowInput(true)}
            />
            <AnimatePresence>
              {showInput && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-10">
                  <div className="flex flex-wrap gap-3">
                    {INTEREST_OPTIONS.map((interest) => {
                      const isSelected = interests.includes(interest);
                      return (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                            isSelected 
                              ? "bg-primary text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-transparent" 
                              : "bg-white/5 text-neutral-300 border border-white/10 hover:border-white/30 hover:bg-white/10"
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end border-t border-white/10 pt-6">
                    <GlowingButton 
                      onClick={() => {
                        setStep("COMPLETE");
                        setTimeout(() => router.push("/discovery"), isDemoMode ? 1000 : 3000);
                      }}
                      disabled={interests.length === 0}
                    >
                      Finalise Profile <ChevronRight size={18} className="ml-2 inline" />
                    </GlowingButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );

      case "COMPLETE":
        return (
          <div className="flex flex-col items-center text-center max-w-xl w-full">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-8 border border-primary/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
              <User className="text-primary" size={32} />
            </div>
            <h1 className="text-4xl font-bold font-heading mb-4 text-white">
              <TypewriterEffect text={`Profile established, ${name}.`} speed={20} />
            </h1>
            <p className="text-neutral-400 text-lg">
              <TypewriterEffect text="Initializing discovery sequence..." delay={1000} speed={20} />
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Progress Indicator */}
      <AnimatePresence>
        {getStepNumber() > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase">Neural Sync Active</span>
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              Step <span className="text-white">{getStepNumber()}</span> of 5
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex justify-center z-10"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
