export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  time: string;
  skills: string[];
}

export interface Roadmap {
  role: string;
  overview: string;
  firstMission: {
    title: string;
    description: string;
  };
  steps: RoadmapStep[];
}

export const roadmaps: Record<string, Roadmap> = {
  cybersecurity: {
    role: "Cybersecurity Analyst",
    overview: "A journey from understanding how data moves to defending global digital infrastructures.",
    firstMission: {
      title: "The Secure Vault",
      description: "Build a Python-based encrypted password manager that stores data locally using AES-256 encryption."
    },
    steps: [
      {
        id: "cyber-1",
        title: "Networking Foundations",
        description: "Learn how the internet actually works. Understand IP addresses, DNS, and the OSI model.",
        time: "4-6 Weeks",
        skills: ["TCP/IP", "HTTP/S", "Wireshark Basics"]
      },
      {
        id: "cyber-2",
        title: "Linux Command Line",
        description: "Move away from the mouse. Learn to navigate, manage files, and automate tasks in Linux.",
        time: "3-4 Weeks",
        skills: ["Bash Scripting", "User Permissions", "SSH"]
      },
      {
        id: "cyber-3",
        title: "Defensive Coding",
        description: "Learn how to write code that can't be easily broken. Focus on Python or C++.",
        time: "8-10 Weeks",
        skills: ["Input Validation", "Memory Safety", "Python"]
      },
      {
        id: "cyber-4",
        title: "Ethical Hacking Basics",
        description: "Think like an attacker to build better defenses. Learn about common vulnerabilities like SQLi and XSS.",
        time: "6-8 Weeks",
        skills: ["OWASP Top 10", "Nmap", "Burp Suite"]
      },
      {
        id: "cyber-5",
        title: "Security Operations",
        description: "Introduction to monitoring systems and incident response. Learn to read logs like a pro.",
        time: "Ongoing",
        skills: ["SIEM Basics", "Log Analysis", "Incident Response"]
      }
    ]
  },
  ai_engineer: {
    role: "AI Research Engineer",
    overview: "From basic logic to building neural networks that can think and predict.",
    firstMission: {
      title: "The Sentiment Bot",
      description: "Create a Python script that analyzes social media comments and predicts if they are 'Happy' or 'Sad'."
    },
    steps: [
      {
        id: "ai-1",
        title: "Python for Data Science",
        description: "The backbone of AI. Learn to handle large amounts of data using libraries like NumPy and Pandas.",
        time: "6-8 Weeks",
        skills: ["Python", "Data Cleaning", "Automation"]
      },
      {
        id: "ai-2",
        title: "Mathematical Logic",
        description: "Understand the 'why' behind AI. Learn Linear Algebra and Probability in a practical way.",
        time: "4-6 Weeks",
        skills: ["Matrices", "Statistics", "Calculus Basics"]
      },
      {
        id: "ai-3",
        title: "Machine Learning Foundations",
        description: "Start building models that learn from experience. Explore regression and classification.",
        time: "10-12 Weeks",
        skills: ["Scikit-Learn", "Model Evaluation", "Algorithms"]
      },
      {
        id: "ai-4",
        title: "Neural Networks & Deep Learning",
        description: "Dive into how the human brain inspires AI. Build your first multi-layer neural network.",
        time: "8-10 Weeks",
        skills: ["PyTorch / TensorFlow", "Backpropagation", "CNNs"]
      },
      {
        id: "ai-5",
        title: "AI Ethics & Safety",
        description: "Learn to build AI that is fair, unbiased, and safe for everyone to use.",
        time: "Ongoing",
        skills: ["Bias Detection", "Explainability", "Responsible AI"]
      }
    ]
  },
  product_engineer: {
    role: "Product Engineer",
    overview: "Master the art of building scalable, user-centric apps from scratch.",
    firstMission: {
      title: "The viral MVP",
      description: "Build and deploy a full-stack 'To-Do' app with user authentication and real-time database updates."
    },
    steps: [
      {
        id: "p-1",
        title: "Frontend Mastery",
        description: "Learn to build beautiful, responsive interfaces using modern HTML, CSS, and React.",
        time: "8-10 Weeks",
        skills: ["React", "Tailwind CSS", "Modern JS"]
      },
      {
        id: "p-2",
        title: "Backend & Databases",
        description: "Learn how to store data and build APIs to connect your frontend to the real world.",
        time: "6-8 Weeks",
        skills: ["Node.js", "PostgreSQL", "REST APIs"]
      },
      {
        id: "p-3",
        title: "System Design",
        description: "Learn to think about scale. How do you handle 1,000 users? 1 million? 10 million?",
        time: "6-8 Weeks",
        skills: ["Caching", "Load Balancing", "Cloud (AWS)"]
      },
      {
        id: "p-4",
        title: "User Experience (UX) Design",
        description: "Understand the human side. Build features that people actually want to use.",
        time: "4-6 Weeks",
        skills: ["Figma", "User Testing", "Accessibility"]
      },
      {
        id: "p-5",
        title: "Full-Stack Orchestration",
        description: "Bringing it all together. Deploying, monitoring, and scaling a complete product.",
        time: "Ongoing",
        skills: ["CI/CD", "Docker", "Monitoring Tools"]
      }
    ]
  }
};
