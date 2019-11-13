import React, { Component } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Link, withRouter } from "react-router-dom";
import TimelineIcon from "@material-ui/icons/Timeline";

//https://stackoverflow.com/questions/48443772/react-material-ui-bottomnavigation-component-routing-issue

class Navigation extends Component {
  state = {
    value: 0,
    pathMap: ["/landing", "/cities", "/profile", "/mytinerary"]
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
    const { value, pathMap } = this.state;

    return (
      <BottomNavigation
        value={value + 1}
        onChange={this.handleChange}
        showLabels
      >
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
