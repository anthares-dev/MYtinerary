import React, { Component, Fragment } from "react";

import axios from "axios";
import Navigation from "../components/Navigation";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

import Container from "@material-ui/core/Container";

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
export default class Cities extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isFetching: false,
      cities: [],
      search: ""
    };
  }

  //The componentDidMount() method fires when the component can be accessed and update the cities frequently every 60 secs.
  componentDidMount() {
    this.fetchCities();

    //this.timer = setInterval(() => this.fetchCities(), 60000);
  }
  //fetches everything every five seconds by starting a timer in componentDidMount() and cleaning up in componentWillUnmount():
  componentWillUnmount() {
    this.timer = null;
  }

  // The fetchcities() method takes care of updating state.isFetching by initializing it to true when it starts and setting it back to false when receiving the cities:
  fetchCities = () => {
    this.setState({
      ...this.state,
      isFetching: true
    });
    axios
      .get("http://localhost:5000/cities/all")
      .then(response =>
        this.setState({ cities: response.data, isFetching: false })
      )
      .catch(e => console.log(e));
  };

  filterList = event => {
    this.setState({
      search: event.target.value.toLowerCase()
    });
  };

  render() {
    var cities = this.state.cities.filter(item => {
      return (
        item.name
          .toLowerCase()
          .charAt(0)
          .search(this.state.search) !== -1
      );
    });
    console.log(this.state.cities);

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <p>{this.state.isFetching ? "Fetching cities..." : ""}</p>

            <Input
              autoFocus="true"
              placeholder="Filter our current cities"
              onChange={this.filterList}
              fullWidth="true"
            />
            {cities.map(item => (
              <Card className="card">
                <CardActionArea>
                  <CardMedia
                    image={item.img}
                    title={item.country}
                    className="card-media"
                  />
                  <Typography fontSize="h8.fontSize">{item.name}</Typography>
                </CardActionArea>
              </Card>
            ))}
          </Typography>
        </Container>
        <div className="nav">
          <Navigation />
        </div>
      </Fragment>
    );
  }
}
