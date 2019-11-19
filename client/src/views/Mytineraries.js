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
import Navigation from "../components/Navigation";
import ItininerariesList from "../components/ItinerariesList";
import { fetchItineraries } from "../store/actions/itinerariesActions";
import { fetchActivities } from "../store/actions/activitiesActions";

class MYtineraries extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("did mount");
    this.props.fetchItineraries();
    this.props.fetchActivities();
  }

  render() {
    console.log(this.props.activities);

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <Card className="card" key={this.props.city._id}>
              <CardActionArea>
                <CardMedia
                  image={this.props.city.img}
                  title={this.props.city.country}
                  className="card-media"
                />
                <Typography fontSize="h8.fontSize">
                  {this.props.city.name}
                </Typography>
              </CardActionArea>
            </Card>

            <Box fontSize="h7.fontSize" textAlign="left" mb="3">
              Available MYtineraries:
            </Box>
            <ItininerariesList
              itineraries={this.props.itineraries}
              activities={this.props.activities}
            />
          </Typography>
        </Container>

        <div className="nav">
          <Navigation />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //let name = ownProps.match.params.name;
  let path = window.location.pathname;

  console.log(path.substring(path.lastIndexOf("/") + 1));
  return {
    cities: state.citiesRed.cities,
    city: state.citiesRed.cities.find(
      city => "/cities/" + city.name + "/" + city._id === path
    ),

    itineraries: state.itinerariesRed.itineraries,
    activities: state.activitiesRed.activities
    //city: state.citiesRed.cities.find(city => city._id === id)
  };
};

// const mapDispatchToProps = () => {
//   return {
//     fetchItineraries: fetchItineraries
//   };
// };

export default connect(mapStateToProps, { fetchItineraries, fetchActivities })(
  MYtineraries
);