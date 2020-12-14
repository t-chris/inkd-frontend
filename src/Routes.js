import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Error from "./Error/Error";
import AppliedRoute from "./AppliedRoute";

export default function Routes({ appProps }) {
  return ( 
  <Switch>
    <AppliedRoute path="/" exact component={Home} appProps={appProps} />
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/signup">
      <Signup />
    </Route>    
    <Route component={Error} /> 
  </Switch>
  );
   }