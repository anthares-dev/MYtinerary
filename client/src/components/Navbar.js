/*----- MATERIAL UI -----*/
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

/*----- RESOURCES -----*/
//https://stackoverflow.com/questions/48443772/react-material-ui-bottomnavigation-component-routing-issue

class Navbar extends Component {
  state = {
    value: 0,
    pathMap: ["/", "/cities"]
  };

  componentWillReceiveProps(newProps) {
    const { pathname } = newProps.location;
    const { pathMap } = this.state;

    const value = pathMap.indexOf(pathname);

    if (value > -1) {
      this.setState({
        value
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    //console.log(value);
  };
  render() {
    //console.log(this.props);

    const { value, pathMap } = this.state;

    if (this.props.match.path === "/cities/:_id") {
      return (
        <BottomNavigation
          value={value + 1}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction
            icon={<ChevronLeftIcon fontSize="large" />}
            component={Link}
            to={pathMap[1]}
          />

          <BottomNavigationAction
            icon={<HomeIcon fontSize="large" />}
            component={Link}
            to={pathMap[0]}
          />

          <BottomNavigationAction disabled />
        </BottomNavigation>
      );
    }

    return (
      <BottomNavigation
        value={value + 1}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction
          icon={<HomeIcon fontSize="large" />}
          component={Link}
          to={pathMap[0]}
        />
      </BottomNavigation>
    );
  }
}

export default withRouter(Navbar); // I need to puth withRouter() because Navbar component is not included in the Router in App.js
