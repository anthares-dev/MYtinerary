import React, { Component } from "react";
import { connect } from "react-redux"; // connect component to  redux store.
import { fetchCities } from "../store/actions/citiesActions";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Slider from "react-slick";
// https://www.npmjs.com/package/react-slick-slider
// https://stackoverflow.com/questions/55515207/react-slick-slider-map-not-showing-slides

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
class CitySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  sliders = () => {
    return this.props.cities.map(item => (
      <Card className="slider-card" key={item._id}>
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

const mapStateToProps = state => ({
  error: state.citiesRed.error,
  cities: state.citiesRed.cities,
  pending: state.citiesRed.pending
});

export default connect(mapStateToProps, { fetchCities })(CitySlider);
