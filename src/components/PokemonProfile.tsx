import React from "react";
import { Store } from "../Store";
import { getPokemon } from "../Actions";
import Favorite from "./Favorite";
import { toggleFavorite } from "../Actions";
import { IFavProps } from "../Interfaces";

export default function PokemonProfile(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const pokemonID = props.match.params.id;
  React.useEffect(() => {
    getPokemon(pokemonID, dispatch);
  }, []);
  const { currPokemon } = state;
  console.log(currPokemon);

  let sprite: string;
  currPokemon.sprites === undefined
    ? (sprite = "")
    : (sprite = currPokemon.sprites.front_default);

  let name: string;
  currPokemon.name !== undefined
    ? (name =
        currPokemon.name.charAt(0).toUpperCase() + currPokemon.name.slice(1))
    : (name = "");

  let type: string = "";
  if (currPokemon.types === undefined) {
    type = "";
  } else if (currPokemon.types.length > 1) {
    let typeArr = currPokemon.types.map(
      (e: any, i: number) =>
        e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)
    );
    type = typeArr.join(", ");
  } else if (currPokemon.types !== undefined) {
    type =
      currPokemon.types[0].type.name.charAt(0).toUpperCase() +
      currPokemon.types[0].type.name.slice(1);
  }

  let height: number = currPokemon.height / 3.048;
  let weight: number = currPokemon.weight / 4.536;

  let favProps: IFavProps = {
    pokemon: currPokemon,
    store: { state, dispatch },
    toggleFavorite,
    party: state.party
  };

  return (
    <div className="flex flex-col justify-center items-center text-gray-200">
      <div className="relative w-full h-24 bg-blue-500 z-0">
        <div className="absolute bottom-0 right-0 mr-2 flex flex-row justify-center items-center">
          <div className="container mr-2 flex flex-row">
            <h1 className="font-bold font-robomono text-2xl mb-1">{name}</h1>
            <h3 className="text-sm mt-3 ml-2 text-gray-400">
              #{currPokemon.id}
            </h3>
          </div>
          <Favorite {...favProps} />
        </div>
      </div>
      <section className="w-full text-gray-700 z-10">
        <div className="container">
          <img
            className="w-1/3 bg-red-500 border-4 border-gray-200 rounded-full shadow-mdml-3 float-left -mt-4 mx-5"
            src={sprite}
            alt={currPokemon.name}
          />
          <section className="w-full relative">
            <article className="w-32 h-20 p-2 bg-blue-500 rounded shodow-md absolute left-0 mt-24 ml-3 ">
              Hello
            </article>
            <article className="text-left w-40 mt-4 mr-3 p-2 rounded shadow-md bg-gray-600 text-gray-200 absolute right-0">
              <div className="mr-2">
                <span className="text-xs">Type:</span>
                <p className="">{type}</p>
              </div>
              <div className="mr-2">
                <span className="text-xs">Height:</span>
                <p className="">{height.toFixed(2)} ft.</p>
              </div>
              <div className="mr-2">
                <span className="text-xs">Weight:</span>
                <p className="">{weight.toFixed(2)} lbs.</p>
              </div>
            </article>
          </section>
        </div>
      </section>
      <p className="antialiased text-center text-sm text-gray-700 mt-24 mx-5">
        "It doesn’t do anything other than eat and sleep. When prompted to make
        a serious effort, though, it apparently displays awesome power."
      </p>
    </div>
  );
}
