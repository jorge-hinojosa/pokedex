import React from "react";
import { IState, IAction } from "./Interfaces";

const initialState: IState = {
  homePokemon: [],
  party: []
};

export const Store = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case "GET_HOME_POKEMON":
      return { ...state, homePokemon: [...state.homePokemon, payload] };
    case "GET_POKEMON":
      return { ...state, homePokemon: payload };
    case "ADD_POKE_TO_PARTY":
      return { ...state, party: [...state.party, payload] };
    case "REMOVE_POKE_FROM_PARTY":
      return { ...state, party: payload };
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
