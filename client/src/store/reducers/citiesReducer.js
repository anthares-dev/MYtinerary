//! Reducer is a function, to, in a sense, read the action type and decide how to update the store based on the type.
/*
The Reducer function takes two arguments:
“state”, and “action”, and uses this information to determine the new state.
*/

//* with below import i am retrieving my actions from the CityAction file, and I am passing them to the reducer
import {
  FETCH_CITIES_PENDING,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_ERROR
} from "../actions/typesActions";

//* defining the initial state
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
