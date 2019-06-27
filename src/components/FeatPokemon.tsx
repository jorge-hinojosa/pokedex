import React from "react";
import { IPokemon } from "../Interfaces";

export default function PokemonList(props: any): JSX.Element {
  console.log(props);
  const { pokemon, party, store } = props;
  const { state, dispatch } = store;
  console.log(pokemon);

  let sprite: string;
  pokemon.sprites !== undefined
    ? (sprite = pokemon.sprites.front_default)
    : (sprite = "");

  let name: string;
  pokemon.name !== undefined
    ? (name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))
    : (name = "");

  let type: string;
  pokemon.types !== undefined
    ? (type =
        pokemon.types[0].type.name.charAt(0).toUpperCase() +
        pokemon.types[0].type.name.slice(1))
    : (type = "");
  let height: number = pokemon.height / 3.048;
  let weight: number = pokemon.weight / 4.536;

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-xl font-bold font-robomono">Featured Pokémon</h1>
      <article
        key={pokemon.id}
        className="w-5/6 flex flex-row justify-around items-center mt-3 p-2 bg-blue-500 rounded shadow-lg"
      >
        <section className="text-center text-gray-200">
          <h1 className="font-bold font-robomono">
            #{pokemon.id} {name}
          </h1>
          <p className="text-xs">Type: {type}</p>
          <p className="text-xs">Height: {height.toFixed(2)} ft.</p>
          <p className="text-xs">Weight: {weight.toFixed(2)} lbs.</p>
        </section>
        <div>
          <img
            src={sprite}
            alt={name}
            className="w-32 bg-red-500 rounded-full shadow-md"
          />
        </div>
      </article>
    </div>
  );
}
