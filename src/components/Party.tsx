import React from "react";
import { Store } from "../Store";
import { IFavProps } from "../Interfaces";
import { toggleFavorite } from "../Actions";
import Favorite from "./Favorite";
import { Link } from "react-router-dom";

export default function Party(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const { party } = state;
  // console.log(party);
  let viewParty = party.map((pokemon: any) => {
    let sprite: string;
    pokemon.sprites === undefined
      ? (sprite = "")
      : (sprite = pokemon.sprites.front_default);

    let name: string;
    pokemon.name !== undefined
      ? (name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))
      : (name = "");

    let type: string = "";
    if (pokemon.types === undefined) {
      type = "";
    } else if (pokemon.types.length > 1) {
      let typeArr = pokemon.types.map(
        (e: any, i: number) =>
          e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)
      );
      type = typeArr.join(", ");
    } else if (pokemon.types !== undefined) {
      type =
        pokemon.types[0].type.name.charAt(0).toUpperCase() +
        pokemon.types[0].type.name.slice(1);
    }

    let height: number = pokemon.height / 3.048;
    let weight: number = pokemon.weight / 4.536;

    let props: IFavProps = {
      pokemon: pokemon,
      store: { state, dispatch },
      toggleFavorite,
      party: state.party
    };

    return (
      <article
        key={pokemon.id}
        className="w-5/6 flex flex-col justify-around items-center mt-3 p-2 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200 relative"
      >
        <div className="container flex flex-row justify-around items-center">
          <section className="text-center -mt-2 ml-2">
            <h1 className="font-bold font-robomono mb-1">
              #{pokemon.id} {name}
            </h1>
            <Favorite {...props} />
            <p className="text-sm">Type: {type}</p>
            <p className="text-sm">Height: {height.toFixed(2)} ft.</p>
            <p className="text-sm">Weight: {weight.toFixed(2)} lbs.</p>
          </section>
          <Link to={`./pokemon/${pokemon.name}`}>
            <img
              src={sprite}
              alt={name}
              className="w-24 bg-red-500 border-4 border-gray-200 rounded-full shadow-md"
            />
          </Link>
        </div>
      </article>
    );
  });

  return (
    // <div className="w-full flex flex-col justify-center items-center text-left mt-10">
    //   <div className="w-full pt-3 bg-blue-500 flex justify-center items-center border-b-4 border-blue-300">
    <div className='mt-10 font-robo flex flex-col justify-center items-center'>
      <div className='w-full bg-blue-500 py-3 border-b-4 border-blue-300 shadow-md'>
        <h1 className="text-2xl font-robomono text-center text-gray-200">
          My Party
        </h1>
      </div>
      {viewParty.length === 0 ? (
        <>
          <img
            src="https://comicsandmemes.com/wp-content/uploads/surprise-pikachu-meme-000-original-blank.png"
            alt="Surprised Pikachu"
            className="w-2/3 rounded mt-5"
          />
          <h2 className="antialiased text-center mt-5 w-5/6 text-sm">
            Oh no! Your party is empty. Catch some Pokémon and add them to your
            party by clicking on the heart icon!
          </h2>
        </>
      ) : (
        viewParty
      )}
    </div>
  );
}
