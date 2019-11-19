import React, { Component } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import { Link, withRouter } from "react-router-dom";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
//https://stackoverflow.com/questions/48443772/react-material-ui-bottomnavigation-component-routing-issue

class Navigation extends Component {
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
    console.log(value);
  };
  render() {
    console.log(this.props);

    const { value, pathMap } = this.state;

    if (this.props.match.path == "/cities/:name/:_id") {
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

export default withRouter(Navigation);
