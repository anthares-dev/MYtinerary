import axios from "axios";
//creating my three actions: loading fetch, fetch success or fetch error
import {
  FETCH_ITINERARIES_PENDING,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_ERROR,
  ADD_FAVORITES,
  DELETE_FAVORITES
} from "./typesActions";

export function fetchItinerariesPending() {
  return {
    type: FETCH_ITINERARIES_PENDING
  };
}

export function fetchItinerariesSuccess(itineraries) {
  return {
    type: FETCH_ITINERARIES_SUCCESS,
    payload: itineraries
  };
}

export function fetchItinerariesError(error) {
  return {
    type: FETCH_ITINERARIES_ERROR,
    payload: error
  };
}

export function fetchItineraries(city_id) {
  console.log("inside action");
  return dispatch => {
    dispatch(fetchItinerariesPending());

    fetch("/api/itineraries/" + city_id)
      .then(res => {
        console.log("fetched");
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        console.log(json);
        dispatch(fetchItinerariesSuccess(json));
        return json;
      })
      .catch(err => {
        dispatch(fetchItinerariesError(err));
      });
  };
}

// ADD FAVORITES
export const addFavorites = (user_id, itinerary_id) => dispatch => {
  console.log("inside add fav action");
  axios
    .post(`/api/itineraries/favorites/${user_id}/${itinerary_id}`)
    .then(() => {
      dispatch({
        type: ADD_FAVORITES,
        payload: itinerary_id
      });
    });
  // .catch(err => console.log(err));
};

// DELETE FAVORITES
export const delFavorites = (user_id, itinerary_id) => dispatch => {
  console.log("inside del fav action");
  axios
    .delete(`/api/itineraries/favorites/${user_id}/${itinerary_id}`)
    .then(() => {
      dispatch({
        type: DELETE_FAVORITES,
        payload: itinerary_id
      });
    });
  // .catch(err => console.log(err));
};
/*
export default addFavorites;
export default delFavorites;
*/
