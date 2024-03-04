import "./sidebarMenuOverview.scss";
import headerVideo from "./../../../../asets/videos/hight tech video.mp4";
import { Carousel } from "antd";
import { FC, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { partners } from "../../../../localdata/sidebar/partners";
import { achievementsCards } from "../../../../localdata/sidebar/cards";
import { acknowledgmentsCards } from "../../../../localdata/sidebar/cards";

interface SidebarMenuOverviewProps {
  activeContent: number | string | null;
  isSidebarMenuHided: boolean;
}
const SidebarMenuOverview: FC<SidebarMenuOverviewProps> = ({
  activeContent,
  isSidebarMenuHided,
}) => {
  //ref для root в useInView (из-за position:fixed не работает правильно)
  const sidebarMenuOverviewRef = useRef<HTMLDivElement | null>(null);

  // области видимости элементов
  const [achievementsRef, achievementsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
    root: sidebarMenuOverviewRef.current,
  });
  const [videoRef, videoInView] = useInView({
    threshold: 0,
    triggerOnce: false,
    root: sidebarMenuOverviewRef.current,
  });
  const [acknowledgmentsRef, acknowledgmentsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
    root: sidebarMenuOverviewRef.current,
  });
  const [carouselRef, carouselInView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
    root: sidebarMenuOverviewRef.current,
  });

  return (
    <div
      ref={sidebarMenuOverviewRef}
      className={`sidebar-menu-overview ${
        activeContent === "sidebarOverview" ? "open" : "close"
      } ${isSidebarMenuHided ? "hided" : ""}`}
    >
      {/* кружочек */}
      <div className="circle rotate-center">
        <svg viewBox="0 0 100 100" width="100" height="100">
          <defs>
            <path
              id="circle"
              d="
                        M 50, 50
                        m -37, 0
                        a 37,37 0 1,1 74,0
                        a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text fontSize="15.3">
            <textPath href="#circle">The best with PS Cloud Services.</textPath>
          </text>
        </svg>
      </div>
      {/* первый блок с видео */}
      <div className="sidebar-menu-overview__title">
        <video
          ref={videoRef}
          style={{
            opacity: videoInView ? 1 : 0,
            visibility: videoInView ? "visible" : "hidden",
          }}
          autoPlay
          muted
          loop
          id="myVideo"
        >
          <source src={headerVideo} type="video/mp4" />
        </video>
        <span>PS Cloud Services – Ваш Путь к Успеху в Мире IT!</span>
      </div>
      {/* второй блок с надписями */}
      <div className="sidebar-menu-overview__description">
        <span>
          Мы рады предложить вам ряд эксклюзивных услуг, которые помогут вашему
          бизнесу достичь новых высот. Наши профессиональные решения и передовые
          технологии гарантируют надежность, безопасность и выдающуюся
          производительность.
        </span>
      </div>
      {/* третий блок с тремя карточками */}
      <div
        className={`sidebar-menu-overview__achievements ${
          achievementsInView ? "view" : ""
        }`}
        ref={achievementsRef}
      >
        {achievementsCards.map((item) => (
          <div key={item.id} className="card">
            <img src={item.img} alt="" />
            <div className="card__item">
              <div className="card__title">{item.title}</div>
              <div className="card__text">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
      {/* четвертый блок с тремя круглыми иконками */}
      <div className="sidebar-menu-overview__acknowledgments">
        {acknowledgmentsCards.map((item, index) => (
          <div key={item.id} ref={acknowledgmentsRef} className="card">
            <img
              style={{
                transform: `translateX(${(index % 2 === 0 ? -1 : 1) * 100}rem)`,
              }}
              className={`card__img ${acknowledgmentsInView ? "view" : ""}`}
              src={item.img}
              alt=""
            />
            <div
              className={`card__text ${acknowledgmentsInView ? "view" : ""}`}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
      {/* последний блок про партнеров */}
      <div ref={carouselRef} className="sidebar-menu-overview__partners">
        <div
          className={`sidebar-menu-overview__partners__title ${
            carouselInView ? "view" : ""
          }`}
        >
          Партнеры PS Cloud Services
        </div>
        {/* Карусель из Ant design */}
        <Carousel
          dots={false}
          autoplaySpeed={1300}
          speed={1000}
          autoplay
          infinite
        >
          {partners.map((item) => {
            return (
              <img
                key={item.id}
                className="carousel-item"
                src={item.img}
                alt=""
              />
            );
          })}
        </Carousel>
        <div
          className={`sidebar-menu-overview__partners__description ${
            carouselInView ? "view" : ""
          }`}
        >
          Мы работаем на рынке казахстанского хостинга с 2003 года и всегда
          придирчиво выбираем наших партнеров — сотрудничаем только с надежными
          компаниями.
        </div>
      </div>
    </div>
  );
};

export default SidebarMenuOverview;
