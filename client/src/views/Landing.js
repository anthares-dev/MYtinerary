import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";
import CitySlider from "../components/CitySlider";

//https://reactjsexample.com/infinite-carousel-for-react/
// https://g787543.github.io/infinite-react-carousel/

function Landing() {
  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(2)
    }
  }));

  const classes = useStyles();

  const settings = {
    arrows: true,
    arrowsBlock: false,
    centerMode: false,
    dots: true,
    dotsScroll: 2,
    initialSlide: true,
    rows: 2,
    slidesToShow: 2,
    wheelScroll: 2
  };
  return (
    <Fragment>
      <Container maxWidth="sm">
        <Typography component="div">
          <Grid
            container
            spacing={4}
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="landing"
          >
            <Grid item xs={12}>
              <a href="#">
                <img
                  className="logo"
                  src={require("../images/MYtineraryLogo.png")}
                  alt="MYtinerary Logo"
                />
              </a>
              <Box fontSize="h7.fontSize" mb={2}>
                Find your perfect trip, designed by insiders <br />
                who know and love their cities.
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
              <Box fontSize="h7.fontSize" textAlign="left" mb={1}>
                Popular MYtineraries
              </Box>

              <CitySlider />
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Fragment>
  );
}

export default withRouter(Landing);
