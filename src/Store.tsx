import React from "react";
import { IState, IAction } from "./Interfaces";

const initialState: IState = {
  pokemon: [],
  party: []
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case "GET_HOME_POKEMON":
      return { ...state, pokemon: payload };
    case "GET_POKEMON":
      return { ...state, pokemon: payload };
    default:
      return state;
  }
}

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
