import axios from "axios";
// import { IState, ICharacter, IAction } from "./Store";

export const getHomePokemon = async (dispatch: any) => {
  // let randomID = Math.floor(Math.random() * 807);
  // const URL = `https://pokeapi.co/api/v2/pokemon/${randomID}`;
  const URL = `https://pokeapi.co/api/v2/pokemon/143`;
  const data = await axios
    .get(URL)
    .then(res => res.data)
    .catch(err => console.log(err));

  return dispatch({
    type: "GET_HOME_POKEMON",
    payload: data
  });
};

export const getPokemon = async (val: string, dispatch: any) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${val}`;
  const data = await axios
    .get(URL)
    .then(res => console.log(res))
    .catch(err => console.log(err));

  return dispatch({
    type: "GET_POKEMON",
    payload: data
  });
};
