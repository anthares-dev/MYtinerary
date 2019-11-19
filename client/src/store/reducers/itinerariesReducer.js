//with below import i am retrieving my actions from the CityAction file,
// and I am passing them to the reducer

import {
  FETCH_ITINERARIES_PENDING,
  FETCH_ITINERARIES_SUCCESS,
  FETCH_ITINERARIES_ERROR
} from "../actions/itinerariesActions";

//defining the initial state
const initialState = {
  pending: false,
  itineraries: [],
  error: null
};

function itinerariesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITINERARIES_PENDING:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        pending: true
      };
    case FETCH_ITINERARIES_SUCCESS:
      // All done: set pending "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        pending: false,
        itineraries: action.payload
      };
    case FETCH_ITINERARIES_ERROR:
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

export default itinerariesReducer;
