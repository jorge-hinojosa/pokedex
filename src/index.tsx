import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Store";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const restLink = new RestLink({
  uri: "https://pokeapi.co/api/v2/"
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

const ApolloApp = (): any => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// const query = gql`
//   query pikachu {
//     pokemon @rest(type: "Pokemon", path: "pokemon/25/") {
//       name
//       height
//       weight
//       species @type(name: "Species") {
//         url
//       }
//       sprites @type(name: "Sprites") {
//         front_default
//       }
//     }
//   }
// `;

// client.query({ query }).then((response: any) => {
//   console.log(response);
// });

ReactDOM.render(
  <StoreProvider>
    <ApolloApp />
  </StoreProvider>,
  document.getElementById("root")
);
