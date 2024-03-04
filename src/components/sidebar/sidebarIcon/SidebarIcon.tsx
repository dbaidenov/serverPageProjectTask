import "./sidebarIcon.scss";
import { FC } from "react";
import { ISidebarContents } from "../../../localdata/sidebar/sidebarContents";
import { useShoppingStore } from "../../../store/zustand/shoppingStore";
import { useSidebarStore } from "../../../store/zustand/sidebarStore";

interface SidebarIconProps {
  sidebarContent: ISidebarContents;
  activeSidebar: number | string | null;
}

const SidebarIcon: FC<SidebarIconProps> = ({
  sidebarContent,
  activeSidebar,
}) => {
  const handleActiveSidebar = useSidebarStore(
    (state) => state.handleActiveSidebar
  );
  const { getTotalShoppingCnt } = useShoppingStore();
  const shoppingCnt = getTotalShoppingCnt(sidebarContent.id);

  return (
    // иконка сайдбара
    <div
      onClick={() => {
        handleActiveSidebar(sidebarContent.id);
      }}
      className={`sidebar__icon ${
        activeSidebar === sidebarContent.id ? "clicked-icon" : ""
      }`}
      key={sidebarContent.id}
    >
      <img src={sidebarContent.img} alt="" />
      {/* span числа покупок при наличии */}
      {shoppingCnt && (
        <span className="sidebar__icon-shoppingCnt">{shoppingCnt}</span>
      )}
    </div>
  );
};

export default SidebarIcon;
