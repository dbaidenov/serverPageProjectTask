import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ISidebarShoppingStore {
  shoppingCnt: {
    id: number;
    cnt: number;
  }[];
  increaseShoppingCnt: (id: number) => void;
  decreaseShoppingCnt: (id: number) => void;
  putShoppingCnt: (id: number, newCnt: number) => void;
  getTotalShoppingCnt: (id: number) => number | undefined;
  deleteShoppingCard: (id: number) => void;
}

export const useShoppingStore = create<ISidebarShoppingStore>()(
  devtools(
    persist(
      (set, get) => ({
        shoppingCnt: [],
        increaseShoppingCnt(id) {
          const shoppingCnt = get().shoppingCnt;

          if (!shoppingCnt.find((item) => item.id === id)) {
            set({ shoppingCnt: [...shoppingCnt, { id, cnt: 1 }] });
          } else {
            set({
              shoppingCnt: shoppingCnt.map((item) => {
                if (item.id === id && item.cnt <= 500) {
                  return { ...item, cnt: item.cnt + 1 };
                } else return item;
              }),
            });
          }
        },
        decreaseShoppingCnt(id) {
          const shoppingCnt = get().shoppingCnt;
          if (shoppingCnt.find((item) => item.id === id)?.cnt === 1) {
            set({ shoppingCnt: shoppingCnt.filter((item) => item.id !== id) });
          } else {
            set({
              shoppingCnt: shoppingCnt.map((item) => {
                if (item.id === id) {
                  return { ...item, cnt: item.cnt - 1 };
                } else return item;
              }),
            });
          }
        },
        putShoppingCnt(id, newCnt) {
          set({
            shoppingCnt: get().shoppingCnt.map((item) => {
              if (item.id === id) {
                return { ...item, cnt: newCnt };
              } else return item;
            }),
          });
        },
        getTotalShoppingCnt(id) {
          return get().shoppingCnt.find((item) => item.id === id)?.cnt;
        },
        deleteShoppingCard(id) {
          set({
            shoppingCnt: get().shoppingCnt.filter((item) => item.id !== id),
          });
        },
      }),
      { name: "shoppingInfo" }
    )
  )
);
