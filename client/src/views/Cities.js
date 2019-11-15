import React, { Component, Fragment } from "react";
import Navigation from "../components/Navigation";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux"; // connect component to  redux store.
import { fetchCities } from "../store/actions/citiesActions";

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
// https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: "",
      cities: [],
      error: "",
      search: ""
    };
  }

  componentDidMount() {
    const { fetchCities } = this.props;
    fetchCities();
    console.log(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      cities: nextProps.cities
    });
  }

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
          //.charAt(0)
          .search(this.state.search) !== -1
      );
    });

    return (
      <Fragment>
        <Container maxWidth="sm">
          <Typography component="div">
            <Input
              placeholder="Filter our current cities"
              onChange={this.filterList}
            />
            {cities.map(item => (
              <Card className="card" key={item._id}>
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

// here I want to take my state from the store and pass to the props
const mapStateToProps = state => ({
  error: state.cities.error, // cities is the name given in rootReducer.js to citiesReducer
  cities: state.cities.cities,
  pending: state.cities.pending
});

// I don't need a const mapDispatchToProps here because I'm already dispatching my action "fecthCities" here below as second argument

/* TO check
const mapDispatchToProps = dispatch => {
  return {
    fetchCities
  };
};
*/
export default connect(mapStateToProps, { fetchCities })(Cities);
