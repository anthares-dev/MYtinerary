/*----- MATERIAL UI -----*/
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

/*----- REACT/ROUTER/REDUX -----*/
import React, { Component } from "react";
import { connect } from "react-redux"; // connect component to  redux store.
import { Link } from "react-router-dom";
import Slider from "react-slick";

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
      lazyRender: true,
      infinite: true,
      initialSlide: 0,
      dots: true,
      rows: 2,
      slidesPerRow: 2,
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
