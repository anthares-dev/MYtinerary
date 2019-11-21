//with below import i am retrieving my actions from the CityAction file,
// and I am passing them to the reducer

import {
  FETCH_ACTIVITIES_PENDING,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_ERROR
} from "../actions/typesActions";

//defining the initial state
const initialState = {
  pending: false,
  activities: [],
  error: null
};

function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES_PENDING:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        pending: true
      };
    case FETCH_ACTIVITIES_SUCCESS:
      // All done: set pending "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        pending: false,
        activities: action.payload
      };
    case FETCH_ACTIVITIES_ERROR:
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

export default activitiesReducer;
