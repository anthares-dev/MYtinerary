import React, { Component, Fragment } from "react";
import Navigation from "../components/Navigation";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux"; // connect component to  redux store.
import { fetchCities } from "../store/actions/citiesActions";
import { bindActionCreators } from "redux";

import ItininerariesList from "../components/ItinerariesList";

class MYtineraries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchCities(); // call the function inside my prop

    console.log(this.props);
  }

  render() {
    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <Card className="card" key={this.props.city._id}>
              <CardActionArea>
                <CardMedia
                  image={this.props.city.img}
                  title={this.props.city.country}
                  className="card-media"
                />
                <Typography fontSize="h8.fontSize">
                  {this.props.city.name}
                </Typography>
              </CardActionArea>
            </Card>

            <Box fontSize="h7.fontSize" textAlign="left" mb="3">
              Available MYtineraries:
            </Box>
            <ItininerariesList />
          </Typography>
        </Container>

        <div className="nav">
          <Navigation />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.city_id;
  return {
    city: state.citiesRed.cities.find(city => city._id === id)
    //https://www.youtube.com/watch?v=CZ2qGtAnhoE&list=PL4cUxeGkcC9ij8CfkAY2RAGb-tmkNwQHG&index=40
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCities: fetchCities
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MYtineraries);
