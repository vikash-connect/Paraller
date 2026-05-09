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
        title: "INCIDENT_DETECTED: Suspicious Logins",
        description: "A fintech company detects suspicious login attempts from multiple countries occurring simultaneously on a high-value admin account.",
        choices: [
          {
            id: "c1-1",
            text: "Block all traffic immediately",
            consequence: "Blocking all traffic caused a severe business outage. Legitimate users were locked out, causing financial loss. Next time, investigate before using the nuclear option.",
            isOptimal: false,
            trait: "Reckless Action",
          },
          {
            id: "c1-2",
            text: "Investigate logs & identify IPs",
            consequence: "Excellent. By analyzing the logs, you identified a botnet. You successfully blocked only the malicious IPs without disrupting legitimate traffic.",
            isOptimal: true,
            trait: "Analytical & Cautious",
          },
          {
            id: "c1-3",
            text: "Alert users immediately",
            consequence: "You alerted the users, but the attacker was already inside. Panic ensued without stopping the breach. Mitigation must happen parallel to communication.",
            isOptimal: false,
            trait: "Communication-Focused",
          },
          {
            id: "c1-4",
            text: "Monitor silently",
            consequence: "You gathered intelligence, but the attacker exfiltrated 50GB of sensitive data while you watched. Passive monitoring is too slow for active breaches.",
            isOptimal: false,
            trait: "Overly Passive",
          },
        ],
      },
      {
        id: "cyber-2",
        title: "ESCALATION: Ransomware Payload",
        description: "While securing the login nodes, an alert fires: an encrypted payload is executing on the internal database server. File encryption has started.",
        choices: [
          {
            id: "c2-1",
            text: "Pay the ransom immediately",
            consequence: "You paid the ransom, but the decryptor didn't work. The company lost money and data. Never negotiate with terrorists as a first resort.",
            isOptimal: false,
            trait: "Easily Intimidated",
          },
          {
            id: "c2-2",
            text: "Isolate the server from the network",
            consequence: "Swift action! You pulled the virtual plug, stopping the ransomware from spreading to backups. You saved 90% of the company's data.",
            isOptimal: true,
            trait: "Decisive & Tactical",
          },
          {
            id: "c2-3",
            text: "Run antivirus scan",
            consequence: "The standard AV took too long and the ransomware bypassed it entirely. The database was lost. Standard tools aren't enough for advanced threats.",
            isOptimal: false,
            trait: "Overly Reliant on Tools",
          },
          {
            id: "c2-4",
            text: "Attempt to reverse engineer the payload",
            consequence: "You spent critical minutes analyzing code while the encryption spread. You understand the virus, but the data is gone. Prioritize containment over analysis.",
            isOptimal: false,
            trait: "Curious but Impractical",
          },
        ],
      }
    ],
  },
};
