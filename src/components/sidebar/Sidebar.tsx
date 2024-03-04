import "./sidebar.scss";
import homeIcon from "./../../asets/images/sidebar/icons/home-icon.svg";
import React, { FC, useCallback, useEffect, useRef } from "react";
import SidebarMenu from "./sidebarMenu/SidebarMenu";
import SidebarIcon from "./sidebarIcon/SidebarIcon";
import TranslateBlock from "./translateBlock/TranslateBlock";
import SidebarContent from "./sidebarContent/SidebarContent";
import { useSidebarStore } from "../../store/zustand/sidebarStore";
import sidebarContents from "../../localdata/sidebar/sidebarContents";

const Sidebar: FC = () => {
  // состояние активного сайдбара
  const activeSidebar = useSidebarStore((state) => state.activeSidebar);

  // состояние для открытия мобильного сайдбара
  const isSidebarMobileOpen = useSidebarStore(
    (state) => state.isSidebarMobileOpen
  );

  // ссылка сайдбара
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  //обработчик активного сайдбара клика вне области
  const handleSidebarOnClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        sidebarRef &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !(e.target as any).closest("header")
      ) {
        useSidebarStore.getState().handleActiveSidebar(null);
        useSidebarStore.getState().handleIsMobileSibebarOpen(false);
      }
    },
    [sidebarRef]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleSidebarOnClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleSidebarOnClickOutside);
  }, [handleSidebarOnClickOutside]);

  //обработчик активного сайдбара при клике на escape
  const handleSidebarOnKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      useSidebarStore.getState().handleActiveSidebar(null);
      useSidebarStore.getState().handleIsMobileSibebarOpen(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleSidebarOnKey);
    return () => document.removeEventListener("keydown", handleSidebarOnKey);
  }, [handleSidebarOnKey]);

  return (
    <div className="sidebar-container">
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarMobileOpen ? "open" : ""}`}
      >
        {/* верхняя часть сайдбара */}
        <div>
          {/* иконка меню сайдбара */}
          <SidebarMenu />
          {/* остальные иконки сайдбара */}
          {sidebarContents.map((sidebarContent) => (
            <React.Fragment key={sidebarContent.id}>
              {/* тут использовал технику окружения еще одним блоком для активной иконки сайдбара, 
                чтобы при стилизации через position fixed другие иконки сайдбара не занимали его место */}
              <div
                className={`${
                  activeSidebar === sidebarContent.id ? "activeBlock" : ""
                }`}
              >
                <SidebarIcon
                  sidebarContent={sidebarContent}
                  activeSidebar={activeSidebar}
                />
              </div>
              {/* контент иконок сайдбара */}
              <SidebarContent sidebarContent={sidebarContent} />
            </React.Fragment>
          ))}
        </div>

        {/* нижняя часть сайдбара */}
        <div>
          <TranslateBlock activeSidebar={activeSidebar} />
          <div className="sidebar__icon">
            <a rel="noreferrer" target="_blank" href="https://www.ps.kz/">
              <img src={homeIcon} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
