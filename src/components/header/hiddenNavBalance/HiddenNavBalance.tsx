import "./hiddenNavBalance.scss";
import closeIcon from "./../../../asets/images/header/close-icon.png";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHeaderStore } from "../../../store/zustand/headerStore";
import { currencyFormat } from "../../../utils/currencyFormat";
import usersList from "../../../localdata/accounts";
import { IAccounts } from "../../../localdata/accounts";

interface HiddenNavBalanceProps {
  currentUser: IAccounts;
}

const HiddenNavBalance: FC<HiddenNavBalanceProps> = ({ currentUser }) => {
  // состояния клика на нав баланса
  const isNavBalanceClicked = useHeaderStore(
    (state) => state.isNavBalanceClicked
  );
  //обработчик нав баланса
  const handleIsNavBalanceClicked = useHeaderStore(
    (state) => state.handleIsNavBalanceClicked
  );

  //t функция для перевода
  const { t } = useTranslation(["header"]);

  //рефы
  const currenciesRef = useRef<HTMLUListElement | null>(null);
  const balanceTitleRef = useRef<HTMLDivElement | null>(null);

  //состояние для стилизации при раскрытии currencies
  const [isCurrenciesClicked, setIsCurrenciesClicked] =
    useState<boolean>(false);

  // состояние загрузки из fetch
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // состояния конвертации
  const [fromConvert, setFromConvert] = useState<string>(currentUser.currency);
  const [toConvert, setToConvert] = useState<string | null>(
    currentUser.currency
  );
  const [convertIndex, setConvertIndex] = useState<number | null>(null);

  useEffect(() => {
    setFromConvert(currentUser.currency);
  }, [currentUser]);

  // запрос fetch на конвертер валют
  useEffect(() => {
    const requestData = async function () {
      try {
        if (toConvert) {
          const request = await fetch(
            `https://v6.exchangerate-api.com/v6/ff67bbfd48783e47fb94fac1/latest/${fromConvert}`
          );
          if (!request.ok)
            throw new Error(
              `Ошибка при получении данных конвертера валют ${request.status}`
            );
          const { conversion_rates } = await request.json();
          const newConvertIndex = conversion_rates[toConvert as string];
          setConvertIndex(newConvertIndex);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    requestData();
  }, [fromConvert, toConvert]);

  return (
    <div
      id="hiddenBalance"
      className={`balance-hidden ${isNavBalanceClicked ? "open" : "close"}`}
    >
      {/* начальный блок с общей информацией */}
      <div className="balance-hidden__head">
        <span>{t("hiddenBalanceHead", { ns: ["header"] })}</span>
        <div ref={balanceTitleRef} className="balance-hidden__title">
          {currencyFormat(currentUser.balance, currentUser.currency)}
        </div>
        <div className="balance-hidden__email">{currentUser.email}</div>
      </div>

      {/* блок конвертации валюты */}
      <div className="balance-hidden__currencies">
        {/* блок для открытия и закрытия конвертера валют */}
        <div
          onClick={() => setIsCurrenciesClicked(!isCurrenciesClicked)}
          className={`balance-hidden__currencies__title`}
        >
          {t("currencyChangeTitle", { ns: ["header"] })}
        </div>
        {/* список валют для конвертации */}
        <ul
          ref={currenciesRef}
          style={{
            height: isCurrenciesClicked
              ? currenciesRef.current?.scrollHeight
              : 0,
          }}
          className="balance-hidden__currencies__list"
        >
          {usersList
            .filter((user) => user.currency !== currentUser.currency)
            .map((user, index) => (
              <li
                key={user.id}
                onClick={(e) => {
                  setToConvert(e.currentTarget.textContent as string);
                }}
                style={{
                  transition: `padding-left .2s, margin-left ${
                    0.6 + index * 0.1
                  }s`,
                }}
                className={`balance-hidden__currencies__currency ${
                  isCurrenciesClicked ? "open" : ""
                }`}
              >
                {user.currency}
              </li>
            ))}
          {/* итоговое значение при конвертации */}
          <div
            className="balance-hidden__currencies__convertedCurrency"
            key={toConvert}
          >
            {t("currencyChangeTotal", { ns: ["header"] })}
            <br />
            {isLoading
              ? "..."
              : ` ${toConvert} ${currencyFormat(
                  currentUser.balance * (convertIndex as number),
                  toConvert as string
                )}`}
          </div>
          {/* закрытие блока конвертации */}
          <div
            onClick={() => {
              setIsCurrenciesClicked(!isCurrenciesClicked);
            }}
            className="balance-hidden__currencies__close"
          >
            <div>✘ {t("close", { ns: ["header"] })}</div>
          </div>
        </ul>
      </div>

      {/* закрытие блока*/}
      <div
        onClick={() => {
          handleIsNavBalanceClicked(false);
        }}
        className="balance-hidden__close"
      >
        <div className="balance-hidden__close__button">
          <img src={closeIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HiddenNavBalance;
