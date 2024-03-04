import "./translateBlock.scss";
import translateIcon from "./../../../asets/images/sidebar/icons/translate-icon.svg";
import { FC } from "react";
import { useInView } from "react-intersection-observer";
import { languages } from "../../../i18n";
import { useChangeActiveLanguage } from "../../../utils/translate";
import { useSidebarStore } from "../../../store/zustand/sidebarStore";

interface TranslateBlockProps {
  activeSidebar: string | null | number;
}
const TranslateBlock: FC<TranslateBlockProps> = ({ activeSidebar }) => {
  const handleActiveSidebar = useSidebarStore(
    (state) => state.handleActiveSidebar
  );

  // функция для перевода страницы
  const changeActiveLanguage = useChangeActiveLanguage();

  // является ли активным сайдбаром
  const isTranslateBlockActive = activeSidebar === "translateBlock";

  // область видимости блока языков
  const [langRef, langInView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  return (
    <>
      <div className={`${isTranslateBlockActive && "activeBlock"}`}>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) =>
            handleActiveSidebar(e.currentTarget.id)
          }
          id="translateBlock"
          className={`sidebar__icon ${
            isTranslateBlockActive ? "clicked-icon" : "noclicked"
          }`}
        >
          <img src={translateIcon} alt="" />
        </div>
      </div>
      <div
        className={`sidebar-translateBlock ${
          isTranslateBlockActive ? "open" : "close"
        }`}
      >
        {languages.map((language) => (
          <div
            ref={langRef}
            onClick={changeActiveLanguage}
            key={language}
            className={`sidebar-translateBlock__item ${
              langInView ? "show" : ""
            }`}
          >
            {language}
          </div>
        ))}
      </div>
    </>
  );
};

export default TranslateBlock;
