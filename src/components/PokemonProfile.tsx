import React from "react";
import { Store } from "../Store";
import { getPokemon, getPokemonSpecies } from "../Actions";
import Favorite from "./Favorite";
import { toggleFavorite } from "../Actions";
import { IFavProps, IProfileProps } from "../Interfaces";
import { Query } from "react-apollo";
import { GET_POKEMON } from "../Queries";
import EvoChain from './EvoChain'
import Game from "./Game";
import Type from "./Type";


export default function PokemonProfile(props: IProfileProps): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  
  const pokemonID = props.match.params.id;
  React.useEffect(() => {
    getPokemon(pokemonID, dispatch);
    getPokemonSpecies(pokemonID, dispatch);
  }, [pokemonID, dispatch]);
  const { currPokemon } = state;

  let favProps: IFavProps = {
    pokemon: currPokemon,
    store: { state, dispatch },
    toggleFavorite,
    party: state.party
  };
  
  return (
      <section>
        <Query
          query={GET_POKEMON}
          fetchPolicy={"network-only"}
          variables={{
            path: `/pokemon/${pokemonID}/`
          }}
        >
          {({ loading, error, data }: { [key: string]: any }) => {
            if (loading) {
              return (
                <div className='mt-32'>
                  <img 
                    src="https://media3.giphy.com/media/zkMri4yiJ3Mdy/giphy.gif?cid=790b76115d313ced303830484dcf9928&rid=giphy.gif" 
                    alt="loading pikachu"
                    className='mx-auto w-64 rounded mb-3'/>
                  <h1 className='text-center text-2xl font-mono'>Loading...</h1>
                </div>      
                );
            }

            if (error) {
              return <p className="text-gray-700">Error </p>;
            }
            if (!data) return <p className="text-gray-700">Error</p>;
            const { pokemon } = data;
           
            return (
              <div className="flex flex-col justify-center items-center text-gray-200 opacity-99">
                <div className="w-full h-24 bg-blue-500 flex justify-center border-b-4 border-blue-300">
                  
                    <div className='mt-12 w-11/12 xs:w-5/6 sm:w-3/5 md:w-1/2 lg:w-5/12 xl:5/12 xxl:w-1/3 flex justify-end z-20'>
                        <h1 className="font-bold font-mono text-2xl mb-1">
                          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </h1>
                        <h3 className="text-sm mt-3 ml-2 text-gray-400">
                          #{pokemon.id}
                        </h3>
                        <Favorite {...favProps} />
                    </div>
                  
                </div>
                <section className="w-full text-gray-700 z-10 xs:w-5/6 sm:w-3/5 md:w-1/2 lg:w-5/12 xl:5/12 xxl:w-1/3">
                  <div className="container">

                  {/* Sprite */}
                    <img
                      className="w-32 bg-red-500 border-4 border-gray-200 rounded-full shadow-md -mt-8 mx-5 ml-7 mb-2"
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    />
                    <section className="antialiased w-full -mt-24 flex justify-between">

                    {/* Category Box */}
                      <article className="w-32 h-20 p-2 bg-blue-500 rounded shadow-md mt-24 ml-6">
                        <div className="h-16 text-gray-200 flex flex-col justify-around items-center leading-tight">
                          <span className="text-xs font-mono mt-2">Category: </span>
                          <p className="text-xs text-center mb-1">{pokemon.species.genera[2].genus}</p>
                          <p className="text-xs font-mono mb-3">Generation: 
                            <span className='text-xs font-robo'>{' ' + pokemon.species.generation.name.slice(11).toUpperCase()}</span>
                          </p>
                        </div>
                      </article>

                    {/* Type(s), Height, and Weight Box */}
                      <article className="text-left w-40 mt-4 mr-6 p-2 rounded shadow-md bg-gray-600 text-gray-200">
                        <div className="mr-2">
                          <span className="text-xs font-mono">Type:</span>
                          <div className="text-md flex flex-row">
                            {pokemon.types.map((e: any, i: number) => {
                              return <Type key={i} type={e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)}/>;
                            })}
                          </div>
                        </div>
                        <div className="mr-2">
                          <span className="text-xs font-mono">Height:</span>
                          <p className="text-md">{(pokemon.height / 3.048).toFixed(2)} ft.</p>
                        </div>
                        <div className="mr-2">
                          <span className="text-xs font-mono">Weight:</span>
                          <p className="text-md">{(pokemon.weight / 4.536).toFixed(2)} lbs.</p>
                        </div>
                      </article>
                    </section>
                  </div>
                </section>

                {/* Description */}
                <div className="antialiased text-gray-700 xs:w-5/6 sm:w-3/5 md:w-1/2 lg:w-5/12 xl:5/12 xxl:w-1/3">
                  <h1 className="mt-4 font-mono text-md ml-6">Description: </h1>
                  <p className="text-center text-sm mt-2 mx-5">
                    {pokemon.species.flavor_text_entries[1].language.name === 'en'
                      ? pokemon.species.flavor_text_entries[1].flavor_text 
                      : pokemon.species.flavor_text_entries[2].flavor_text }
                  </p>
                </div>

                {/* Evolution Tree */}
                <div className='antialiased text-gray-700 w-full xs:w-5/6 sm:w-3/5 md:w-1/2 lg:w-5/12 xl:5/12 xxl:w-1/3'>
                  <h1 className="mt-4 font-mono text-md ml-6 mb-2">Evolution Tree: </h1>
                  <EvoChain evoChainUrl={pokemon.species.evolution_chain.url}/>
                </div>

                {/* Games */}
                <div className='antialiased text-gray-700 w-full xs:w-5/6 sm:w-3/5 md:w-1/2 lg:w-5/12 xl:5/12 xxl:w-1/3'>
                  <h1 className="mt-4 font-mono text-md ml-6 mb-4">
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} Appears in Versions:
                  </h1> 
                  <div className='w-11/12 h-40 m-auto flex flex-col flex-wrap items-center'>
                    { 
                      pokemon.game_indices.length === 0
                      ? <h1>Looks like the API has failed us!</h1>
                      : pokemon.game_indices.map((game: any, i: number) => {
                        return <Game key={i} version={game.version.name.charAt(0).toUpperCase() + game.version.name.slice(1)}/>
                        })
                    }
                  </div> 
                </div>
              </div>
            );
          }}

        </Query>
      </section>
  );
}
