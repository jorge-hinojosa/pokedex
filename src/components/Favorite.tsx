import React from "react";
import { IFavProps, IPokemon } from "../Interfaces";

export default function Favorite(props: IFavProps): JSX.Element {
  const { pokemon, store, toggleFavorite, party } = props;
  const { state, dispatch } = store;
  
  let filtered = party.filter((poke: IPokemon) => poke.id === pokemon.id)

  return (
    <div>
      {party.includes(filtered[0]) ? (
        <i
          className="material-icons text-gray-200 mt-2 ml-2 text-md"
          onClick={() => toggleFavorite(state, dispatch, pokemon)}
        >
          favorite
        </i>
      ) : (
        <i
          className="material-icons text-gray-200 mt-2 ml-2 text-md"
          onClick={() => toggleFavorite(state, dispatch, pokemon)}
        >
          favorite_border
        </i>
      )}
    </div>
  );
}
