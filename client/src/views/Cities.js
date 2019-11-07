import React, { Component, Fragment } from "react";
// import QuoteList from "../components/QuoteList";
import axios from "axios";

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

    this.timer = setInterval(() => this.fetchCities(), 60000);
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
    const title = "My cities!";
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
        <h2>{title}</h2>
        <p>{this.state.isFetching ? "Fetching cities..." : ""}</p>
        <input type="search" onChange={this.filterList} />
        <ul>
          {cities.map(item => (
            <li key={item._id}>
              {item.name}, {item.country}
            </li>
          ))}
          ;
        </ul>
      </Fragment>
    );
  }
}
