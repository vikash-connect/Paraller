import { DNAMetrics } from "@/store/user-store";

export function getContextualGreeting(name: string, dna: DNAMetrics, history: { trait: string }[]) {
  if (!name) return "Initialize your timeline. I'm here to guide you.";

  const topTrait = Object.entries(dna).sort(([, a], [, b]) => (b as number) - (a as number))[0][0];
  const totalDecisions = history.length;

  if (totalDecisions === 0) {
    return `Welcome, ${name}. You haven't made any simulation decisions yet. Shall we start with something high-stakes?`;
  }

  // Logic based on dominant traits
  if (topTrait === "analytical") {
    return `${name}, your analytical baseline is exceptionally high. I've noticed you prefer logic over impulse. Ready for more data?`;
  }

  if (topTrait === "risk" && dna.risk > 60) {
    return `Still feeling bold, ${name}? Your history shows a preference for high-risk, high-reward outcomes. Let's see how far that takes you.`;
  }

  if (topTrait === "collaboration") {
    return `Good to see you, ${name}. Your tendency to prioritize the team has been consistent. Shall we explore more leadership-focused roles?`;
  }

  return `Welcome back, ${name}. I'm continuing to analyze your decision patterns. Where shall we go next?`;
}

export function getMidMissionCoach(name: string, history: { trait: string }[]) {
  const recentTraits = history.slice(-3).map(h => h.trait);
  
  if (recentTraits.includes("Precision Defender")) {
    return `I see you're sticking to your surgical approach, ${name}. It's served you well so far.`;
  }

  if (recentTraits.includes("Reckless") || recentTraits.includes("Impulsive")) {
    return `${name}, you're moving fast. Speed is a weapon, but only if you don't miss the details.`;
  }

  if (recentTraits.includes("Moral Leader") || recentTraits.includes("Ethically Grounded")) {
    return `Your ethical compass is holding steady, ${name}. Most would have taken the easier path.`;
  }

  return `Every choice is a data point, ${name}. Think about the long-term impact of this next response.`;
}
