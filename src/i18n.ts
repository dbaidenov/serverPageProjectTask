import i18next, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";

import headContainerEn from "./translation/English/headContainer.json";
import headerEn from "./translation/English/header.json";
import inputContainerEn from "./translation/English/inputContainer.json";
import headContainerKz from "./translation/Kazakh/headContainer.json";
import headerKz from "./translation/Kazakh/header.json";
import inputContainerKz from "./translation/Kazakh/inputContainer.json";
import headContainerRu from "./translation/Russian/headContainer.json";
import headerRu from "./translation/Russian/header.json";
import inputContainerRu from "./translation/Russian/inputContainer.json";
import headContainerUz from "./translation/Uzbek/headContainer.json";
import headerUz from "./translation/Uzbek/header.json";
import inputContainerUz from "./translation/Uzbek/inputContainer.json";

interface LanguageResources {
  header: Record<string, string>;
  headContainer: Record<string, string>;
  inputContainer: Record<string, string>;
}

type Langs = "en" | "kz" | "ru" | "uz";

const resources: Record<Langs, LanguageResources> = {
  en: {
    header: headerEn,
    headContainer: headContainerEn,
    inputContainer: inputContainerEn,
  },
  kz: {
    header: headerKz,
    headContainer: headContainerKz,
    inputContainer: inputContainerKz,
  },
  ru: {
    header: headerRu,
    headContainer: headContainerRu,
    inputContainer: inputContainerRu,
  },
  uz: {
    header: headerUz,
    headContainer: headContainerUz,
    inputContainer: inputContainerUz,
  },
};

export const languages: string[] = Object.keys(resources);

i18next.use(initReactI18next).init({
  resources: resources as unknown as Resource,
  lng: "ru",
});

export default i18next;
