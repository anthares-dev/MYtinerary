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

/*----- COMPONENTS/ACTIONS -----*/
import Header from "./components/Header";
import { fetchCities } from "./store/actions/citiesActions";
import { loadUser } from "./store/actions/authActions";

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
          <div className="header">
            <Header />
          </div>
          <div className="views">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/cities" component={Cities} />
              <Route path="/cities/:_id" component={MYtineraries} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// const mapDispatchToProps = () => {
//   return {
//     fetchCities: fetchCities
//   };
// };

export default connect(null, { fetchCities, loadUser })(App);
