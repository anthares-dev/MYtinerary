//creating my three actions: loading fetch, fetch success or fetch error
import {
  FETCH_ITINERARIES_PENDING,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_ERROR
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

export function fetchItineraries() {
  console.log("inside action");
  return dispatch => {
    dispatch(fetchItinerariesPending());

    fetch("/api/itineraries")
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
