import "./sidebarMenu.scss";
import sidebarMenu from "./../../../asets/images/sidebar/icons/sidebar-menu.svg";
import toggleSIdebarMenu from "./../../../asets/images/sidebar/sidebar-menu/toggleSIdebarMenu.svg";
import React, { FC, useState } from "react";
import SidebarMenuContent from "./sidebarMenuContent/SidebarMenuContent";
import sidebarContents from "../../../localdata/sidebar/sidebarContents";
import SidebarMenuOverview from "./sidebarMenuOverview/SidebarMenuOverview";
import { useSidebarStore } from "../../../store/zustand/sidebarStore";

const SidebarMenu: FC = () => {
  const activeSidebar = useSidebarStore((state) => state.activeSidebar);
  const handleActiveSidebar = useSidebarStore(
    (state) => state.handleActiveSidebar
  );

  // состояние для скрытия сайдбара при узких экранах
  const [isSidebarMenuHided, setIsSidebarMenuHided] = useState<boolean>(false);

  // активный контент сайдбара
  const [activeContent, setActiveContent] = useState<string | number>(
    "sidebarOverview"
  );

  // смена активного контента сайдбара
  const handleActiveContent = function (contentId: number | string) {
    setActiveContent((prev) => (contentId === prev ? prev : contentId));
  };

  return (
    <>
      <div
        className={`sidebar__icon ${
          activeSidebar === "sidebarMenu" ? "clicked-menu" : ""
        }`}
        onClick={(e) => {
          handleActiveSidebar(e.currentTarget.id);
        }}
        id="sidebarMenu"
      >
        <img src={sidebarMenu} alt="" />
      </div>
      <div
        className={`sidebar-menu ${
          activeSidebar === "sidebarMenu" ? "open" : "close"
        } ${isSidebarMenuHided ? "hided" : ""}`}
      >
        {/* главный блок */}
        <div
          className={`sidebar-menu__products ${
            isSidebarMenuHided ? "hided" : ""
          }`}
        >
          <div className="sidebar-menu__products__title">Все разделы</div>
          <div className="sidebar-menu__products__sections">
            <div
              onClick={(e) => {
                handleActiveContent(e.currentTarget.id);
              }}
              id="sidebarOverview"
              className={`sidebar-menu__section ${
                activeContent === "sidebarOverview" ? "active" : ""
              }`}
            >
              Обзор
            </div>
            {/* Первый раздел сайдбар меню (Обзор) */}
            {activeSidebar === "sidebarMenu" &&
              activeContent === "sidebarOverview" && (
                <SidebarMenuOverview
                  activeContent={activeContent}
                  isSidebarMenuHided={isSidebarMenuHided}
                />
              )}
            {/* Остальные разделы */}
            {sidebarContents.map((content) => (
              <React.Fragment key={content.id}>
                <div
                  onClick={() => {
                    handleActiveContent(content.id);
                  }}
                  className={`sidebar-menu__section ${
                    activeContent === content.id ? "active" : ""
                  }`}
                >
                  {content.title}
                </div>
                {/* активный контент */}
                {activeSidebar === "sidebarMenu" &&
                  activeContent === content.id && (
                    <SidebarMenuContent
                      isSidebarMenuHided={isSidebarMenuHided}
                      activeContent={activeContent}
                      content={content}
                    />
                  )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* оверлэй бэкграунда */}
        {activeSidebar === "sidebarMenu" && <div className="overlay"></div>}
        {/* свернуть сайдбары при мобилке */}
        <div
          onClick={() => setIsSidebarMenuHided(!isSidebarMenuHided)}
          className={`sidebar-menu-close ${isSidebarMenuHided ? "hided" : ""}`}
        >
          <img src={toggleSIdebarMenu} alt="" />
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
