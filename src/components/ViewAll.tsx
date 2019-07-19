import React from 'react'
import { Store } from '../Store'
// import PokemonEntries from './PokemonEntries'
import Pagination from './Pagination';

const PokemonEntries = React.lazy<any>(() => import("./PokemonEntries"));


export default function ViewAll(): JSX.Element {
  const {state} = React.useContext(Store);
  const {allPokemon} = state;

  const [currPage, setCurrPage] = React.useState(1);
  const [pokemonPerPage] = React.useState(24);

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
        <React.Suspense fallback={
          <div>
            <img src="https://media3.giphy.com/media/zkMri4yiJ3Mdy/giphy.gif?cid=790b76115d314a80585874726706be88&rid=giphy.gif"
                  alt='pikachu' className='w-64 rounded m-auto'/>
            <h1 className='text-2xl font-robomono mx-auto'>Loading...</h1>
          </div>
        }> 
          <PokemonEntries pokemon={currPokemon}/>
        </React.Suspense>
      </div>
        <Pagination 
          pokemonPerPage={pokemonPerPage} 
          totalPokemon={allPokemon.length} 
          paginate={paginate}
          currPage={currPage}
        />
    </div>
  )
}
