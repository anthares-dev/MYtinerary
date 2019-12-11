/*----- MATERIAL UI -----*/
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"; // connect component to  redux store.
/*
Connect will help you to dispatch and subscribe to the store at the same time.
It takes two parameters: “mapStateToProps” and “mapDispatchToProps”.
They are both functions that are mapping your store or your actions
and taking or dispatching only the one that you want.
*/

/*----- COMPONENTS/ACTIONS -----*/
import Navbar from "../Components/Navbar";
import { loadUser } from "../store/actions/authActions";

/*----- RESOURCES -----*/
// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
// https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
// https://daveceddia.com/where-fetch-data-redux/

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  componentDidMount() {
    this.props.loadUser();
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    });
  };

  handleClick = () => {
    alert("To see the itineraries please login first.");
  };

  render() {
    const { user, error, pending, cities } = this.props;
    //console.log(cities);
    //console.log(error);

    if (error) {
      return <Fragment>Error!</Fragment>;
    }

    if (pending) {
      return (
        <Fragment>
          <Container maxWidth="sm">
            <Typography component="div">
              <Input
                placeholder="Filter our current cities"
                onChange={this.handleChange}
                value={this.searchTerm}
              />

              <Box mt={4}>
                <CircularProgress color="primary" />
              </Box>
            </Typography>
          </Container>
          <Box className="navbar">
            <Navbar />
          </Box>
        </Fragment>
      );
    }

    if (cities) {
      return (
        <Fragment>
          <Container maxWidth="sm">
            <Typography component="div">
              <Input
                placeholder="Filter our current cities"
                onChange={this.handleChange}
              />
              {cities
                .filter(
                  city =>
                    city.name.toLowerCase().indexOf(this.state.searchTerm) === 0
                )
                .map(city => (
                  <Card className="card" key={city._id}>
                    <CardActionArea>
                      {user ? (
                        <CardMedia
                          image={city.img}
                          title={city.country}
                          className="card-media"
                          component={Link}
                          to={"/cities/" + city._id}
                        />
                      ) : (
                        <CardMedia
                          image={city.img}
                          title={city.country}
                          className="card-media"
                          component={Link}
                          onClick={this.handleClick}
                        />
                      )}
                      <Typography fontSize="h8.fontSize">
                        {city.name}
                      </Typography>
                    </CardActionArea>
                  </Card>
                ))}
            </Typography>
          </Container>
          <Box className="navbar">
            <Navbar />
          </Box>
        </Fragment>
      );
    }
  }
}

//CALLING THE STORE!!!
// here I want to take my state from the store and pass to the props
const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.cities.error, // cities is the name given in rootReducer.js to citiesReducer
  cities: state.cities.cities,
  pending: state.cities.pending
});

export default connect(mapStateToProps, { loadUser })(Cities);
