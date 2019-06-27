/**
|--------------------------------------------------
| All Interfaces
|--------------------------------------------------
*/
export interface IState {
  pokemon: Array<IPokemon>;
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
  game_indices: [];
}
export interface IAction {
  type: string;
  payload: any;
}
