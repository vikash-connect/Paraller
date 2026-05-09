import { create } from "zustand";

export interface DNAMetrics {
  analytical: number;
  creativity: number;
  leadership: number;
  risk: number;
  stress: number;
  problemSolving: number;
  collaboration: number;
}

interface UserState {
  name: string;
  classLevel: string;
  stream: string;
  dreamCareer: string;
  interests: string[];
  decisionDNA: DNAMetrics;
  setName: (name: string) => void;
  setClassLevel: (level: string) => void;
  setStream: (stream: string) => void;
  setDreamCareer: (career: string) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  updateDNA: (metrics: Partial<DNAMetrics>) => void;
}

const initialDNA: DNAMetrics = {
  analytical: 65,
  creativity: 60,
  leadership: 50,
  risk: 40,
  stress: 55,
  problemSolving: 70,
  collaboration: 45,
};

export const useUserStore = create<UserState>((set) => ({
  name: "",
  classLevel: "",
  stream: "",
  dreamCareer: "",
  interests: [],
  decisionDNA: initialDNA,
  setName: (name) => set({ name }),
  setClassLevel: (classLevel) => set({ classLevel }),
  setStream: (stream) => set({ stream }),
  setDreamCareer: (dreamCareer) => set({ dreamCareer }),
  addInterest: (interest) =>
    set((state) => ({ interests: [...state.interests, interest] })),
  removeInterest: (interest) =>
    set((state) => ({
      interests: state.interests.filter((i) => i !== interest),
    })),
  updateDNA: (newMetrics) =>
    set((state) => ({
      decisionDNA: { ...state.decisionDNA, ...newMetrics },
    })),
}));
