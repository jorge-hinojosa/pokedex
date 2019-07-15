import React from "react";
import { Store } from "../Store";
import { getPokemon, getPokemonSpecies } from "../Actions";
// import Favorite from "./Favorite";
import { toggleFavorite } from "../Actions";
import { IFavProps, IPokemon } from "../Interfaces";
import { Query } from "react-apollo";
import { GET_POKEMON, GET_EVO_CHAIN } from "../Queries";
import EvoChain from './EvoChain'

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

  let favProps: IFavProps = {
    pokemon: currPokemon,
    store: { state, dispatch },
    toggleFavorite,
    party: state.party
  };

  return (
      <section>
        <Query
          // <{ pokemon: IPokemon }>
          query={GET_POKEMON}
          fetchPolicy={"network-only"}
          variables={{
            path: `/pokemon/${pokemonID}/`
          }}
        >
          {({ loading, error, data }: { [key: string]: any }) => {
            if (loading) {
              console.log("loading");
              return <p className="text-gray-700">Loading...</p>;
            }

            if (error) 
            {
              console.log(error)
              return <p className="text-gray-700">Error </p>;
            }
            if (!data) return <p className="text-gray-700">Error</p>;
            const { pokemon } = data;
            console.log(pokemon);
            return (
              <div className="flex flex-col justify-center items-center text-gray-200 opacity-99">
                <div className="relative w-full h-24 bg-blue-500 border-b-4 border-blue-300">
                  <div className="absolute bottom-0 right-0 mr-2 flex flex-row justify-center items-center z-20">
                  {/* Name, id, and favorite button */}
                    <div className="container mr-2 flex flex-row">
                      <h1 className="font-bold font-robomono text-2xl mb-1">
                        {pokemon.name.charAt(0).toUpperCase() + currPokemon.name.slice(1)}
                      </h1>
                      <h3 className="text-sm mt-3 ml-2 text-gray-400">
                        #{pokemon.id}
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
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name.charAt(0).toUpperCase() + currPokemon.name.slice(1)}
                    />
                    <section className="antialiased w-full -mt-24 flex justify-between">
                    {/* Category Box */}
                      <article className="w-32 h-20 p-2 bg-blue-500 rounded shadow-md mt-24 ml-6">
                        <div className="h-16 mb-4 text-gray-200 flex flex-col justify-around items-center">
                          <span className="text-xs font-robomono">Category: </span>
                          <p className="text-sm text-center mb-2">{pokemon.species.genera[2].genus}</p>
                        </div>
                      </article>
                    {/* Type(s), Height, and Weight Box */}
                      <article className="text-left w-40 mt-4 mr-6 p-2 rounded shadow-md bg-gray-600 text-gray-200">
                        <div className="mr-2">
                          <span className="text-xs font-robomono">Type:</span>
                          <div className="text-md flex flex-row">
                            {pokemon.types.map((e: any) => {
                              return <h1 className='mr-2'>{e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)}</h1>;
                            })}
                          </div>
                        </div>
                        <div className="mr-2">
                          <span className="text-xs font-robomono">Height:</span>
                          <p className="text-md">{(pokemon.height / 3.048).toFixed(2)} ft.</p>
                        </div>
                        <div className="mr-2">
                          <span className="text-xs font-robomono">Weight:</span>
                          <p className="text-md">{(pokemon.weight / 4.536).toFixed(2)} lbs.</p>
                        </div>
                      </article>
                    </section>
                  </div>
                </section>

                {/* Description */}
                <div className="antialiased text-gray-700">
                  <h1 className="mt-4 font-robomono text-md ml-6">Description: </h1>
                  <p className="text-center text-sm mt-2 mx-5">
                    {pokemon.species.flavor_text_entries[1].language.name === 'en'
                      ? pokemon.species.flavor_text_entries[1].flavor_text 
                      : pokemon.species.flavor_text_entries[2].flavor_text }
                  </p>
                </div>

                {/* Generation */}
                <div className='antialiased text-gray-700'>
                  <h1 className="mt-4 font-robomono text-md ml-6">Generation: </h1>
                  <p className="text-center text-sm mt-2 mx-5">
                    {pokemon.species.generation.name.charAt(0).toUpperCase() + pokemon.species.generation.name.slice(1)}
                  </p>
                </div>
                
                <EvoChain evoChainUrl={pokemon.species.evolution_chain.url}/>

                {/* Games */}
                <div className='antialiased text-gray-700'>Appears in Versions: 
                  {pokemon.game_indices.reverse().map((game: any) => {
                    return <h3>{game.version.name.charAt(0).toUpperCase() + game.version.name.slice(1)}</h3>
                  })}
                </div>
              </div>
            );
          }}

        </Query>
      </section>
  );
}
