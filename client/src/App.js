import React from "react";
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MYtinerary from "./views/Mytinerary";
import Login from "./views/Login";
import Account from "./views/Account";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/Landing" component={Landing} />
          <Route path="/Cities" component={Cities} />
          <Route path="/Mytinerary" component={MYtinerary} />
          <Route path="/Login" component={Login} />
          <Route path="/Account" component={Account} />
        </Switch>
        <div className="nav">
          <Navigation />
        </div>
      </div>
    </Router>
  );
}
