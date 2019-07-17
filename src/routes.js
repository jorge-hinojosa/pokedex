import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import PokemonProfile from "./components/PokemonProfile";
import ViewAll from './components/ViewAll';
import Party from "./components/Party";

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={PokemonProfile} path="/pokemon/:id" />
    <Route component={ViewAll} path='/pokemon' />
    <Route component={Party} path="/party" />
    <Route component={ErrorPage} path="/error" />
  </Switch>
);
