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
        title: "ACT_01: The Breach",
        description: "It's 2:14 AM. Your monitor bleeds crimson. A massive brute-force attack is draining GlobalTrust accounts. Thousands of families are losing their savings in real-time. You are alone in the command center.",
        choices: [
          {
            id: "c1-1",
            text: "Sever all external connections immediately",
            consequence: "The bleeding stops, but you've locked out 50,000 legitimate users. The chaos at support is deafening. You saved the money, but shattered the company's reputation.",
            isOptimal: false,
            trait: "Decisive but Reckless",
          },
          {
            id: "c1-2",
            text: "Precision-block malicious IP signatures",
            consequence: "Textbook response. You surgicaly removed the attackers while legitimate users remained unaware. The data is safe, and the brand is untarnished.",
            isOptimal: true,
            trait: "High-Precision Analytical",
          },
          {
            id: "c1-3",
            text: "Silently monitor to trace the source",
            consequence: "You found the source in Eastern Europe, but another $2M was drained during your investigation. You have intelligence, but you lost the people's money.",
            isOptimal: false,
            trait: "Strategic but Risky",
          },
        ],
      },
      {
        id: "cyber-2",
        title: "ACT_02: The Ransom",
        description: "A digital lock has appeared on the core health database. Encryption is at 40%. Without this data, surgeries at three major hospitals will be cancelled within the hour.",
        choices: [
          {
            id: "c2-1",
            text: "Isolate and restore from backup",
            consequence: "You saved the records. The hospitals are back online. It was slow, and some recent patient notes were lost, but lives were not at risk.",
            isOptimal: true,
            trait: "Tactical Defender",
          },
          {
            id: "c2-2",
            text: "Pay the ransom to ensure speed",
            consequence: "The files are back, but you just funded a global crime syndicate. The CEO is furious about the ethical breach. You chose the easy way out.",
            isOptimal: false,
            trait: "Pressure-Driven",
          },
          {
            id: "c2-3",
            text: "Attempt to crack the key live",
            consequence: "The clock ran out. The encryption finished. Three surgeries were postponed. Your confidence in your skills cost the patients their health.",
            isOptimal: false,
            trait: "Over-Confident",
          },
        ],
      },
      {
        id: "cyber-3",
        title: "ACT_03: The Internal Mole",
        description: "The forensics are in. The breach was executed using the CTO's private key. The Board wants an immediate arrest, but you suspect a deep-fake credential theft.",
        choices: [
          {
            id: "c3-1",
            text: "Report the CTO to the Board",
            consequence: "The CTO was fired and shamed. Later, you found the real thief. An innocent career is ruined because you didn't look closer. You chose safety over truth.",
            isOptimal: false,
            trait: "Corporate-Minded",
          },
          {
            id: "c3-2",
            text: "Deep-trace the key's origin silently",
            consequence: "You found the trace leading to an external server. The CTO is innocent. You saved a reputation and found the real ghost in the machine.",
            isOptimal: true,
            trait: "Calculated Investigator",
          },
          {
            id: "c3-3",
            text: "Confront the CTO directly",
            consequence: "They panicked and deleted their logs to 'protect themselves,' making them look more guilty. You've muddied the waters and lost the evidence.",
            isOptimal: false,
            trait: "Emotionally Impulsive",
          },
        ],
      },
    ],
  },
  ai_engineer: {
    role: "AI Research Engineer",
    scenarios: [
      {
        id: "ai-1",
        title: "ACT_01: The Bias Dilemma",
        description: "Your medical diagnosis model is 99% accurate, but you just discovered it's 15% less accurate for minority demographics. The hospital board wants to deploy it tomorrow.",
        choices: [
          {
            id: "a1-1",
            text: "Halt deployment for re-training",
            consequence: "The Board is angry about the delay, but you refused to ship a biased system. You prioritized ethics over the project deadline.",
            isOptimal: true,
            trait: "Ethically Grounded",
          },
          {
            id: "a1-2",
            text: "Deploy with a warning disclaimer",
            consequence: "You stayed on schedule, but the bias led to three misdiagnoses in the first week. A disclaimer didn't protect the patients.",
            isOptimal: false,
            trait: "Pragmatic but Risky",
          },
          {
            id: "a1-3",
            text: "Apply a quick mathematical patch",
            consequence: "The patch lowered overall accuracy to 85%. Now the model is less effective for everyone. You traded quality for a quick fix.",
            isOptimal: false,
            trait: "Optimization-Focused",
          },
        ],
      },
      {
        id: "ai-2",
        title: "ACT_02: The Neural Blackbox",
        description: "Your trading AI just made $40M in an hour, but nobody knows *how*. The regulators are demanding an explanation of the logic, or they'll shut it down.",
        choices: [
          {
            id: "a2-1",
            text: "Simplify the model for transparency",
            consequence: "You satisfied the regulators, but the AI lost its 'edge.' Profits dropped by 60%. You chose safety over performance.",
            isOptimal: true,
            trait: "Transparent Architect",
          },
          {
            id: "a2-2",
            text: "Obfuscate the logic with jargon",
            consequence: "It worked for a month, then the AI crashed the market. The regulators found out you lied. You are now facing legal action.",
            isOptimal: false,
            trait: "Deceptive",
          },
          {
            id: "a2-3",
            text: "Run parallel explainability tests",
            consequence: "You found a partial explanation, but the delay cost the firm millions in missed trades. A balanced but expensive compromise.",
            isOptimal: false,
            trait: "Balanced Researcher",
          },
        ],
      },
      {
        id: "ai-3",
        title: "ACT_03: The Autonomy Crisis",
        description: "A client wants to use your facial recognition AI for 'behavioral prediction' in public spaces. It's highly profitable but edges into mass surveillance.",
        choices: [
          {
            id: "a3-1",
            text: "Refuse the contract on moral grounds",
            consequence: "You lost a $10M deal and your bonus. However, you slept well knowing your code isn't being used to track citizens. Pure integrity.",
            isOptimal: true,
            trait: "Moral Leader",
          },
          {
            id: "a3-2",
            text: "Accept but limit data retention",
            consequence: "The client bypassed your limits anyway. You took the money but couldn't stop the misuse. A failed compromise.",
            isOptimal: false,
            trait: "Naively Optimistic",
          },
          {
            id: "a3-3",
            text: "Accept and maximize performance",
            consequence: "The project was a financial triumph, but you are now the architect of a surveillance state. Your DNA shows zero ethical friction.",
            isOptimal: false,
            trait: "Purely Profit-Driven",
          },
        ],
      },
    ],
  },
  product_engineer: {
    role: "Product Engineer",
    scenarios: [
      {
        id: "p1-1",
        title: "ACT_01: The Launch Crash",
        description: "The big launch is in 2 hours. A critical bug is crashing the app for 30% of Android users. The Marketing team has already spent $1M on the ads.",
        choices: [
          {
            id: "p1-1-1",
            text: "Delay the launch until fixed",
            consequence: "Marketing is furious, but you refused to ship a broken product. The launch happened 2 days later, flawlessly. Quality won.",
            isOptimal: true,
            trait: "Quality Obsessed",
          },
          {
            id: "p1-1-2",
            text: "Disable features for Android users",
            consequence: "You launched on time, but 30% of your new users hit a dead end. Your app store rating plummeted to 1.5 stars instantly.",
            isOptimal: false,
            trait: "Launch-At-All-Costs",
          },
          {
            id: "p1-1-3",
            text: "Ship with a 'Beta' tag",
            consequence: "Users were confused. 'Beta' didn't stop the frustration of a crash. You tried to manage expectations but failed on execution.",
            isOptimal: false,
            trait: "Expectation Manager",
          },
        ],
      },
      {
        id: "p2-1",
        title: "ACT_02: The Feature Bloat",
        description: "The CEO wants to add 5 new social features to the core banking app. Your data shows users just want it to be faster, not more complex.",
        choices: [
          {
            id: "p2-1-1",
            text: "Fight for a minimal, fast core",
            consequence: "It was a tough battle, but the app remained lean. User retention hit an all-time high because the app 'just works.'",
            isOptimal: true,
            trait: "User Advocate",
          },
          {
            id: "p2-1-2",
            text: "Build all 5 features as requested",
            consequence: "The app became slow and confusing. Power users left for a simpler competitor. You followed orders but lost the product.",
            isOptimal: false,
            trait: "Corporate Yes-Man",
          },
          {
            id: "p2-1-3",
            text: "Build 2 features as a compromise",
            consequence: "Neither side is happy. The app is slightly slower, and the CEO feels you didn't deliver the full vision. A weak middle ground.",
            isOptimal: false,
            trait: "Political Compromiser",
          },
        ],
      },
      {
        id: "p3-1",
        title: "ACT_03: The Scaling Wall",
        description: "Your app just went viral. The servers are melting. You can either rewrite the core architecture (slow) or add 10 more expensive servers (fast but costly).",
        choices: [
          {
            id: "p3-1-1",
            text: "Rewrite the core for efficiency",
            consequence: "The app was down for 4 hours during the migration, but now it handles 10x the traffic at half the cost. Sustainable growth achieved.",
            isOptimal: true,
            trait: "Scalability Master",
          },
          {
            id: "p3-1-2",
            text: "Throw more money at servers",
            consequence: "The app stayed up, but the server bill ate all the profit. You solved the symptom but ignored the disease. Not sustainable.",
            isOptimal: false,
            trait: "Short-Term Solver",
          },
          {
            id: "p3-1-3",
            text: "Rate-limit the new users",
            consequence: "You stopped the growth in its tracks. The hype died because people couldn't get in. You killed the momentum out of fear.",
            isOptimal: false,
            trait: "Risk-Averse",
          },
        ],
      },
    ],
  },
};

