/**
|--------------------------------------------------
| All Interfaces
|--------------------------------------------------
*/
export interface IState {
  homePokemon: Array<IPokemon>;
  currPokemon: Array<IPokemon>;
  currSpecies: any;
  party: Array<IPokemon>;
}
export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: {
    name: string;
  };
  forms: [];
  abilities: [];
  moves: [];
  sprites: {
    front_default: string;
  };
  types: [];
  game_indices: [];
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IFavProps {
  pokemon: IPokemon;
  store: { state: IState; dispatch: any };
  toggleFavorite: (state: IState, dispatch: any, pokemon: IPokemon) => IAction;
  party: Array<IPokemon>;
}
