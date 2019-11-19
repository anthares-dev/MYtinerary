//creating my three actions: loading fetch, fetch success or fetch error
export const FETCH_ITINERARIES_PENDING = "FETCH_ITINERARIES_PENDING";
export const FETCH_ITINERARIES_SUCCESS = "FETCH_ITINERARIES_SUCCESS";
export const FETCH_ITINERARIES_ERROR = "FETCH_ITINERARIES_ERROR";

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
    console.log("before fetch");
    fetch("http://localhost:5000/itineraries/all")
      .then(res => {
        console.log("fetched");
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        dispatch(fetchItinerariesSuccess(json));
        return json;
      })
      .catch(err => {
        dispatch(fetchItinerariesError(err));
      });
  };
}
