import gql from "graphql-tag";

export const GET_POKEMON = gql`
  query GET_POKEMON($path: String!) {
    pokemon @rest(type: "Pokemon", path: $path) {
      id @export(as: id)
      name
      height
      weight
      species
        @rest(type: "Species", path: "/pokemon-species/{exportVariables.id}") {
        flavor_text_entries
        generation
        genera
        evolution_chain @type(name: "EvoChain") {
          url
        }
      }
      sprites @type(name: "Sprites") {
        front_default
      }
      types @type(name: "Types") {
        type
      }
      game_indices
    }
  }
`;

export const GET_EVO_CHAIN = gql`
  query GET_EVO_CHAIN($path: String!) {
    evolution_chain @rest(type: "EvoChain", path: $path) {
      chain
    }
  } 
`;

export const GET_SPRITES = gql`
  query GET_SPRITE($path: String!) {
    pokemon @rest(type: "Pokemon", path: $path) {
      sprites @type(name: "Sprites") {
        front_default
      }
    }
  }
`