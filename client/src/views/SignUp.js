import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, withRouter } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { connect } from "react-redux"; // connect component to  redux store.
import SnackbarContent from "@material-ui/core/SnackbarContent";

import PropTypes from "prop-types";
import { register } from "../store/actions/authActions";
import { clearErrors } from "../store/actions/errorActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://material-ui.com/">
        MYtineraries
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //* Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //* If authenticated, go to landing page
    if (isAuthenticated) {
      window.location.replace("/");
    }
  }

  onchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    //* Clear errors
    this.props.clearErrors();

    e.preventDefault();

    const { name, email, password } = this.state;

    //* Create user Object
    const newUser = {
      name,
      email,
      password
    };

    //* Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <img
          className="logo"
          src={require("../images/MYtineraryLogo.png")}
          alt="MYtinerary Logo"
        />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          {this.state.msg ? (
            <Box component="p" variant="h4">
              {this.state.msg}!{" "}
            </Box>
          ) : null}
          <form className="form" noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={this.onchange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.onchange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onchange}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  className="imput"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    className="button"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload your photo profile
                  </Button>
                </label>{" "}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Box component={Link} to="/signin" variant="body2">
                  Already have an account? Sign in
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);
