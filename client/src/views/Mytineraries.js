/*----- MATERIAL UI -----*/
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

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
    console.log(this.props.match.params._id);
    var city_id = this.props.match.params._id;
    this.props.fetchItineraries(city_id);
    this.props.fetchActivities(city_id);
  }

  render() {
    //console.log(this.props);
    const { city, itinerariesCity, activitiesCity } = this.props;

    return (
      <Fragment>
        {city ? (
          <Fragment>
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

              {itinerariesCity.length === 0 ? (
                <Box my={15}>
                  <Paper>
                    <Typography variant="h5" component="h3">
                      No itineraries for this city
                    </Typography>
                    <Typography component="p">
                      Check itineraries in cities like Amsterdam, Barcelona,
                      Berlin or Naples.
                    </Typography>
                  </Paper>
                </Box>
              ) : (
                <Fragment>
                  <Box fontSize="h7.fontSize" textAlign="left" mb="3">
                    Available MYtineraries:
                  </Box>
                  <ItininerariesList
                    itineraries={itinerariesCity}
                    activities={activitiesCity}
                  />
                </Fragment>
              )}
            </Container>

            <div className="navbar">
              <Navbar />
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Container maxWidth="sm">
              <Box mt={4}>
                <CircularProgress color="primary" />
              </Box>
            </Container>
          </Fragment>
        )}
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
