/*----- MATERIAL UI -----*/
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/*----- COMPONENTS/ACTIONS/DEPENDENCIES -----*/
import { login } from "../store/actions/authActions";
import Navbar from "../components/Navbar";
import { clearErrors } from "../store/actions/errorActions";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //* Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    //* If authenticated, go to landing page
    if (isAuthenticated) {
      this.props.history.push("/");
      /* To navigate programmatically we need to take the help of history object
         which is passed by the react-router. There is a push method available in the history object
         by using the push method we are redirecting the user to the Home page
         whenever a user submits the form.
      */
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
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <Fragment>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <img
            className="logo-small"
            src={require("../images/MYtineraryLogo.png")}
            alt="MYtinerary Logo"
          />
          <div className="paper">
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            {this.state.msg ? (
              <Typography component="p" variant="overline" color="error">
                {this.state.msg}!{" "}
              </Typography>
            ) : null}
            <form className="form" noValidate onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.onchange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                  >
                    Sign In with email address
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box component={Link} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography component="h2" variant="h6">
                      Access with Google
                    </Typography>

                    <a
                      href="#"
                      className="google-button"
                      data-onsuccess="onSignIn"
                      onClick={() =>
                        (window.location = "/api/users/auth/google")
                      }
                    >
                      <div>
                        <span className="svgIcon t-popup-svg">
                          <svg
                            className="svgIcon-use"
                            width="25"
                            height="37"
                            viewBox="0 0 25 25"
                          >
                            <g fill="none" fillRule="evenodd">
                              <path
                                d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                fill="#34A853"
                              />
                              <path
                                d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                fill="#EA4335"
                              />
                            </g>
                          </svg>
                        </span>
                        <span className="button-label">
                          Sign in with Google
                        </span>
                      </div>
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <Box className="navbar">
          <Navbar />
        </Box>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(SignIn);
