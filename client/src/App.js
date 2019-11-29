/*----- MATERIAL UI -----*/
import CssBaseline from "@material-ui/core/CssBaseline";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- VIEWS -----*/
import Landing from "./views/Landing";
import Cities from "./views/Cities";
import MYtineraries from "./views/Mytineraries";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";

/*----- COMPONENTS/ACTIONS -----*/
import Appbar from "./components/Appbar";
import { fetchCities } from "./store/actions/citiesActions";
import { loadUser } from "./store/actions/authActions";

/*----- RESOURCES -----*/
// https://codeburst.io/getting-started-with-react-router-5c978f70df91

class App extends Component {
  componentDidMount() {
    this.props.fetchCities();
    this.props.loadUser();
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
            <Route exact path="/" component={Landing} />
            <Route exact path="/cities" component={Cities} />
            <Route path="/cities/:_id" component={MYtineraries} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, { fetchCities, loadUser })(App);
