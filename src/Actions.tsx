// import React from "react";
import axios from "axios";
import { IState, IPokemon, IAction } from "./Interfaces";

export const getAllPokemon = async (dispatch: any) => {
  const URL = `https://pokeapi.co/api/v2/pokemon-species?limit=807`;
  const data = await axios
    .get(URL)
    .then(res => res.data.results)
    .catch(err => console.log(err));

  return dispatch({
    type: "GET_ALL_POKEMON",
    payload: data
  });
};

export const getHomePokemon = async (dispatch: any, randomID: number) => {
  const URL = `https://pokeapi.co/api/v2/pokemon/${randomID}`;
  const data = await axios
    .get(URL)
    .then(res => res)
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
    .then(res => res.data)
    .catch(err => console.log(err));

  return dispatch({
    type: "GET_POKEMON",
    payload: data
  });
};

export const getPokemonSpecies = async (val: string, dispatch: any) => {
  const URL = `https://pokeapi.co/api/v2/pokemon-species/${val}`;
  const data = await axios
    .get(URL)
    .then(res => res.data)
    .catch(err => console.log(err));

  return dispatch({
    type: "GET_POKEMON_SPECIES",
    payload: data
  });
};

export const toggleFavorite = (
  state: IState,
  dispatch: any,
  pokemon: IPokemon | any
): IAction => {
  let filtered = state.party.filter((poke: any) => poke.id === pokemon.id)
  const pokemonInParty = state.party.includes(filtered[0]);
  let dispatchObj = {
    type: "ADD_POKE_TO_PARTY",
    payload: pokemon
  };

  // console.log(pokemonInParty);
  if (pokemonInParty === true) {
    const withoutPokemon = state.party.filter(
      (member: IPokemon) => member.id !== pokemon.id
    );
    dispatchObj = {
      type: "REMOVE_POKE_FROM_PARTY",
      payload: withoutPokemon
    };
  }
  return dispatch(dispatchObj);
};
