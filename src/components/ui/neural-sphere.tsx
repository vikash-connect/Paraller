"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function NeuralSphere() {
  const [particles, setParticles] = useState<{ xRange: number[], yRange: number[], delay: number, duration: number }[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(
      Array.from({ length: 6 }).map(() => ({
        xRange: [0, (Math.random() - 0.5) * 100, 0],
        yRange: [0, (Math.random() - 0.5) * 100, 0],
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, []);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
      
      {/* Outer Ring 1 */}
      <motion.div
        className="absolute w-full h-full border border-cyan-500/30 rounded-full"
        animate={{ rotateX: 360, rotateY: 180 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_#22d3ee]" />
      </motion.div>

      {/* Outer Ring 2 */}
      <motion.div
        className="absolute w-[90%] h-[90%] border border-purple-500/30 rounded-full"
        animate={{ rotateX: 180, rotateY: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-purple-400 rounded-full blur-[2px] shadow-[0_0_15px_#c084fc]" />
      </motion.div>

      {/* Inner Core */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-tr from-cyan-400 to-primary rounded-full shadow-[0_0_40px_#3b82f6]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating Particles around core */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
          animate={{
            x: p.xRange,
            y: p.yRange,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
