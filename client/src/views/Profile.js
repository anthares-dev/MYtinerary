/*----- MATERIAL UI -----*/
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- COMPONENTS/ACTIONS -----*/
import Navbar from "../Components/Navbar";
import ItininerariesList from "../Components/ItinerariesList";
import { loadUser } from "../store/actions/authActions";
import { fetchItinerariesId } from "../store/actions/profileActions";
import { fetchActivities } from "../store/actions/activitiesActions";

class Profile extends Component {
  componentDidMount() {
    //console.log("did mount");
    this.props.loadUser();
    let user_id = this.props.user_id;
    this.props.fetchItinerariesId(user_id);
  }

  render() {
    const { favitineraries, activities } = this.props;
    //console.log(favitineraries);

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

const mapStateToProps = state => {
  return {
    user_id: state.auth.user.id,
    //favItin_id: state.auth.user.favorites,
    favItin_id: state.itineraries.favoritesItin,
    favitineraries: state.profile.favItineraries,
    activities: state.activities.activities
  };
};

export default connect(mapStateToProps, {
  loadUser,
  fetchItinerariesId,
  fetchActivities
})(Profile);
