/*----- MATERIAL UI -----*/
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- COMPONENTS/ACTIONS -----*/
import Navbar from "../components/Navbar";
import ItininerariesList from "../components/ItinerariesList";
import { fetchItinerariesId } from "../store/actions/profileActions";
import { fetchActivities } from "../store/actions/activitiesActions";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const user_id = this.props.match.params._id;
    this.props.fetchItinerariesId(user_id);
  }

  render() {
    var { favitineraries, activities } = this.props;
    //console.log(favitineraries.length);

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            {favitineraries.length === 0 ? (
              <Fragment>
                <Box my={35}>
                  <Paper>
                    <Typography variant="h5" component="h3">
                      No favorite itineraries to show
                    </Typography>
                    <Typography component="p">
                      Start browsing through itineraries and save them as
                      favorites{" "}
                    </Typography>
                  </Paper>
                </Box>
              </Fragment>
            ) : (
              <Fragment>
                <Box my={0}>
                  <Box fontSize="h7.fontSize" textAlign="left" mb="3">
                    Favorite MYtineraries:
                  </Box>
                  <ItininerariesList
                    itineraries={favitineraries}
                    activities={activities}
                  />
                </Box>
              </Fragment>
            )}
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
    favitineraries: state.profile.favItineraries,
    activities: state.activities.activities
  };
};

export default connect(mapStateToProps, {
  fetchItinerariesId,
  fetchActivities
})(Profile);
