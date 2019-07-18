import React from 'react'
import { Store } from '../Store'
import PokemonEntries from './PokemonEntries'
import Pagination from './Pagination';


export default function ViewAll(): JSX.Element {
  const {state} = React.useContext(Store);
  const {allPokemon} = state;

  const [currPage, setCurrPage] = React.useState(1);
  const [pokemonPerPage] = React.useState(25);

  console.log(allPokemon)
  console.log(state)

  //Get Current Pokemon
  const indexOfLastPokemon = currPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

  //Set Current Page
  const paginate = (pageNumber: number) => setCurrPage(pageNumber);

  return (
    <div className='mt-10 font-robo'>
      <Pagination 
        pokemonPerPage={pokemonPerPage} 
        totalPokemon={allPokemon.length} 
        paginate={paginate}
        currPage={currPage}
      />
      <PokemonEntries pokemon={currPokemon}/>
    </div>
  )
}
