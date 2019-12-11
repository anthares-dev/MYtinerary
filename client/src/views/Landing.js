/*----- MATERIAL UI -----*/
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Box from "@material-ui/core/Box";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; // connect component to  redux store.

/*----- COMPONENTS/ACTIONS -----*/
import CitySlider from "../components/CitySlider";
import { loadUser } from "../store/actions/authActions";

/*----- RESOURCES -----*/
// https://reactjsexample.com/infinite-carousel-for-react/
// https://g787543.github.io/infinite-react-carousel/

class Landing extends Component {
  componentDidMount() {}

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <Fragment>
          <Container maxWidth="sm">
            <Typography component="div">
              <Grid
                container
                spacing={4}
                direction="column"
                justify="space-between"
                alignItems="center"
                className="landing"
              >
                <Grid item xs={12}>
                  <img
                    className="logo"
                    src={require("../images/MYtineraryLogo.png")}
                    alt="MYtinerary Logo"
                  />
                  <Box fontSize="h7.fontSize">
                    Find your perfect trip, designed by insiders who know and
                    love their cities.
                  </Box>
                  <Fab
                    color="default"
                    aria-label="start"
                    to="/cities"
                    size="large"
                    component={Link}
                  >
                    <KeyboardArrowRightOutlinedIcon />
                  </Fab>
                </Grid>

                <Grid item xs={12} className="city-slider">
                  <Box fontSize="h7.fontSize" textAlign="left">
                    Popular MYtineraries
                  </Box>
                  <CitySlider />
                </Grid>
              </Grid>
            </Typography>
          </Container>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Container maxWidth="sm">
            <Typography component="div">
              <Grid
                container
                spacing={4}
                direction="column"
                justify="space-between"
                alignItems="center"
                className="landing"
              >
                <Grid item xs={12}>
                  <img
                    className="logo"
                    src={require("../images/MYtineraryLogo.png")}
                    alt="MYtinerary Logo"
                  />
                  <Box fontSize="h7.fontSize">
                    Find your perfect trip, designed by insiders who know and
                    love their cities.
                  </Box>
                  <Fab
                    color="default"
                    aria-label="start"
                    to="/cities"
                    size="large"
                    component={Link}
                  >
                    <KeyboardArrowRightOutlinedIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Typography>
          </Container>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.cities.error, // cities is the name given in rootReducer.js to citiesReducer
  cities: state.cities.cities,
  pending: state.cities.pending
});

export default connect(mapStateToProps, { loadUser })(Landing);
