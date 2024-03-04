import "./hiddenNavAccount.scss";
import closeIcon from "./../../../asets/images/header/close-icon.png";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHeaderStore } from "../../../store/zustand/headerStore";
import { IAccounts } from "../../../localdata/accounts";
import usersList from "../../../localdata/accounts";

interface HiddenNavAccountProps {
  currentUser: IAccounts;
  handleCurrentUserID: (userIDToChange: number) => void;
  isModalWindowActive: boolean;
  handleIsModalWindowActive: (isActive: boolean) => void;
}

const HiddenNavAccount: FC<HiddenNavAccountProps> = ({
  currentUser,
  handleCurrentUserID,
  isModalWindowActive,
  handleIsModalWindowActive,
}) => {
  //t функция для перевода
  const { t } = useTranslation(["header"]);

  //состояние нав аккаунта
  const isNavAccountClicked = useHeaderStore(
    (state) => state.isNavAccountClicked
  );
  const handleIsNavAccountClicked = useHeaderStore(
    (state) => state.handleIsNavAccountClicked
  );

  // переменные таймера
  const timerIdRef = useRef<NodeJS.Timeout | undefined>();
  const timerRef = useRef<number>(15);
  // ref для изменения контента времени
  const timerSpanRef = useRef<HTMLSpanElement | null>(null);
  // ref для изменения стиля скрытых аккаунтов
  const accountsRef = useRef<HTMLDivElement | null>(null);

  // состояние для айди целевого аккаунта для смены
  const [userIdToChange, setUserIdToChange] = useState<number | null>(null);
  const [isChangeAccClicked, setIsChangeAccClicked] = useState<boolean>(false);

  //таймер во время смены аккаунта
  useEffect(() => {
    if (isModalWindowActive) {
      timerIdRef.current = setInterval(() => {
        try {
          timerRef.current--;
          if (timerRef.current > 0 && timerSpanRef.current) {
            timerSpanRef.current.textContent = `${timerRef.current}`;
          }
          if (timerRef.current === 0) {
            handleIsModalWindowActive(false);
            clearInterval(timerIdRef.current!);
            timerRef.current = 15;
          }
        } catch (error) {
          console.error(error);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timerIdRef.current!);
      timerIdRef.current = undefined;
      timerRef.current = 15;
    };
  }, [isModalWindowActive, handleIsModalWindowActive]);

  return (
    <div
      id="hiddenAccount"
      className={`account-hidden ${isNavAccountClicked ? "open" : "close"}`}
    >
      {/* начальный блок с общей информацией */}
      <div className="account-hidden__head">
        <span>{t("hiddenAccHead", { ns: ["header"] })}</span>
        <div className="account-hidden__title">
          {`${currentUser.firstName} ${
            "lastName" in currentUser ? currentUser.lastName : ""
          }`}
        </div>
        <div className="account-hidden__email">{currentUser.email}</div>
      </div>

      {/* блок смены аккаунта */}
      <div className="account-hidden__accounts">
        {/* блок для открытия и закрытия блока смены аккаунта */}
        <div
          className="account-hidden__accounts__title"
          onClick={() => {
            setIsChangeAccClicked(!isChangeAccClicked);
          }}
        >
          {t("changeAccTitle", { ns: ["header"] })}
        </div>
        {/* список аккаунтов */}
        <div
          ref={accountsRef}
          style={{
            height: isChangeAccClicked ? accountsRef.current?.scrollHeight : 0,
          }}
          className="account-hidden__accounts__list"
        >
          {usersList
            .filter((user) => user.id !== currentUser.id)
            .map((user) => (
              <span
                onClick={() => {
                  setUserIdToChange(user.id);
                  handleIsModalWindowActive(true);
                }}
                key={user.id}
              >{`➜ ${user.firstName} ${
                "lastName" in user ? user.lastName : ""
              }`}</span>
            ))}
          {/* закрытие блока смены аккаунта */}
          <div
            onClick={() => {
              setIsChangeAccClicked(!isChangeAccClicked);
            }}
          >
            ✘ {t("close", { ns: ["header"] })}
          </div>
        </div>
      </div>

      {/* закрытие блока */}
      <div
        onClick={() => {
          handleIsNavAccountClicked(false);
        }}
        className="account-hidden__close"
      >
        <div className="account-hidden__close__button">
          <img src={closeIcon} alt="" />
        </div>
      </div>

      {/* модальное окно для таймера при смены аккаунта */}
      {isModalWindowActive && (
        <>
          <div className="modal-window">
            <div className="modal-window__title">
              {t("accountChangeQuestion", { ns: ["header"] })}
            </div>
            <div className="modal-window__choice">
              <div
                onClick={() => {
                  handleCurrentUserID(userIdToChange as number);
                  handleIsModalWindowActive(false);
                }}
              >
                {t("accountChangeFirstAnswer", { ns: ["header"] })} ✔
              </div>
              <span ref={timerSpanRef} className="modal-window__timer">
                15
              </span>
              <div
                onClick={() => {
                  setUserIdToChange(null);
                  handleIsModalWindowActive(false);
                }}
              >
                {t("accountChangeSecondAnswer", { ns: ["header"] })} ✖
              </div>
            </div>
          </div>
          {/* overlay для блокировки бэкграунда во время модального окна */}
          <div className="overlay"></div>
        </>
      )}
    </div>
  );
};

export default HiddenNavAccount;
