import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2)
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div">
          <Grid
            container
            spacing={4}
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <a href="#">
                <img
                  className="logo"
                  src={require("../images/MYtineraryLogo.png")}
                  alt="MYtinerary Logo"
                />
              </a>
              <Box fontSize="h5.fontSize" m={2}>
                Find your perfect trip, designed by insiders who know and log
                their cities.
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box fontSize="h5.fontSize" m={1}>
                Start Browsing
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

            <Grid item xs={12}>
              <Box fontSize="h6.fontSize" m={1}>
                Want to build your own MYtinerary?
              </Box>
              <Button
                variant="contained"
                to="/login"
                className={classes.button}
                component={Link}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                to="/account"
                className={classes.button}
                component={Link}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Fragment>
  );
}

export default withRouter(Landing);
