import React, { useState } from "react";
import { HashRouter} from "react-router-dom"
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

import Navigation from "./Navigation";
import Detail from "./Detail";
import About from "./About";
import Profile from "./Profile"

const AppRouter = ({isLoggedIn, userObj}) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            {/* <Route exact path="/"> */}
            <HashRouter>
                <Navigation />
                <Route path="/" exact={true} component={Home} userObj={userObj}/>
                <Route path="/about" exact={true} component={About}/>
                <Route path="/profile" exact={true} component={Profile}/>
                <Route path="/movie/:id" exact={true} component={Detail}/>
            </HashRouter>
            {/* </Route> */}
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;