import "./navBalance.scss";
import currencyImage from "./../../../asets/images/header/currencyImage.png";
import downArrow from "./../../../asets/images/header/down_arrow.png";
import { FC, useState } from "react";
import { currencyFormat } from "../../../utils/currencyFormat";
import { IAccounts } from "../../../localdata/accounts";
import { useHeaderStore } from "../../../store/zustand/headerStore";

interface NavBalanceProps {
  currentUser: IAccounts;
}

const NavBalance: FC<NavBalanceProps> = ({ currentUser }) => {
  // состояние клика иконки стрелки
  const [isArrowImgClicked, setIsArrowImgClicked] = useState<boolean>(false);

  // функция для стилизации при клике на иконку стрелки
  const handleArrowImgClick = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    setIsArrowImgClicked(!isArrowImgClicked);
    e.stopPropagation();
  };

  // состояния клика на нав баланса
  const isNavBalanceClicked = useHeaderStore(
    (state) => state.isNavBalanceClicked
  );

  //функция обработки клика на нав аккаунта или баланса
  const handleNavItemOnClick = useHeaderStore(
    (state) => state.handleNavItemOnClick
  );

  return (
    <div
      onClick={handleNavItemOnClick}
      id="balance"
      className={`nav-balance ${isNavBalanceClicked ? "clickedNav" : ""}`}
    >
      <div className="nav-balance__img">
        <img src={currencyImage} alt="" />
      </div>
      <div className={`nav-balance__item ${isArrowImgClicked ? "hidden" : ""}`}>
        <div className="nav-balance__title">Финансы и счета</div>
        <div className="nav-balance__description">
          {currencyFormat(currentUser.balance, currentUser.currency)}
        </div>
      </div>
      <div onClick={handleArrowImgClick} className="nav-balance__btn-arrow">
        <img
          style={{
            transform: isArrowImgClicked ? "rotate(270deg)" : "rotate(90deg)",
            transition: "transform .3s",
          }}
          src={downArrow}
          alt=""
        />
      </div>
    </div>
  );
};

export default NavBalance;
