import "./inputContainer.scss";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  InputEnum,
  InputType,
  useInputStore,
} from "../../store/zustand/inputStore";

interface InputContainerProps {}

const InputContainer: FC<InputContainerProps> = () => {
  //t функция для перевода
  const { t } = useTranslation(["inputContainer"]);

  // вытаскиваем методы из хранилища, можем использовать прямую деструктуризацию, ибо любой из этих методов перерендерит этот компонент
  const {
    handleClickOutsideInput,
    handleInputOnClick,
    handleInputOnFocus,
    handleInputOnKey,
    handleInputValueChange,
    getInputState,
  } = useInputStore();

  // прикрепление события на документ и их фильтрация при размонтировании
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideInput);

    return () => {
      document.removeEventListener("click", handleClickOutsideInput);
    };
  }, [handleClickOutsideInput]);
  //функция генерации инпута (вынес в отдельную функцию чтобы удобнее было читать код)
  const renderInput = (inputType: InputType, index: number) => {
    const inputState = getInputState(inputType);

    return (
      <div
        key={index}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          handleInputOnKey(e, inputType)
        }
        onClick={() => handleInputOnClick(inputType)}
        id={inputType}
        className="input-container-main"
      >
        <label
          className={`input-container-main__label ${
            inputState.isInputWritten || inputState.isInputFocused
              ? "clickedLabel"
              : ""
          }`}
          htmlFor={`${inputType}Id`}
        >
          {t(inputType === InputEnum.serverName ? "serverInput" : "zoneInput", {
            ns: ["inputContainer"],
          })}
        </label>
        <input
          className={`input-container-main__input ${
            inputState.isInputFocused || inputState.isInputClicked
              ? "clickedInput"
              : ""
          }`}
          id={`${inputType}Id`}
          name={inputType}
          required
          type="text"
          value={inputState.inputValue}
          onFocus={() => handleInputOnFocus(inputType)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputValueChange(e, inputType)
          }
        />
      </div>
    );
  };

  return (
    <>
      <div className="server__title">
        {t("inputContainerTitle", { ns: ["inputContainer"] })}
      </div>
      <div className="input-container">
        {Object.values(InputEnum).map(renderInput)}
      </div>
    </>
  );
};

export default InputContainer;
