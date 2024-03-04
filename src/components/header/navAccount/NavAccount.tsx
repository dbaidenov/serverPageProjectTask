import "./navAccount.scss";
import anonim from "./../../../asets/images/users/anonim.jpg";
import { FC } from "react";
import { useHeaderStore } from "../../../store/zustand/headerStore";
import { IAccounts } from "../../../localdata/accounts";

interface NavAccountProps {
  currentUser: IAccounts;
}

const NavAccount: FC<NavAccountProps> = ({ currentUser }) => {
  // деструктуризация нужных свойств
  const { img, firstName, lastName, id } = currentUser;

  // картинка юзера
  const userImage = img ? img : anonim;

  // полное имя
  const fullName = lastName ? `${firstName} ${lastName[0]}.` : firstName;

  //состояние нав аккаунта
  const isNavAccountClicked = useHeaderStore(
    (state) => state.isNavAccountClicked
  );
  //функция обработки клика на нав аккаунта или баланса
  const handleNavItemOnClick = useHeaderStore(
    (state) => state.handleNavItemOnClick
  );

  return (
    <div
      id="account"
      onClick={handleNavItemOnClick}
      className={`nav-account ${isNavAccountClicked ? "clickedNav" : ""}`}
    >
      <div className="nav-account__img">
        <img src={userImage} alt="" />
      </div>
      <div className="nav-account__item">
        <div className="nav-account__title">{fullName}</div>
        <div className="nav-account__description">ID {id}</div>
      </div>
    </div>
  );
};

export default NavAccount;
