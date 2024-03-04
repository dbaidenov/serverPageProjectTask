import React from "react";
import { create } from "zustand";

export type InputType = "serverZone" | "serverName";

export enum InputEnum {
  serverName = "serverName",
  serverZone = "serverZone",
}

export interface IInputState {
  inputValue: string;
  isInputWritten: boolean;
  isInputFocused: boolean;
  isInputClicked: boolean;
}

// начальные значения для инпута
const defaultInputValue: IInputState = {
  inputValue: "",
  isInputClicked: false,
  isInputFocused: false,
  isInputWritten: false,
};

interface IInputStore {
  serverNameInputState: IInputState;
  serverZoneInputState: IInputState;
  handleClickOutsideInput: (e: MouseEvent) => void;
  handleInputValueChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: InputType
  ) => void;
  handleInputOnFocus: (inputType: InputType) => void;
  handleInputOnKey: (
    e: React.KeyboardEvent<HTMLDivElement>,
    inputType: InputType
  ) => void;
  handleInputOnClick: (inputType: InputType) => void;
  getInputState: (inputType: InputType) => IInputState;
}

export const useInputStore = create<IInputStore>()((set, get) => ({
  // состояние инпутов
  serverNameInputState: { ...defaultInputValue },
  serverZoneInputState: { ...defaultInputValue },
  handleClickOutsideInput(e) {
    const resetInputState = (prev: IInputState) => ({
      ...prev,
      isInputClicked: false,
      isInputFocused: false,
    });
    if (
      (e.target as any)?.id !== `${InputEnum.serverName}Id` &&
      (get().serverNameInputState.isInputClicked ||
        get().serverNameInputState.isInputFocused)
    ) {
      set({
        serverNameInputState: resetInputState(get().serverNameInputState),
      });
    } else if (
      (e.target as any)?.id !== `${InputEnum.serverZone}Id` &&
      (get().serverZoneInputState.isInputClicked ||
        get().serverZoneInputState.isInputFocused)
    ) {
      set({
        serverZoneInputState: resetInputState(get().serverZoneInputState),
      });
    }
  },
  // функция для стилизации инпутов при вводе
  handleInputValueChange(e, inputType) {
    const setInputState = (prev: IInputState) => ({
      ...prev,
      inputValue: e.target.value,
      isInputWritten: !!e.target.value,
    });
    inputType === InputEnum.serverName
      ? set({ serverNameInputState: setInputState(get().serverNameInputState) })
      : set({
          serverZoneInputState: setInputState(get().serverZoneInputState),
        });
  },
  // функция для стилизации инпутов при фокусировке
  handleInputOnFocus(inputType) {
    inputType === InputEnum.serverName
      ? set({
          serverNameInputState: {
            ...get().serverNameInputState,
            isInputFocused: true,
          },
        })
      : set({
          serverZoneInputState: {
            ...get().serverZoneInputState,
            isInputFocused: true,
          },
        });
  },
  // функция для стилизации инпутов при нажатии на клавишу
  handleInputOnKey(e, inputType) {
    if (e.key === "Escape" || e.key === "Tab") {
      const resetInputState = (prevState: IInputState) => ({
        ...prevState,
        isInputFocused: false,
        isInputClicked: false,
      });
      (e.target as HTMLDivElement).blur();
      inputType === InputEnum.serverName
        ? set({
            serverNameInputState: resetInputState(get().serverNameInputState),
          })
        : set({
            serverZoneInputState: resetInputState(get().serverZoneInputState),
          });
    }
  },
  // функция для стилизации инпутов при клике
  handleInputOnClick(inputType) {
    inputType === InputEnum.serverName
      ? set({
          serverNameInputState: {
            ...get().serverNameInputState,
            isInputClicked: true,
          },
        })
      : set({
          serverZoneInputState: {
            ...get().serverZoneInputState,
            isInputClicked: true,
          },
        });
  },
  //определение состояние инпута
  getInputState(inputType) {
    return inputType === InputEnum.serverName
      ? get().serverNameInputState
      : get().serverZoneInputState;
  },
}));
