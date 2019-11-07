import React, { Component, Fragment } from "react";
import QuoteList from "../components/QuoteList";
import axios from "axios";

// https://code.tutsplus.com/tutorials/fetching-data-in-your-react-application--cms-30670
export default class Cities extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isFetching: false,
      quotes: []
    };
  }

  //The componentDidMount() method fires when the component can be accessed and update the quotes frequently every 60 secs.
  componentDidMount() {
    this.fetchQuotes();

    this.timer = setInterval(() => this.fetchQuotes(), 60000);
  }
  //fetches everything every five seconds by starting a timer in componentDidMount() and cleaning up in componentWillUnmount():
  componentWillUnmount() {
    this.timer = null;
  }

  // The fetchQuotes() method takes care of updating state.isFetching by initializing it to true when it starts and setting it back to false when receiving the quotes:
  fetchQuotes = () => {
    this.setState({
      ...this.state,
      isFetching: true,
      filteredQuotes: this.state.quotes
    });
    axios
      .get("http://localhost:5000/cities/all")
      .then(response =>
        this.setState({ quotes: response.data, isFetching: false })
      )
      .catch(e => console.log(e));
  };

  render() {
    const title = "My cities!";
    // let now = new Date();
    console.log(this.state.quotes);
    return (
      <Fragment>
        <h2>{title}</h2>
        <p>{this.state.isFetching ? "Fetching quotes..." : ""}</p>

        <ul>
          <QuoteList quotes={this.state.quotes} />
        </ul>
      </Fragment>
    );
  }
}
