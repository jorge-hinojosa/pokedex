/**
|--------------------------------------------------
| All Interfaces
|--------------------------------------------------
*/
export interface IState {
  homePokemon: Array<IPokemon>;
  currPokemon: Array<IPokemon>;
  currSpecies: any;
  allPokemon: any;
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

export interface IEvolution {
  name: string,
  url: string
}

export interface IEvo {
  evolution_details: [];
  evolves_to: [];
  is_baby: boolean;
  species: {
    name: string;
    url: string
  }
}

// Props Interfaces
export interface IProfileProps {
  match: {
    params: {
      id: string
    };
    path: string;
    url: string;
  }
}
export interface IFavProps {
  pokemon: IPokemon;
  store: { state: IState; dispatch: any };
  toggleFavorite: (state: IState, dispatch: any, pokemon: IPokemon) => IAction;
  party: Array<IPokemon>;
}

export interface IEvoChainProps {
  evoChainUrl: string
}
