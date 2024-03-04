import clients from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/clients.png";
import helpers from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/helpers.png";
import domens from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/domens.png";
import icann from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/icann-logo.png";
import iso from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/iso-logo.png";
import pci from "./../../asets/images/sidebar/sidebar-menu/sidebar-menu-overview/pci-logo.png";

interface ICards {
  id: number;
  img: string;
  title: string;
  text: string;
}

export const achievementsCards: ICards[] = [
  {
    id: 1,
    img: clients,
    title: "196 000+",
    text: "Зарегистрированных клиентов",
  },
  {
    id: 2,
    img: helpers,
    title: "1 600+",
    text: "Запросов в службу поддержки еженедельно",
  },
  {
    id: 3,
    img: domens,
    title: "93 000+",
    text: "Активных зарегистрированных доменов",
  },
];

export const acknowledgmentsCards: Omit<ICards, "text">[] = [
  {
    id: 1,
    img: icann,
    title: "Аккредитованный ICANN регистратор доменных имен",
  },
  { id: 2, img: iso, title: "Сертифицировано по стандарту ИБ ISO/IEC 27001" },
  { id: 3, img: pci, title: "Сертифицировано по стандарту PCI DSS 3.2.1" },
];
