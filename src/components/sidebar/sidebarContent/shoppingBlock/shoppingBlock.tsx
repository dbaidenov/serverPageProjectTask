import "./shoppingBlock.scss";
import plus from "../../../../asets/images/sidebar/sidebar-content/plus.svg";
import minus from "../../../../asets/images/sidebar/sidebar-content/minus.svg";
import disabledButton from "../../../../asets/images/sidebar/sidebar-content/disabledButton.svg";
import confirm from "../../../../asets/images/sidebar/sidebar-content/confirm.svg";
import sad from "../../../../asets/images/sidebar/sidebar-content/sad.svg";
import { FC, useEffect, useState } from "react";
import { ISidebarContents } from "../../../../localdata/sidebar/sidebarContents";
import { useShoppingStore } from "../../../../store/zustand/shoppingStore";

interface ShoppingBlockProps {
  sidebarContent: ISidebarContents;
  totalShoppingCnt: number;
}

const ShoppingBlock: FC<ShoppingBlockProps> = ({
  sidebarContent,
  totalShoppingCnt,
}) => {
  // состояния для анимации числа при увеличени или уменьшении
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  // для анимации
  useEffect(() => {
    setIsAnimated(true);
    const timeoutId = setTimeout(() => setIsAnimated(false), 80);
    return () => clearTimeout(timeoutId);
  }, [clicked]);

  // достаем нужнные методы из хранилища
  const decreaseShoppingCnt = useShoppingStore(
    (state) => state.decreaseShoppingCnt
  );
  const increaseShoppingCnt = useShoppingStore(
    (state) => state.increaseShoppingCnt
  );
  const putShoppingCnt = useShoppingStore((state) => state.putShoppingCnt);
  const deleteShoppingCard = useShoppingStore(
    (state) => state.deleteShoppingCard
  );

  // состояние range инпута
  const [value, setValue] = useState<number>(0);

  // обработчик увеличения покупки
  const handleIncreaseShoppingCnt = function () {
    increaseShoppingCnt(sidebarContent.id);
    setClicked(!clicked);
  };

  // обработчик уменьшения покупки
  const handleDecreaseShoppingCnt = function () {
    decreaseShoppingCnt(sidebarContent.id);
    setClicked(!clicked);
  };

  // обработчик инпута
  const handleShoppingCntByInput = () => {
    if (value === 0) {
      deleteShoppingCard(sidebarContent.id);
    } else {
      putShoppingCnt(sidebarContent.id, value);
    }
    setClicked(!clicked);
  };

  return (
    <div className="sidebar-content__shoppingBlock">
      {/* добавление и уменьшение покупок */}
      <div className="sidebar-content__shoppingBlock-main">
        <button
          onClick={handleDecreaseShoppingCnt}
          className={`sidebar-content__shoppingBlock-main__button active ${
            totalShoppingCnt >= 501 ? "alert" : ""
          }`}
        >
          <img src={minus} alt="" />
        </button>
        <div>
          <span>Итого: </span>
          <span
            className={`sidebar-content__shoppingBlock-main__total ${
              isAnimated ? "animated" : ""
            }`}
          >
            {totalShoppingCnt}
          </span>
        </div>
        <button
          disabled={totalShoppingCnt > 500}
          onClick={handleIncreaseShoppingCnt}
          className={`sidebar-content__shoppingBlock-main__button ${
            totalShoppingCnt < 501 ? "active" : ""
          }`}
        >
          <img src={totalShoppingCnt >= 501 ? disabledButton : plus} alt="" />
        </button>
      </div>
      {/* кнопка удаления */}
      <button
        onClick={() => deleteShoppingCard(sidebarContent.id)}
        className="sidebar-content__shoppingBlock__button"
      >
        Удалить все
      </button>
      {/* инпут */}
      <div className="sidebar-content__shoppingBlock__input">
        <div className="sidebar-content__shoppingBlock__input-main">
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={value}
            onChange={(e) => setValue(+e.currentTarget.value)}
          />
          <span>{value}</span>
        </div>
        <button
          onClick={handleShoppingCntByInput}
          className={`sidebar-content__shoppingBlock__input__button ${
            value > 0 ? "animated" : ""
          }`}
        >
          <img src={confirm} alt="" />
        </button>
      </div>
      {/* алерт при достижении максимального числа покупок */}
      <div
        className={`sidebar-content__shoppingBlock-main-alert ${
          totalShoppingCnt >= 501 ? "active" : ""
        }`}
      >
        <span>Превышен лимит!</span>
        <img src={sad} alt="" />
      </div>
    </div>
  );
};

export default ShoppingBlock;
