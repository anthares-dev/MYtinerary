import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../actions/profileActions";
import { removeFavorites } from "../actions/profileActions";
import { fetchItinerariesID } from "../actions/profileActions";

import IconCity from "../components/layout/IconCity";
import Header from "../components/layout/Header";
import ItinCard from "../components/layout/ItinCard";

import Card from "@material-ui/core/Card";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itineraries: [],
      favid: [],
      favitin: [],
      profile: []
    };
  }

  /*
  async componentDidMount() {
    let favoritesArray = this.props.profile.favid;

    if (this.state.favid.length === 0) {
      await this.props.fetchItinerariesID(favoritesArray);
    }
    this.setState({
      favitin: this.props.profile.favid
    });
  }

  */
  render() {
    const { user } = this.props.auth;
    let favitin = this.props.profile.favitin;

    const noFavouritesMessage = (
      <div className="itineraryCard">
        <Card raised>
          <div className="dashboardNoFavMessage">
            <p> You have not added any favorites to your profile.</p>
            <p>
              To add favourites please browse itineraries in cities and click on
              the <span className="addToFavText">add to favorite</span> icon.
            </p>
            <IconCity />
          </div>
        </Card>
      </div>
    );

    const listFavoriteIDs = favitin.map((itinerary, i) => (
      <React.Fragment key={i}>
        <ItinCard
          title={itinerary.title}
          authorimage={itinerary.authorimage}
          duration={itinerary.duration}
          price={itinerary.price}
          likes={itinerary.likes}
          ratings={itinerary.ratings}
          hashtag={itinerary.hashtag}
          author={itinerary.author}
          _id={itinerary._id}
          activitykey={itinerary.activitykey}
          history={this.props.history.location.pathname}
        />
      </React.Fragment>
    ));

    return (
      <React.Fragment>
        <Header title={"Dashboard"} />
        <div className="itineraryCard">
          <Card raised>
            <div className="dashboardNoFavMessage">
              Welcome <span className="dashboardUsername">{user.username}</span>
              .
              <p>
                View and manage your Favourite Itineraries from the Dashboard.
              </p>{" "}
            </div>
          </Card>
        </div>

        <div>
          {this.props.profile.favitin.length > 0 ? (
            <div>{listFavoriteIDs}</div>
          ) : (
            <div>{noFavouritesMessage}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  itineraries: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  itineraries: state.itineraries,

  favid: state.favid,
  favitin: state.favitin
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  fetchItinerariesID,
  removeFavorites
})(Profile);
