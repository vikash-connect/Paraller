"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingButton } from "@/components/ui/glowing-button";
import { CareerCards } from "@/components/career-cards";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { FeaturesSection } from "@/components/features-section";
import { TimelinePreview } from "@/components/timeline-preview";
import { CTASection } from "@/components/cta-section";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";
import { AIMentorBubble } from "@/components/ui/ai-mentor-bubble";
import { getContextualGreeting } from "@/utils/ai-logic";

export default function Home() {
  const { name } = useUserStore();
  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Hero Section */}
      <AuroraBackground className="min-h-screen">
        <FloatingParticles />
        <motion.div
          style={{ y: yHeroText, opacity: opacityHero }}
          className="relative flex flex-col gap-6 items-center justify-center px-4 text-center z-10 w-full"
        >
          {name && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8 w-full max-w-lg"
            >
              <AIMentorBubble 
                message={getContextualGreeting(name, useUserStore.getState().decisionDNA, useUserStore.getState().decisionHistory)}
                speed={25}
              />
            </motion.div>
          )}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 text-sm font-medium text-muted-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Simulate your future.
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-white text-center font-heading tracking-tight leading-[1.1] max-w-4xl"
          >
            What if you could <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-emerald-400">
              experience your future
            </span>{" "}
            before choosing it?
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-light text-base md:text-xl text-neutral-400 py-4 max-w-2xl mx-auto leading-relaxed"
          >
            Parallel helps students explore real technology careers through immersive AI-powered simulations.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-4 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href="/onboarding">
              <GlowingButton>
                Enter Simulation
              </GlowingButton>
            </Link>
            <Link href="#timeline">
              <button className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                Explore Careers
              </button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute -bottom-32 animate-bounce text-muted-foreground"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </AuroraBackground>

      {/* Features Section */}
      <div className="py-48">
        <FeaturesSection />
      </div>

      {/* Career Paths Section */}
      <section className="py-48 relative bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(50,50,255,0.05)_0%,black_70%)] pointer-events-none"></div>
        <div className="text-center mb-20 relative z-10 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white font-heading tracking-tight mb-4"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Timeline</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select a specialized path and experience a day in the life of an industry professional.
          </p>
        </div>
        
        <CareerCards />
      </section>

      {/* Timeline Section */}
      <div className="py-48">
        <TimelinePreview />
      </div>

      {/* Final CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 text-center relative z-10 bg-black/50 backdrop-blur-md">
        <p className="text-muted-foreground font-light text-sm">
          © {new Date().getFullYear()} Parallel. Building the future of career discovery.
        </p>
      </footer>
    </div>
  );
}
