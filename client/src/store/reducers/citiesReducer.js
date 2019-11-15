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
      return {
        ...state,
        pending: true
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        pending: false,
        cities: action.cities
      };
    case FETCH_CITIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      // the dispatched action is not in this reducer, return the state unchanged
      return state;
  }
}

export default citiesReducer;
