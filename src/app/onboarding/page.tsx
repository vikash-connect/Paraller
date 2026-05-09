"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Terminal, ChevronRight, User, BookOpen, GraduationCap, Target, Sparkles } from "lucide-react";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";

type Step = "INIT" | "NAME" | "CLASS" | "STREAM" | "CAREER" | "INTERESTS" | "COMPLETE";

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
    handleNext("CLASS");
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
            />
            <AnimatePresence>
              {showInput && (
                <motion.form 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleNameSubmit} 
                  className="flex flex-col gap-6"
                >
                  <input
                    type="text"
                    autoFocus
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-transparent border-b-2 border-white/20 focus:border-cyan-400 outline-none px-2 py-4 text-2xl md:text-4xl text-white transition-colors w-full placeholder:text-white/10 font-light"
                  />
                  <div className="flex justify-end">
                    <button type="submit" disabled={!tempInput.trim()} className="text-cyan-400 hover:text-cyan-300 disabled:opacity-30 flex items-center gap-2 font-mono text-lg transition-colors">
                      Continue <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
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
                  className="flex flex-col gap-6"
                >
                  <input
                    type="text"
                    autoFocus
                    value={tempInput}
                    onChange={(e) => setTempInput(e.target.value)}
                    placeholder="e.g. Software Engineer, Doctor..."
                    className="bg-transparent border-b-2 border-white/20 focus:border-purple-400 outline-none px-2 py-4 text-2xl md:text-4xl text-white transition-colors w-full placeholder:text-white/10 font-light"
                  />
                  <div className="flex justify-end">
                    <button type="submit" disabled={!tempInput.trim()} className="text-purple-400 hover:text-purple-300 disabled:opacity-30 flex items-center gap-2 font-mono text-lg transition-colors">
                      Continue <ChevronRight size={20} />
                    </button>
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
