import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Store";
import { RestLink } from "apollo-link-rest";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";

// import gql from "graphql-tag";

const restLink = new RestLink({
  uri: 'https://pokeapi.co/api/v2',
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

ReactDOM.render(
  <Router>
    <StoreProvider>
      <ApolloApp />
    </StoreProvider>
  </Router>,
  document.getElementById("root")
);
