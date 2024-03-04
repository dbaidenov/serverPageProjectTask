import "./sidebarMenuContent.scss";
import arrowLeft from "./../../../../asets/images/sidebar/sidebar-menu/sidebar-menu-content/arrow-left.svg";
import { FC } from "react";
import Slider from "./Slider/Slider";
import { useShoppingStore } from "../../../../store/zustand/shoppingStore";
import { ISidebarContents } from "../../../../localdata/sidebar/sidebarContents";
import { useSidebarStore } from "../../../../store/zustand/sidebarStore";

interface SidebarMenuContentProps {
  activeContent: number | string | null;
  content: ISidebarContents;
  isSidebarMenuHided: boolean;
}

const SidebarMenuContent: FC<SidebarMenuContentProps> = ({
  activeContent,
  content,
  isSidebarMenuHided,
}) => {
  const activeSidebar = useSidebarStore((state) => state.activeSidebar);

  //увеличение корзины покупок
  const increaseShoppingCnt = useShoppingStore(
    (state) => state.increaseShoppingCnt
  );

  return (
    <div
      className={`sidebar-menu-content ${
        activeSidebar === "sidebarMenu" && activeContent === content.id
          ? "open"
          : "close"
      } ${isSidebarMenuHided ? "hided" : ""}`}
    >
      {/* первый блок*/}
      <div className="sidebar-menu-content__main">
        <div className="sidebar-menu-content__main__logo">
          <img src={content.img} alt="" />
          <span>{content.content.contentTitle}</span>
        </div>
        <span className="line"></span>
        <div className="sidebar-menu-content__main__description">
          {content.content.contentDescription}
        </div>
        <div
          className="sidebar-menu-content__main__button"
          onClick={() => increaseShoppingCnt(content.id)}
        >
          <span>{content.content.buy}</span>
          <img src={arrowLeft} alt="" />
        </div>
      </div>
      {/* второй блок (слайдер) */}
      <Slider content={content} />
    </div>
  );
};

export default SidebarMenuContent;
