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

/*----- COMPONENTS/ACTIONS -----*/
import Navbar from "../components/Navbar";

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
// https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao
//---> https://daveceddia.com/where-fetch-data-redux/

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    };
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({
      searchTerm: event.target.value.toLowerCase()
    });
  };

  render() {
    //console.log(this.props.cities);
    //console.log(this.props.error);

    if (this.props.error) {
      return <div>Error!</div>;
    }

    if (this.props.pending) {
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
          <div className="navbar">
            <Navbar />
          </div>
        </Fragment>
      );
    }

    if (this.props.cities) {
      return (
        <Fragment>
          <Container maxWidth="sm">
            <Typography component="div">
              <Input
                placeholder="Filter our current cities"
                onChange={this.handleChange}
              />
              {this.props.cities
                .filter(
                  city =>
                    city.name.toLowerCase().indexOf(this.state.searchTerm) === 0
                )
                .map(city => (
                  <Card className="card" key={city._id}>
                    <CardActionArea>
                      <CardMedia
                        image={city.img}
                        title={city.country}
                        className="card-media"
                        component={Link}
                        to={"/cities/" + city._id}
                      />
                      <Typography fontSize="h8.fontSize">
                        {city.name}
                      </Typography>
                    </CardActionArea>
                  </Card>
                ))}
            </Typography>
          </Container>
          <div className="navbar">
            <Navbar />
          </div>
        </Fragment>
      );
    }
  }
}

//CALLING THE STORE!!!
// here I want to take my state from the store and pass to the props
const mapStateToProps = state => ({
  error: state.citiesRed.error, // cities is the name given in rootReducer.js to citiesReducer
  cities: state.citiesRed.cities,
  pending: state.citiesRed.pending
});

export default connect(mapStateToProps)(Cities);
