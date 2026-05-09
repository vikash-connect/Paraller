import { create } from "zustand";

interface UserState {
  name: string;
  classLevel: string;
  stream: string;
  dreamCareer: string;
  interests: string[];
  setName: (name: string) => void;
  setClassLevel: (level: string) => void;
  setStream: (stream: string) => void;
  setDreamCareer: (career: string) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  classLevel: "",
  stream: "",
  dreamCareer: "",
  interests: [],
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
}));
