import "./header.scss";
import logo from "./../../asets/images/header/PS-logo.svg";
import mobileBurger from "./../../asets/images/header/mobileBurger.svg";
import removeMobileBurger from "./../../asets/images/header/removeMobileBurger.svg";
import { FC, useEffect, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSidebarStore } from "../../store/zustand/sidebarStore";
import { useHeaderStore } from "../../store/zustand/headerStore";
import usersList from "../../localdata/accounts";
import NavAccount from "./navAccount/NavAccount";
import NavBalance from "./navBalance/NavBalance";
import HiddenNavAccount from "./hiddenNavAccount/HiddenNavAccount";
import HiddenNavBalance from "./hiddenNavBalance/HiddenNavBalance";

const Header: FC = () => {
  //t функция для перевода
  const { t } = useTranslation(["header"]);

  // обработчик активного сайдбара
  const handleActiveSidebar = useSidebarStore(
    (state) => state.handleActiveSidebar
  );

  // состояние иконки сайдбара при мобилке
  const isSidebarMobileOpen = useSidebarStore(
    (state) => state.isSidebarMobileOpen
  );
  const handleIsMobileSibebarOpen = useSidebarStore(
    (state) => state.handleIsMobileSibebarOpen
  );

  // текущий пользователь
  const [currentUserID, setCurrentUserID] = useState<number>(usersList[0].id);
  const currentUser = usersList.find((user) => user.id === currentUserID);
  const handleCurrentUserID = (userIDToChange: number) => {
    setCurrentUserID(userIDToChange);
  };

  // состояние модального окна
  const [isModalWindowActive, setIsModalWindowActive] = useState(false);
  const handleIsModalWindowActive = (isActive: boolean) => {
    setIsModalWindowActive(isActive);
  };

  // функция обработки на кнопку Escape
  const handleNavOnKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isModalWindowActive) {
        useHeaderStore.getState().handleIsNavAccountClicked(false);
        useHeaderStore.getState().handleIsNavBalanceClicked(false);
      }
    },
    [isModalWindowActive]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleNavOnKey);
    return () => document.removeEventListener("keydown", handleNavOnKey);
  }, [isModalWindowActive, handleNavOnKey]);

  // функция обработки на клик вне нав аккаунта или баланса
  const handleClickOutsideNav = useCallback((e: MouseEvent) => {
    const target = e.target as any;
    if (
      !target.closest("#hiddenAccount") &&
      !target.closest("#hiddenBalance") &&
      !target.closest(".modal-window")
    ) {
      useHeaderStore.getState().handleIsNavAccountClicked(false);
      useHeaderStore.getState().handleIsNavBalanceClicked(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideNav);
    return () => {
      document.removeEventListener("click", handleClickOutsideNav);
    };
  }, [handleClickOutsideNav]);

  return (
    <header className="header">
      {/* иконка сайдбара при мобилке */}
      <div
        className="header-logo__img mobile"
        onClick={() => {
          if (isSidebarMobileOpen) {
            handleActiveSidebar(null);
            handleIsMobileSibebarOpen(false);
          } else handleIsMobileSibebarOpen(true);
        }}
      >
        <img
          src={isSidebarMobileOpen ? removeMobileBurger : mobileBurger}
          alt=""
        />
      </div>
      {/* лого */}
      <div className="header-logo">
        <div className="header-logo__img">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <div className="header-logo__text">
          {t("logoTitleFirstWord", {
            ns: ["header"],
          })}
          <br />
          {t("logoTitleSecondWord", {
            ns: ["header"],
          })}
        </div>
      </div>

      {/* nav */}
      <nav className="header-nav">
        {currentUser && (
          <>
            {/* аккаунт */}
            <NavAccount currentUser={currentUser} />
            {/* контент аккаунта */}
            <HiddenNavAccount
              currentUser={currentUser}
              handleCurrentUserID={handleCurrentUserID}
              isModalWindowActive={isModalWindowActive}
              handleIsModalWindowActive={handleIsModalWindowActive}
            />
            {/* баланс */}
            <NavBalance currentUser={currentUser} />
            {/* контент баланса */}
            <HiddenNavBalance currentUser={currentUser} />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
