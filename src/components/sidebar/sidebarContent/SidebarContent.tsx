import "./sidebarContent.scss";
import { FC } from "react";
import { ISidebarContents } from "../../../localdata/sidebar/sidebarContents";
import { useShoppingStore } from "../../../store/zustand/shoppingStore";
import ShoppingBlock from "./shoppingBlock/shoppingBlock";
import { useSidebarStore } from "../../../store/zustand/sidebarStore";

interface SidebarContentProps {
  sidebarContent: ISidebarContents;
}

const SidebarContent: FC<SidebarContentProps> = ({ sidebarContent }) => {
  const activeSidebar = useSidebarStore((state) => state.activeSidebar);

  // достаем нужные функции из хранилища
  const increaseShoppingCnt = useShoppingStore(
    (state) => state.increaseShoppingCnt
  );
  const { getTotalShoppingCnt } = useShoppingStore();

  // общее число покупок
  const totalShoppingCnt = getTotalShoppingCnt(sidebarContent.id) as number;

  return (
    <div
      className={`${
        activeSidebar === sidebarContent.id ? "open" : "close"
      } sidebar-content`}
    >
      <div className="sidebar-content__title">{sidebarContent.title}</div>
      {/* условный блок кода при наличии покупок */}
      {totalShoppingCnt ? (
        <ShoppingBlock
          sidebarContent={sidebarContent}
          totalShoppingCnt={totalShoppingCnt}
        />
      ) : (
        // кнопка для покупки
        <button
          onClick={() => increaseShoppingCnt(sidebarContent.id)}
          className="sidebar-content__button"
        >
          Купить
        </button>
      )}
    </div>
  );
};

export default SidebarContent;
