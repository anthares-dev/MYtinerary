import React from "react";
import Landing from "./views/Landing";
import Cities from "./views/Cities";

import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MYtineraries from "./views/Mytineraries";
import Login from "./views/Login";
import Account from "./views/Account";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <Router>
      <div className="app">
        <CssBaseline />
        <div className="header">
          <Header />
        </div>
        <div className="views">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/cities" component={Cities} />
            <Route path="/:city_id" component={MYtineraries} />
            <Route path="/login" component={Login} />
            <Route path="/account" component={Account} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
