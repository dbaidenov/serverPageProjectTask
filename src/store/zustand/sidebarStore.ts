import { create } from "zustand";

interface ISidebarStore {
  activeSidebar: null | string | number;
  handleActiveSidebar: (sidebarId: number | string | null) => void;
  isSidebarMobileOpen: boolean;
  handleIsMobileSibebarOpen: (status: boolean) => void;
}

export const useSidebarStore = create<ISidebarStore>()((set, get) => ({
  activeSidebar: null,
  handleActiveSidebar(sidebarId: number | string | null) {
    set({
      activeSidebar: get().activeSidebar === sidebarId ? null : sidebarId,
    });
  },
  isSidebarMobileOpen: false,
  handleIsMobileSibebarOpen(status: boolean) {
    set({ isSidebarMobileOpen: status });
  },
}));
