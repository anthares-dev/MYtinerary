/*----- MATERIAL UI -----*/
import Card from "./node_modules/@material-ui/core/Card";
import CardActionArea from "./node_modules/@material-ui/core/CardActionArea";
import CardMedia from "./node_modules/@material-ui/core/CardMedia";
import Typography from "./node_modules/@material-ui/core/Typography";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component } from "./node_modules/react";
import { connect } from "./node_modules/react-redux"; // connect component to  redux store.
import { Link } from "./node_modules/react-router-dom";
import Slider from "./node_modules/react-slick";

/*----- RESOURCES -----*/
// https://www.npmjs.com/package/react-slick-slider
// https://stackoverflow.com/questions/55515207/react-slick-slider-map-not-showing-slides
// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670

class CitySlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sliders = () => {
    return this.props.cities.map((city, i) => (
      <Card className="slider-card" key={i}>
        <CardActionArea>
          <CardMedia
            image={city.img}
            title={city.country}
            className="slider-media"
            component={Link}
            to={"/cities/" + city._id}
          />
          <Typography fontSize="h8.fontSize">{city.name}</Typography>
        </CardActionArea>
      </Card>
    ));
  };

  render() {
    //console.log(this.props.cities);
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
  error: state.cities.error,
  cities: state.cities.cities,
  pending: state.cities.pending
});

export default connect(mapStateToProps)(CitySlider);
