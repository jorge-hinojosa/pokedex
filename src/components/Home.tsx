import React from "react";
import { Store } from "../Store";
import { Redirect } from "react-router";
import { getAllPokemon } from '../Actions';
import { Link } from 'react-router-dom';

const FeatPokemon = React.lazy<any>(() => import("./FeatPokemon"));

export default function Home(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    getAllPokemon(dispatch);
  }, [dispatch])
  // console.log(state)
  const [redirect, setRedirect] = React.useState(false);

  const [userInput, setUserInput] = React.useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value.toLowerCase());
  };

  const handleSearch = () => {
    setRedirect(true);
  };
  const props = {
    homePokemon: state.homePokemon,
    party: state.party,
    store: { state, dispatch }
  };
  return (
    <React.Fragment>
      {redirect ? <Redirect to={`/pokemon/${userInput}`} /> : null}
      <div className="w-full h-64 mt-4 bg-blue-500 border-b-4 border-blue-300 flex flex-col justify-center items-center text-gray-200 shadow">
        <h1 className="text-4xl my-3 font-mono">Pokédex</h1>
        <div className="w-2/3 flex flex-row justify-around items-center mb-2 sm:w-1/2 md:w-1/3">
          <img
            src="https://image.flaticon.com/icons/svg/188/188987.svg"
            alt="Pokeball"
            className="w-8"
          />
          <img
            src="https://image.flaticon.com/icons/svg/189/189001.svg"
            alt="Pokeball"
            className="w-8"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188989.svg"
            alt="Pokeball"
            className="w-8"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188995.svg"
            alt="Pokeball"
            className="w-8"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188997.svg"
            alt="Pokeball"
            className="w-8"
          />
        </div>
        <p className="w-3/4 mb-5 text-center text-md">
          Discover your favorite Pokemon and add them to your party!
        </p>
        <form
          onSubmit={handleSearch}
          className="flex flex-row justify-center items-center"
        >
          <input
            className="rounded bg-blue-600 text-sm pl-1 focus:outline-none"
            placeholder="Search"
            onChange={handleChange}
          />
          <i
            onClick={handleSearch}
            className="material-icons ml-1 text-gray-200"
          >
            search
          </i>
        </form>
        
      </div>
      <ul className='w-full m-auto bg-gray-700 text-gray-200 font-mono rounded absolute mt-64'>
        { 
          userInput.length === 0
          ? null
          : state.allPokemon
            .filter((pokemon: any) => pokemon.name.includes(userInput.toLowerCase()))
            .map((pokemon:any, i: number) => {
              return <Link key={i} to={`/pokemon/${pokemon.name}`}>
                        <li className='p-1 mx-2 hover:cursor-pointer text-lg border-b border-gray-600 hover:border-red-300'>{pokemon.name}</li>
                     </Link>})
        }
      </ul>
    
      <React.Suspense fallback={<img src="https://media3.giphy.com/media/zkMri4yiJ3Mdy/giphy.gif?cid=790b76115d314a80585874726706be88&rid=giphy.gif" alt='pikachu' className='w-64 rounded m-auto'/> }>
        <FeatPokemon {...props} />
      </React.Suspense>
  
    </React.Fragment>
  );
}
