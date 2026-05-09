"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface RadarChartProps {
  data: number[];
  labels: string[];
  size?: number;
}

export function RadarChart({ data, labels, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.35; // leave room for labels
  const angleStep = (Math.PI * 2) / data.length;

  // Calculate grid points for 5 levels (20%, 40%, 60%, 80%, 100%)
  const gridRings = useMemo(() => {
    return [0.2, 0.4, 0.6, 0.8, 1].map((scale) => {
      return Array.from({ length: data.length }).map((_, i) => {
        const x = center + radius * scale * Math.sin(i * angleStep);
        const y = center - radius * scale * Math.cos(i * angleStep);
        return { x, y };
      });
    });
  }, [center, radius, angleStep, data.length]);

  // Calculate data points
  const dataPoints = useMemo(() => {
    return data.map((val, i) => {
      const scale = val / 100;
      const x = center + radius * scale * Math.sin(i * angleStep);
      const y = center - radius * scale * Math.cos(i * angleStep);
      return { x, y };
    });
  }, [data, center, radius, angleStep]);

  const pathData = `M ${dataPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Draw Web Grid */}
        {gridRings.map((ring, ringIdx) => (
          <polygon
            key={ringIdx}
            points={ring.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Draw Axes */}
        {Array.from({ length: data.length }).map((_, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.sin(i * angleStep)}
            y2={center - radius * Math.cos(i * angleStep)}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Animated Data Polygon */}
        <motion.path
          d={pathData}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="#06b6d4"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}
        />

        {/* Animated Data Nodes */}
        {dataPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="#fff"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, type: "spring" }}
            style={{ filter: "drop-shadow(0 0 5px #06b6d4)" }}
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => {
          const x = center + (radius + 25) * Math.sin(i * angleStep);
          const y = center - (radius + 25) * Math.cos(i * angleStep);
          return (
            <motion.text
              key={i}
              x={x}
              y={y}
              fill="#9ca3af"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              alignmentBaseline="middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="font-mono uppercase tracking-wider"
            >
              {label}
            </motion.text>
          );
        })}
      </svg>
    </div>
  );
}
