//with below import i am retrieving my actions from the CityAction file,
// and I am passing them to the reducer

import {
  FETCH_CITIES_PENDING,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR
} from "../actions/citiesActions";

//defining the initial state
const initialState = {
  pending: false,
  cities: [],
  error: null
};

function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES_PENDING:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        pending: true
        //error: null
      };
    case FETCH_CITIES_SUCCESS:
      // All done: set pending "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        pending: false,
        cities: action.payload
        //error: null
      };
    case FETCH_CITIES_ERROR:
      console.log("error");

      return {
        ...state,
        pending: false,
        error: action.payload
      };

    default:
      // the dispatched action is not in this reducer, return the state unchanged
      return state;
  }
}

export default citiesReducer;
