import React from "react";
import { Store } from "../Store";
import { IFavProps } from "../Interfaces";
import { toggleFavorite } from "../Actions";
import Favorite from "./Favorite";
import Type from './Type'
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

      let type: any;
      if (pokemon.types === undefined) {
        type = '';
      } else {
        type = pokemon.types.map((type: any, i: number) => {
            return <Type key={i} type={type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}/>
          }
        );
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
      className="w-56 h-64 flex flex-col justify-center items-center mt-3 mb-2 bg-blue-500 border-2 border-blue-800 rounded shadow-lg text-gray-200 static"
      >
        <section className="w-48 h-56 text-center leading-tight flex flex-col justify-around">
          <div className='flex flex-row justify-center items-center'>
            <h1 className="font-mono text-lg">
              #{pokemon.id} {name}
            </h1>
            <Favorite {...props} />
          </div>
          <Link to={`./pokemon/${pokemon.name}`}>
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
    <div className='mt-10 font-sans flex flex-col justify-center items-center'>
      <div className='w-full bg-blue-500 py-3 border-b-4 border-blue-300 shadow-md'>
        <h1 className="text-2xl font-mono text-center text-gray-200">
          My Party
        </h1>
      </div>
      {viewParty.length === 0 ? (
        <>
          <img
            src="https://comicsandmemes.com/wp-content/uploads/surprise-pikachu-meme-000-original-blank.png"
            alt="Surprised Pikachu"
            className="w-64 rounded mt-5"
          />
          <p className="antialiased mt-5 w-5/6 text-md text-center md:w-1/2 md:text-lg">
            Oh no! Your party is empty. Catch some Pokémon and add them to your
            party by clicking on the heart icon!
          </p>
        </>
      ) : (
        <div className='w-5/6 flex flex-row flex-wrap justify-around xl:w-3/4 xxl:w-3/5 xxxl:w-1/2'>
          {viewParty}
        </div>
      )}
    </div>
  );
}
