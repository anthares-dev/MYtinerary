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
import { loadUser } from "../store/actions/authActions";
import { fetchItinerariesId } from "../store/actions/profileActions";
import { fetchActivities } from "../store/actions/activitiesActions";

class Profile extends Component {
  componentDidMount() {
    console.log("did mount");
    this.props.loadUser();

    let user_id = this.props.user_id;
    console.log(user_id);
    this.props.fetchItinerariesId(user_id);
  }

  render() {
    const { favitineraries, activities } = this.props;
    console.log(favitineraries);

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <Box fontSize="h7.fontSize" textAlign="left" mb="3">
              Favorites MYtineraries:
            </Box>

            <ItininerariesList
              itineraries={favitineraries}
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
  return {
    user_id: state.auth.user.id,
    //favItin_id: state.auth.user.favorites,
    favItin_id: state.itinerariesRed.favoritesItin,
    favitineraries: state.profileRed.favItineraries,
    activities: state.activitiesRed.activities
  };
};

export default connect(mapStateToProps, {
  loadUser,
  fetchItinerariesId,
  fetchActivities
})(Profile);
