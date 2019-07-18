import React from 'react'
import { Store } from '../Store'
import PokemonEntries from './PokemonEntries'
import Pagination from './Pagination';


export default function ViewAll(): JSX.Element {
  const {state} = React.useContext(Store);
  const {allPokemon} = state;

  const [currPage, setCurrPage] = React.useState(1);
  const [pokemonPerPage] = React.useState(25);

  //Get Current Pokemon
  const indexOfLastPokemon = currPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  //Set Current Page
  const paginate = (pageNumber: number) => setCurrPage(pageNumber);

  return (
    <div className='mt-10 font-robo flex flex-col justify-center items-center'>
      <div className='w-full bg-blue-500 pt-3 border-b-4 border-blue-300 shadow-md'>
        <h1 className='font-robomono text-gray-200 text-2xl text-center mb-3'>All Pokémon</h1>
      </div>
      <div className='w-full'>
        <Pagination 
          pokemonPerPage={pokemonPerPage} 
          totalPokemon={allPokemon.length} 
          paginate={paginate}
          currPage={currPage}
        />
        <PokemonEntries pokemon={currPokemon}/>
      </div>
    </div>
  )
}
