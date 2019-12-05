/*----- MATERIAL UI -----*/
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- COMPONENTS/ACTIONS -----*/
import Navbar from "../components/Navbar";
import ItininerariesList from "../components/ItinerariesList";
import { fetchItineraries } from "../store/actions/itinerariesActions";
import { fetchActivities } from "../store/actions/activitiesActions";

class Profile extends Component {
  componentDidMount() {
    console.log("did mount");
    let favoritesArray = this.props.profile.favid;
    this.props.fetchItineraries(favoritesArray);
    this.props.fetchActivities();
  }

  render() {
    const { city, itineraries, activities } = this.props;
    console.log(itineraries);
    console.log(this.props.match.params._id);

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <Box fontSize="h7.fontSize" textAlign="left" mb="3">
              Available MYtineraries:
            </Box>
            <ItininerariesList
              itineraries={itineraries}
              activities={activities}
            />
          </Typography>
        </Container>

        <div className="navbar">
          <Navbar />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //let name = ownProps.match.params.name;
  let path = window.location.pathname;

  //console.log(path.substring(path.lastIndexOf("/") + 1));
  return {
    cities: state.citiesRed.cities,
    city: state.citiesRed.cities.find(city => "/cities/" + city._id === path),

    itineraries: state.itinerariesRed.itineraries,
    activities: state.activitiesRed.activities
  };
};

export default connect(mapStateToProps, {
  fetchItineraries,
  fetchActivities
})(Profile);
