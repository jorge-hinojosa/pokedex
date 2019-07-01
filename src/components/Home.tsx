import React from "react";
import { Store } from "../Store";
import { getPokemon } from "../Actions";

const FeatPokemon = React.lazy<any>(() => import("./FeatPokemon"));

export default function Home(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);
  const props = {
    homePokemon: state.homePokemon,
    party: state.party,
    store: { state, dispatch }
  };

  const [userInput, setUserInput] = React.useState("");
  const handleSearch = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value.toLowerCase());
  };

  return (
    <React.Fragment>
      <div className="w-full h-56 mt-5 bg-blue-500 flex flex-col justify-center items-center text-gray-200">
        <h1 className="font-bold text-2xl my-3 font-robomono">Pokédex</h1>
        <div className="w-56 flex flex-row justify-around items-center mb-2">
          <img
            src="https://image.flaticon.com/icons/svg/188/188987.svg"
            alt="Pokeball"
            className="w-6"
          />
          <img
            src="https://image.flaticon.com/icons/svg/189/189001.svg"
            alt="Pokeball"
            className="w-6"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188989.svg"
            alt="Pokeball"
            className="w-6"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188995.svg"
            alt="Pokeball"
            className="w-6"
          />
          <img
            src="https://image.flaticon.com/icons/svg/188/188997.svg"
            alt="Pokeball"
            className="w-6"
          />
        </div>
        <p className="w-3/4 mb-5 text-center text-sm">
          Discover your favorite Pokemon and add them to your party!
        </p>
        <form
          onSubmit={() => getPokemon(userInput, dispatch)}
          className="flex flex-row justify-center items-center"
        >
          <input
            className="rounded bg-blue-600 text-sm pl-1 focus:outline-none"
            placeholder="Search"
            onChange={handleSearch}
          />
          <i
            onClick={() => getPokemon(userInput, dispatch)}
            className="material-icons ml-1 text-gray-200"
          >
            search
          </i>
        </form>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <FeatPokemon {...props} />
      </React.Suspense>
    </React.Fragment>
  );
}
