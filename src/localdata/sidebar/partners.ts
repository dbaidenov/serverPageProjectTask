import microsoft from "./../../asets/images/sidebar/sidebar-menu/partners/microsoft.jpg";
import extreme from "./../../asets/images/sidebar/sidebar-menu/partners/extreme.jpg";
import bitrix from "./../../asets/images/sidebar/sidebar-menu/partners/bitrix.png";
import brocade from "./../../asets/images/sidebar/sidebar-menu/partners/brocade.png";
import fortinet from "./../../asets/images/sidebar/sidebar-menu/partners/fortinet.png";
import icp from "./../../asets/images/sidebar/sidebar-menu/partners/icp.jpg";
import plesk from "./../../asets/images/sidebar/sidebar-menu/partners/plesk.jpg";
import regRu from "./../../asets/images/sidebar/sidebar-menu/partners/regru.png";
import ripeNcc from "./../../asets/images/sidebar/sidebar-menu/partners/ripe-ncc.jpg";
import tdsMedia from "./../../asets/images/sidebar/sidebar-menu/partners/tds-media.png";
import virtuozzo from "./../../asets/images/sidebar/sidebar-menu/partners/virtuozzo.png";
import kazNic from "./../../asets/images/sidebar/sidebar-menu/partners/kaznic.gif";

export interface IPartners {
  id: number;
  img: string;
  title: string;
}

export const partners: IPartners[] = [
  {
    id: 1,
    img: microsoft,
    title: "Microsoft",
  },
  {
    id: 2,
    img: extreme,
    title: "Extreme Networks",
  },
  {
    id: 3,
    img: bitrix,
    title: "1C-Битрикс",
  },
  {
    id: 4,
    img: brocade,
    title: "Brocade Communications System",
  },
  {
    id: 5,
    img: fortinet,
    title: "Fortinet",
  },
  {
    id: 6,
    img: icp,
    title: "ISPsystem",
  },
  {
    id: 7,
    img: plesk,
    title: "Plesk",
  },
  {
    id: 8,
    img: regRu,
    title: "Reg.ru",
  },
  {
    id: 9,
    img: ripeNcc,
    title: "RIPE NCC",
  },
  {
    id: 10,
    img: tdsMedia,
    title: "TDS Media",
  },
  {
    id: 11,
    img: virtuozzo,
    title: "Virtuozzo",
  },
  {
    id: 12,
    img: kazNic,
    title: "KazNIC",
  },
];
