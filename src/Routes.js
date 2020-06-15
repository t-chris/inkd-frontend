import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import NotFound from "./Error/Error";

export default function Routes() {
  return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route>
            <NotFound />
        </Route>
    </Switch>
  );
}