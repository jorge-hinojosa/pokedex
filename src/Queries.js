import gql from "graphql-tag";

export const GET_POKEMON = gql`
  query GET_POKEMON($path: String!) {
    pokemon @rest(type: "Pokemon", path: $path) {
      id
      name
      height
      weight
      species @type(name: "Species") {
        url
      }
      sprites @type(name: "Sprites") {
        front_default
      }
    }
  }
`;
