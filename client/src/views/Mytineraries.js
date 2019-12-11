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

class MYtineraries extends Component {
  componentDidMount() {
    //console.log("did mount");
    //console.log(this.props.match.params._id);
    var city_id = this.props.match.params._id;
    this.props.fetchItineraries(city_id);
    this.props.fetchActivities(city_id);
  }

  render() {
    //console.log(this.props);
    const { city, itinerariesCity, activitiesCity } = this.props;

    return (
      <Fragment>
        {this.props.city ? (
          <Container maxWidth="sm">
            <Card className="card" key={city._id}>
              <CardActionArea>
                <CardMedia
                  image={city.img}
                  title={city.country}
                  className="card-media"
                />
                <Typography fontSize="h8.fontSize">{city.name}</Typography>
              </CardActionArea>
            </Card>

            <Box fontSize="h7.fontSize" textAlign="left" mb="3">
              Available MYtineraries:
            </Box>
            <ItininerariesList
              itineraries={itinerariesCity}
              activities={activitiesCity}
            />
          </Container>
        ) : (
          " "
        )}
        <div className="navbar">
          <Navbar />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  let path = window.location.pathname;
  //console.log(path.substring(path.lastIndexOf("/") + 1));
  return {
    cities: state.cities.cities,
    city: state.cities.cities.find(city => "/cities/" + city._id === path),
    itinerariesCity: state.itineraries.itineraries,
    activitiesCity: state.activities.activities
  };
};

export default connect(mapStateToProps, {
  fetchItineraries,
  fetchActivities
})(MYtineraries);
