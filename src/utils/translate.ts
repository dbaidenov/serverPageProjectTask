import { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

// Создаем пользовательский хук для изменения активного языка
export const useChangeActiveLanguage = () => {
  const { i18n } = useTranslation();

  const changeActiveLanguage = (e: MouseEvent<HTMLDivElement>) => {
    // функция перевода текущего языка сайта
    const lang = e.currentTarget.textContent as string;
    i18n.changeLanguage(lang);
  };

  return changeActiveLanguage;
};
