import React from "react";

export default function Favorite(props: any): JSX.Element {
  const { pokemon, store, toggleFavorite, party } = props;
  const { state, dispatch } = store;

  return (
    <div>
      {party.includes(pokemon) ? (
        <i
          className="material-icons text-white text-md"
          onClick={() => toggleFavorite(state, dispatch, pokemon)}
        >
          favorite
        </i>
      ) : (
        <i
          className="material-icons text-white text-md"
          onClick={() => toggleFavorite(state, dispatch, pokemon)}
        >
          favorite_border
        </i>
      )}
    </div>
  );
}
