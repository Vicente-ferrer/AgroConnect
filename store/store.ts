import { create } from 'zustand';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

export interface Exhibitor {
  id: string;
  name: string;
  sector: string;
  description: string;
  logo: string;
  catalog: string[];
  contact: {
    whatsapp?: string;
    phone?: string;
    website?: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export interface AgroConnectState {
  // User
  savedEvents: string[];
  addSavedEvent: (eventId: string) => void;
  removeSavedEvent: (eventId: string) => void;
  
  // Events
  events: Event[];
  setEvents: (events: Event[]) => void;
  
  // Exhibitors
  exhibitors: Exhibitor[];
  setExhibitors: (exhibitors: Exhibitor[]) => void;
  
  // News
  news: News[];
  setNews: (news: News[]) => void;
}

export const useStore = create<AgroConnectState>((set) => ({
  // User
  savedEvents: [],
  addSavedEvent: (eventId) => set((state) => ({ 
    savedEvents: [...state.savedEvents, eventId] 
  })),
  removeSavedEvent: (eventId) => set((state) => ({ 
    savedEvents: state.savedEvents.filter(id => id !== eventId) 
  })),
  
  // Events
  events: [],
  setEvents: (events) => set({ events }),
  
  // Exhibitors
  exhibitors: [],
  setExhibitors: (exhibitors) => set({ exhibitors }),
  
  // News
  news: [],
  setNews: (news) => set({ news }),
}));
