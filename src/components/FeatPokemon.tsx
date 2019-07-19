import React from "react";
// import { IPokemon } from "../Interfaces";
import { getHomePokemon, toggleFavorite } from "../Actions";
import Favorite from "./Favorite";
import { IFavProps } from "../Interfaces";
import { Link } from "react-router-dom";
import Type from "./Type";

export default function PokemonList(props: any): JSX.Element {
  function getRandomID(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
 
  let randomID: number = getRandomID(1, 152);

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

    let type: any;
    if (pokemon.data.types === undefined) {
      type = '';
    } else {
      type = pokemon.data.types.map((type: any, i: number) => {
          return <Type key={i} type={type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}/>
        }
      );
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
        className="w-56 h-64 flex flex-col justify-center items-center mt-3 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200 static"
      >
          <section className="w-48 h-56 text-center leading-tight flex flex-col justify-around">
            <div className='flex flex-row justify-center items-center'>
              <h1 className="font-mono text-lg">
                #{pokemon.data.id} {name}
              </h1>
              <Favorite {...props} />
            </div>
            <Link to={`./pokemon/${pokemon.data.name}`}>
              <img
                src={sprite}
                alt={name}
                className="w-24 bg-red-500 border-4 border-gray-200 rounded-full shadow-md hover:cursor-pointer mx-auto"
              />
            </Link>
            <div className='bg-gray-700 rounded-b shadow text-gray-200 text-left p-1 border-t-4 border-blue-300 leading-snug'>
              <div className="text-sm flex flex-row ml-2">
                <p className="mr-1">Type: </p> {type}
              </div>
              <p className="text-sm ml-2">Height: {height.toFixed(2)} ft.</p>
              <p className="text-sm ml-2">Weight: {weight.toFixed(2)} lbs.</p>
            </div>
          </section>
      </article>
    );
  });

  return (
    <div className="flex flex-col justify-center items-center mt-3">
      <h1 className="text-xl font-mono">Featured Pokémon</h1>
      <div className='w-5/6 flex flex-row flex-wrap justify-around xl:w-3/4 xxl:w-3/5 xxxl:w-1/2'>
        {viewPokemon}
      </div>
    </div>
  );
}
