export type Choice = {
  id: string;
  text: string;
  consequence: string;
  isOptimal: boolean;
  trait: string;
};

export type Scenario = {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
};

export type Simulation = {
  role: string;
  scenarios: Scenario[];
};

export const simulations: Record<string, Simulation> = {
  cybersecurity: {
    role: "Cybersecurity Analyst",
    scenarios: [
      {
        id: "cyber-1",
        title: "BATTLE_STATION: Initial Breach",
        description: "The systems are failing. A massive brute-force attack is hitting our fintech gateway. You are the only one on shift.",
        choices: [
          {
            id: "c1-1",
            text: "Block all incoming traffic",
            consequence: "The attack stopped, but so did the business. Thousands of legitimate users are locked out. We lost trust, but the data is safe for now.",
            isOptimal: false,
            trait: "Decisive but Reckless",
          },
          {
            id: "c1-2",
            text: "Filter malicious IP ranges",
            consequence: "Precision strike. You successfully identified the botnet and neutralised it without impacting our customers. Textbook response.",
            isOptimal: true,
            trait: "High-Precision Analytical",
          },
          {
            id: "c1-3",
            text: "Deploy a decoy honeypot",
            consequence: "The attackers are distracted by the decoy, giving us time to trace them. However, some production data was still leaked during the delay.",
            isOptimal: false,
            trait: "Strategic but Risky",
          },
        ],
      },
      {
        id: "cyber-2",
        title: "CRITICAL: Ransomware Payload",
        description: "Warning: An encrypted payload has been detected in the core database. Encryption has reached 14%. Every second counts.",
        choices: [
          {
            id: "c2-1",
            text: "Isolate the database server",
            consequence: "You pulled the plug. It was painful for the users, but you saved the company's entire historical record from permanent loss.",
            isOptimal: true,
            trait: "Tactical Defender",
          },
          {
            id: "c2-2",
            text: "Attempt to decrypt live",
            consequence: "The ransomware is too advanced. While you searched for a key, the encryption finished. The data is gone. Prioritize containment over recovery.",
            isOptimal: false,
            trait: "Over-Confident Analyst",
          },
          {
            id: "c2-3",
            text: "Shutdown the entire network",
            consequence: "Total blackout. You stopped the virus, but the company is dead in the water. A nuclear option that worked, but at what cost?",
            isOptimal: false,
            trait: "Fear-Driven Response",
          },
        ],
      },
      {
        id: "cyber-3",
        title: "DEBRIEF: Internal Threat",
        description: "The breach is contained, but the logs show the credentials used belonged to the CTO. This was an inside job.",
        choices: [
          {
            id: "c3-1",
            text: "Confront the CTO immediately",
            consequence: "You alerted the suspect. They wiped their drives before you could gather evidence. The truth is now buried forever.",
            isOptimal: false,
            trait: "Emotionally Impulsive",
          },
          {
            id: "c3-2",
            text: "Quietly mirror the CTO's logs",
            consequence: "You found the proof. The CTO's account was compromised, not the person. You cleared their name and found the real mole.",
            isOptimal: true,
            trait: "Calculated Investigator",
          },
          {
            id: "c3-3",
            text: "Report to the Board of Directors",
            consequence: "The Board panicked and fired the CTO. The resulting stock drop was worse than the hack itself. You should have verified first.",
            isOptimal: false,
            trait: "Corporate-Minded",
          },
        ],
      },
    ],
  },
};
