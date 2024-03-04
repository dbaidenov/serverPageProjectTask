import { create } from "zustand";

interface IHeaderStore {
  isNavBalanceClicked: boolean;
  isNavAccountClicked: boolean;
  handleIsNavBalanceClicked: (isClicked: boolean) => void;
  handleIsNavAccountClicked: (isClicked: boolean) => void;
  handleNavItemOnClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const useHeaderStore = create<IHeaderStore>((set, get) => ({
  isNavAccountClicked: false,
  isNavBalanceClicked: false,
  handleIsNavAccountClicked(isClicked) {
    set({ isNavAccountClicked: isClicked });
  },
  handleIsNavBalanceClicked(isClicked) {
    set({ isNavBalanceClicked: isClicked });
  },
  handleNavItemOnClick(e) {
    if (e.currentTarget.id === "account") {
      if (get().isNavAccountClicked) {
        get().handleIsNavAccountClicked(false);
      } else {
        get().handleIsNavBalanceClicked(false);
        get().handleIsNavAccountClicked(true);
      }
    }
    if (e.currentTarget.id === "balance") {
      if (get().isNavBalanceClicked) {
        get().handleIsNavBalanceClicked(false);
      } else {
        get().handleIsNavAccountClicked(false);
        get().handleIsNavBalanceClicked(true);
      }
    }
    e.stopPropagation();
  },
}));
