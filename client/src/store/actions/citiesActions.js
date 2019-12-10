//! Actions allow us to change the application state in the Redux store.
//! An action is just an object. This object is sent to the store and it must have one property: “type”.
/*
The Actions takes care of describing the data we want to change in our store,
but it doesn’t actually execute anything. After all, it is only an object. 
*/

import {
  FETCH_CITIES_PENDING,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR
} from "./typesActions";

//! GET CITIES  //-------------------------------------------------------------

//*creating my three actions:
export function fetchCitiesPending() {
  return {
    type: FETCH_CITIES_PENDING
  };
}

export function fetchCitiesSuccess(cities) {
  return {
    type: FETCH_CITIES_SUCCESS, //? The type defines what we would like our action to do.
    payload: cities //? the payload let us send data
  };
}

export function fetchCitiesError(error) {
  return {
    type: FETCH_CITIES_ERROR,
    payload: error
  };
}

//* I am preparing my fetch to retrieve the cities list

export function fetchCities() {
  console.log("inside action fetching cities");
  return dispatch => {
    dispatch(fetchCitiesPending());
    //console.log("before fetch");
    fetch("/api/cities/")
      .then(res => {
        //console.log("fetched");
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        dispatch(fetchCitiesSuccess(json));
        return json;
      })
      .catch(err => {
        console.log("error");
        dispatch(fetchCitiesError(err));
      });
  };
}
