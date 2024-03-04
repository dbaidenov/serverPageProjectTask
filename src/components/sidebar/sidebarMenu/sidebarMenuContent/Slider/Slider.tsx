import arrowLeft2 from "../../../../../asets/images/sidebar/sidebar-menu/sidebar-menu-content/arrow-left-2.svg";
import arrowRight2 from "../../../../../asets/images/sidebar/sidebar-menu/sidebar-menu-content/arrow-right-2.svg";
import "./slider.scss";
import { FC, useState } from "react";
import { ISidebarContents } from "../../../../../localdata/sidebar/sidebarContents";

interface SliderProps {
  content: ISidebarContents;
}

const Slider: FC<SliderProps> = ({ content }) => {
  //активный слайдер
  const [activeSlider, setActiveSlider] = useState<number>(0);

  //обработчик активного слайдера
  const handleSliderClick = (direction: number) => () =>
    setActiveSlider((prev) =>
      direction === -1
        ? (prev - 1 + content.content.sliders.length) %
          content.content.sliders.length
        : (prev + 1) % content.content.sliders.length
    );

  return (
    // слайдер

    <div className="sidebar-menu-content__slider">
      {/* счетчик слайдера */}
      <div className="sidebar-menu-content__slider__title">
        <div className="slider-counter">
          {Array.from(
            { length: content.content.sliders.length },
            (_, index) => (
              <span
                key={index}
                className="slider-counter__item"
                style={{
                  transform: `translateY(${(index - activeSlider) * 100}%)`,
                }}
              >
                {index + 1}
              </span>
            )
          )}
        </div>
        /
        <div className="slider-length">
          <span className="slider-length__item">
            {content.content.sliders.length}
          </span>
        </div>
      </div>
      {/* сам контент слайдера */}
      <div className="sidebar-menu-content__slider__slides">
        {content.content.sliders.map((slider, index) => (
          <div
            key={index}
            style={{
              transform: `translateX(${(index - activeSlider) * 100}%)`,
            }}
            className={`sidebar-menu-content__slider__slide ${
              index === activeSlider ? "active" : ""
            }`}
          >
            <span
              className={`sidebar-menu-content__slider__slide-text ${
                activeSlider === index ? "active" : ""
              }`}
            >
              {slider}
            </span>
          </div>
        ))}
      </div>
      {/* вперед */}
      <div
        className="sidebar-menu-content__slider__button prevContentSlider"
        onClick={handleSliderClick(-1)}
      >
        <img src={arrowLeft2} alt="" />
      </div>
      {/* назад */}
      <div
        onClick={handleSliderClick(1)}
        className="sidebar-menu-content__slider__button nextContentSlider"
      >
        <img src={arrowRight2} alt="" />
      </div>
    </div>
  );
};

export default Slider;
