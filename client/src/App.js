/*----- MATERIAL UI -----*/
import CssBaseline from "@material-ui/core/CssBaseline";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- VIEWS -----*/
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import MYtineraries from "./views/Mytineraries";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Profile from "./views/Profile";

/*----- COMPONENTS/ACTIONS -----*/
import Appbar from "./components/Appbar";
import { fetchCities } from "./store/actions/citiesActions";
import { loadUser } from "./store/actions/authActions";

/*----- RESOURCES -----*/
// https://codeburst.io/getting-started-with-react-router-5c978f70df91

class App extends Component {
  componentDidMount() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    //console.log(url_string);

    var token = url.searchParams.get("token");
    //console.log(token);

    if (token || localStorage.getItem("token") !== null) {
      //console.log("is different");

      if (token) {
        //console.log("is token", token);

        localStorage.setItem("token", token);
        //console.log(localStorage.getItem("token"));

        window.history.replaceState(null, null, `${window.location.origin}`);
        //console.log(localStorage.getItem("token"));
      }
    } else {
      //console.log("else");
    }
    // console.log(localStorage.getItem("token"));
    this.props.fetchCities();
    this.props.loadUser(); // with the refresh of the page, if there is a token the user will be loaded!
  }

  render() {
    return (
      <Router>
        <div className="app">
          <CssBaseline />
          <div className="appbar">
            <Appbar />
          </div>
          <div className="views">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/cities" component={Cities} />
              <Route path="/cities/:_id" component={MYtineraries} />
              <Route path="/profile/:_id" component={Profile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/:token" component={Landing} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchCities, loadUser })(App);
