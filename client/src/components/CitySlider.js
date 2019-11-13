import React, { Component, Fragment } from "react";
// import QuoteList from "../components/QuoteList";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
// https://www.npmjs.com/package/react-slick-slider
// https://stackoverflow.com/questions/55515207/react-slick-slider-map-not-showing-slides

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
export default class CitySlider extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isFetching: false,
      cities: []
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

  sliders = () => {
    return this.state.cities.map(item => (
      <Card className="slider-card">
        <CardActionArea>
          <CardMedia
            image={item.img}
            title={item.country}
            className="slider-media"
          />

          <Typography fontSize="h8.fontSize">{item.name}</Typography>
        </CardActionArea>
      </Card>
    ));
  };

  render() {
    var settings = {
      dots: true,
      rows: 2,
      slidesPerRow: 2,
      initialSlide: 1,
      centerPadding: "8px"
    };

    return <Slider {...settings}>{this.sliders()}</Slider>;
  }
}