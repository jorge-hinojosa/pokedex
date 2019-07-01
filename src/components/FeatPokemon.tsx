import React from "react";
// import { IPokemon } from "../Interfaces";
import { getHomePokemon, toggleFavorite } from "../Actions";
import Favorite from "./Favorite";
import { IFavProps } from "../Interfaces";

export default function PokemonList(props: any): JSX.Element {
  let randomID: number = Math.floor(Math.random() * 807);

  React.useEffect(() => {
    state.homePokemon.length < 6 && getHomePokemon(dispatch, randomID);
  });

  const { homePokemon, store } = props;
  const { state, dispatch } = store;

  let viewPokemon = homePokemon.map((pokemon: any) => {
    let sprite: string;
    pokemon.data.sprites === undefined
      ? (sprite = "")
      : (sprite = pokemon.data.sprites.front_default);

    let name: string;
    pokemon.data.name !== undefined
      ? (name =
          pokemon.data.name.charAt(0).toUpperCase() +
          pokemon.data.name.slice(1))
      : (name = "");

    let type: string = "";
    if (pokemon.data.types === undefined) {
      type = "";
    } else if (pokemon.data.types.length > 1) {
      let typeArr = pokemon.data.types.map(
        (e: any, i: number) =>
          e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)
      );
      type = typeArr.join(", ");
    } else if (pokemon.data.types !== undefined) {
      type =
        pokemon.data.types[0].type.name.charAt(0).toUpperCase() +
        pokemon.data.types[0].type.name.slice(1);
    }

    let height: number = pokemon.data.height / 3.048;
    let weight: number = pokemon.data.weight / 4.536;

    let props: IFavProps = {
      pokemon: pokemon.data,
      store: { state, dispatch },
      toggleFavorite,
      party: state.party
    };

    return (
      <article
        key={pokemon.data.id}
        className="w-11/12 flex flex-col justify-around items-center mt-3 p-2 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200"
      >
        <div className="container flex flex-row justify-around items-center">
          <section className="text-center -mt-2 ml-2">
            <h1 className="font-bold font-robomono mb-1">
              #{pokemon.data.id} {name}
            </h1>
            <Favorite {...props} />
            <p className="text-sm">Type: {type}</p>
            <p className="text-sm">Height: {height.toFixed(2)} ft.</p>
            <p className="text-sm">Weight: {weight.toFixed(2)} lbs.</p>
          </section>
          <img
            src={sprite}
            alt={name}
            className="w-32 bg-red-500 border-4 border-gray-200 rounded-full shadow-md"
          />
        </div>
      </article>
    );
  });

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-xl font-bold font-robomono">Featured Pokémon</h1>
      {viewPokemon}
    </div>
  );
}
