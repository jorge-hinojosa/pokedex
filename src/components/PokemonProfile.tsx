import React from "react";
import { Store } from "../Store";
import { getPokemon, getPokemonSpecies } from "../Actions";
// import Favorite from "./Favorite";
import { toggleFavorite } from "../Actions";
import { IFavProps, IPokemon } from "../Interfaces";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { GET_POKEMON } from "../Queries";

const Favorite = React.lazy<any>(() => import("./Favorite"));

export default function PokemonProfile(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const pokemonID = props.match.params.id;
  React.useEffect(() => {
    getPokemon(pokemonID, dispatch);
    getPokemonSpecies(pokemonID, dispatch);
    // console.log("useEffect");
  }, [pokemonID, dispatch]);
  const { currPokemon, currSpecies } = state;

  console.log(currPokemon);
  // console.log(currSpecies);

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

  const getNestedObject = (nestedObj: any, pathArr: any) => {
    return pathArr.reduce(
      (obj: any, key: any) =>
        obj && obj[key] !== "undefined" ? obj[key] : undefined,
      nestedObj
    );
  };

  let description: string = "";
  const getDescription = () => {
    if (
      getNestedObject(currSpecies, [
        0,
        "flavor_text_entries",
        1,
        "language",
        "name"
      ]) === "en"
    ) {
      return (description = getNestedObject(currSpecies, [
        0,
        "flavor_text_entries",
        1,
        "flavor_text"
      ]));
    } else {
      description = getNestedObject(currSpecies, [
        0,
        "flavor_text_entries",
        2,
        "flavor_text"
      ]);
    }
  };
  getDescription();

  const category: string = getNestedObject(currSpecies, [
    0,
    "genera",
    2,
    "genus"
  ]);
  const chainURL: string = getNestedObject(currSpecies, [
    0,
    "evolution_chain",
    "url"
  ]);

  // const getEvoChain = async () => {
  //   console.log(chainURL);
  //   axios.get(chainURL).then(res => console.log(res));
  // };
  // getEvoChain();

  let favProps: IFavProps = {
    pokemon: currPokemon,
    store: { state, dispatch },
    toggleFavorite,
    party: state.party
  };

  return (
    <div className="flex flex-col justify-center items-center text-gray-200 opacity-99">
      <div className="relative w-full h-24 bg-blue-500 border-b-4 border-blue-300">
        <div className="absolute bottom-0 right-0 mr-2 flex flex-row justify-center items-center z-20">
          {/* Name, id, and favorite button */}
          <div className="container mr-2 flex flex-row">
            <h1 className="font-bold font-robomono text-2xl mb-1">{name}</h1>
            <h3 className="text-sm mt-3 ml-2 text-gray-400">
              #{currPokemon.id}
            </h3>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Favorite {...favProps} />
            </React.Suspense>
          </div>
        </div>
      </div>
      <section className="w-full text-gray-700 z-10">
        <div className="container">
          {/* Sprite */}
          <img
            className="w-32 bg-red-500 border-4 border-gray-200 rounded-full shadow-md -mt-8 mx-5 ml-7 mb-2"
            src={sprite}
            alt={currPokemon.name}
          />
          <section className="antialiased w-full -mt-24 flex justify-between">
            {/* Category box */}
            <article className="w-32 h-20 p-2 bg-blue-500 rounded shadow-md mt-24 ml-6">
              <div className="h-16 mb-4 text-gray-200 flex flex-col justify-around items-center">
                <span className="text-xs font-robomono">Category: </span>
                <p className="text-sm text-center mb-2">{category}</p>
              </div>
            </article>

            {/* Type, Height, and Weight Box */}
            <article className="text-left w-40 mt-4 mr-6 p-2 rounded shadow-md bg-gray-600 text-gray-200">
              <div className="mr-2">
                <span className="text-xs font-robomono">Type:</span>
                <p className="text-md">{type}</p>
              </div>
              <div className="mr-2">
                <span className="text-xs font-robomono">Height:</span>
                <p className="text-md">{height.toFixed(2)} ft.</p>
              </div>
              <div className="mr-2">
                <span className="text-xs font-robomono">Weight:</span>
                <p className="text-md">{weight.toFixed(2)} lbs.</p>
              </div>
            </article>
          </section>
        </div>
      </section>

      {/* Description */}
      <div className="antialiased text-gray-700">
        <h1 className="mt-4 font-robomono text-md ml-6">Description: </h1>
        <p className="text-center text-sm mt-2 mx-5">{description}</p>
      </div>
      <div className="antialiased text-gray-700">
        <h1 className="mt-4 font-robomono text-md ml-6">Abilities: </h1>
        <p className="text-center text-sm mt-2 mx-5">{description}</p>
      </div>
      <section>
        <Query<{ pokemon: IPokemon }>
          query={GET_POKEMON}
          fetchPolicy={"network-only"}
          variables={{
            path: `pokemon/${(console.log(pokemonID) as any) || pokemonID}/`
          }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              console.log("loading");
              return <p>Loading...</p>;
            }

            if (error) return <p>Error </p>;
            if (!data) return <p>Error</p>;
            const { pokemon } = data;
            console.log(pokemon);
            return (
              <>
                <img
                  className="w-64"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <h1 className="text-gray-700">{pokemon.name}</h1>
              </>
            );
          }}
        </Query>
        ;
      </section>
    </div>
  );
}
